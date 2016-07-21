var pacApi = angular.module('pacApi');
pacApi.constant("COLOR_CODES", {
        "Cash & Cash Alternatives": "#A1C371",
        "US Short Government Bonds": "#43996C",
        "US High Yield Bonds": "#C7E09C",
        "U.S. Inflation-Protected Bonds": "#AECC8D",
        "US Large Growth Stocks": "#12AAC4",
        "US Microcap Stocks": "#1B5766",
        "International Stocks (includes Int'l Developed)": "#D28246",
        "International Large Value Stocks": "#FFCE74",
        "US Small Growth Stocks": "#3FA5AD",
        "US Inflation-Protected Bonds": "#AECC8D",
        "US Short Investment Grade": "#2B7F51",
        "US Long Credit Bonds": "#2B7F51",
        "Global Bond": "#6B8839",
        "Moderate Allocation": "#D7794A",
        "Global Short Bonds": "#81A04C",
        "US Long Government Bonds": "#A4D49D",
        "US Large Neutral Stocks": "#5DC4C9",
        "US Stocks": "#259BB7",
        "US Small Neutral Stocks": "#407E8C",
        "US REITs": "#81A04C",
        "World Stocks (includes Int'l Developed, US)": "#A33422",
        "International Small Value Stocks": "#EA9E53",
        "Aggressive Allocation": "#CC5A3A",
        "Conservative Allocation": "#BF6E49",
        "Commodities": "#939598",
        "Emerging Markets Stocks": "#CC6628",
        "International Large Growth Stocks": "#FFEDAB",
        "International Small Growth Stocks": "#F7B74F",
        "Other Assets": "#B2B4B6",
        "Moderate Allocation": "#D7794A",
        "International Small Neutral Stocks": "#F3AA5B",
        "International Large Neutral Stocks": "#FFE292",
        "Global Stocks (includes Int'l Developed, US, EM)": "#B34E31",
        "US Small Value Stocks": "#26667B",
        "US Large Value Stocks": "#27B2BC",
        "Municipal Bonds": "#91B769",
        "US Government Bonds": "#5FE08D",
        "US Investment Grade Bonds": "#44AE73"
    });
    
pacApi.controller('pacAnalysisController', ['$scope', 'ApiRequest', '$compile', '$filter','COLOR_CODES',
  function ($scope, ApiRequest, $compile, $filter,COLOR_CODES) {
    $scope.postData = {};
    $scope.inputData = {};
    $scope.inputFormData = {};
    $scope.scenarioAction = true;
    $scope.portfolioAction = false;
    $scope.report = {};
    $scope.report.value = 1;
    $scope.defaultAllocation = 'Cash & Cash Alternatives';
    $scope.scenarioName = 'Default Scenario Outputs';
    $scope.saveScenarioAssetClass = false;
    $scope.expandme=true;
    $scope.collapseme=false;
    $scope.currentChart = {
      value: "createCompositionChart"
    };
    angular.element(document).ready(function () {
      $('#side-menu').metisMenu();
      $('[data-toggle="customcollapse"]').click(function (event) {
        var targetid = $(this).data('target');
        if ((targetid == '#save' || targetid == '#save-edit') && $scope.checkDefaultValues()) {
          alert('Trying to save default scenario inputs...');
          return true;
        }
        if (targetid == '#save' && $scope.inputData.scenario_portfolio_id > 0) {
          $scope.saveScenario('update');
          return true;
        }
        if (targetid == '#portfolio-save' && $scope.inputData.port_portfolio_id > 0) {
          $scope.inputData.currentType = 'portfolio';
          $scope.savePortfolio('update', 'portfolio');
          return true;
        }
        
        var collapsebutton = $(this);
        event.stopPropagation();
        $('.overlay_popup').toggle();
        $(targetid).slideToggle('fast', function () {
          if ($(targetid).is(':visible')) {
            collapsebutton.addClass('active')
          } else {
            collapsebutton.removeClass('active')
          }
        });
      });
      $('[data-dismiss="cancel-popup"]').click(function (event) {
        $('.popup-dialog').slideUp('fast');
        $('.overlay_popup').hide();
        $('[data-toggle="customcollapse"]').removeClass('active');
      });
      $('.popup-dialog, .close-overlay').click(function (event) {
        event.stopPropagation();
      });
    });
    
    $scope.changeDefaultAsset = function (type) {
      if (type == 'scenario') {
        angular.copy($scope.scenarioAssetCopy, $scope.inputData.scenarioAllocations);
      } else if (type == 'portfolio') {
        angular.copy($scope.portfolioAssetCopy, $scope.inputData.portfolioAllocations);
      } else if (type == 'compare') {
        angular.copy($scope.compareAssetCopy, $scope.inputData.compareAllocations);
      }
      $scope.inputData.currentType = type;
      $scope.getAllApiData();
    };

    $scope.formatDate = function (date) {
      var month = '' + (date.getMonth() + 1);
      var day = '' + date.getDate();
      var year = date.getFullYear();
      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      return [year, month, day].join('-');
    };

    $scope.saveAsScenario = function () {
      $scope.inputData.currentType = 'scenario';
      name = $('#saveas-scenario-name').val();
      if (name) {
        $scope.saveAsPortfolio(name, 'scenario');
        $scope.saveScenarioAssetClass = true;
        $('#saveas-scenario-name').val('');
      } else {
        alert('Please Enter Scenario name');
      }
    };

    $scope.portfolioSave = function (name) {
      $scope.inputData.currentType = 'portfolio';
      if (name == '') {
        name = $('#save-portfolio-name').val();
      }
      if (name) {
        $scope.savePortfolio(name, 'portfolio');
        $('#save-portfolio-name').val('')
      } else {
        alert('Please Enter Portfolio name');
      }
    };

    $scope.savePortfolioAs = function () {
      $scope.inputData.currentType = 'portfolio';
      name = $('#saveas-portfolio-name').val();
      if (name) {
        $scope.saveAsPortfolio(name, 'portfolio');
        $('#saveas-portfolio-name').val('')
      } else {
        alert('Please Enter Portfolio name');
      }
    };

    $scope.showActionButtons = function (action) {
      $('html, body').animate({scrollTop: 0}, 800);
      if ((action == 'scenario' && $scope.scenarioAction === true) || (action == 'portfolio' && $scope.portfolioAction === true) || action == 'compare') {
        $scope.scenarioAction = false;
        $scope.portfolioAction = false;
      } else if (action == 'scenario' && $scope.scenarioAction === false) {
        $scope.scenarioAction = true;
        $scope.portfolioAction = false;
      } else if (action == 'portfolio' && $scope.portfolioAction === false) {
        $scope.scenarioAction = false;
        $scope.portfolioAction = true;
      }
    }

    $scope.openAutocomplete = function (element) {
      setTimeout(function () {
        $(element).find('input').focus();
      }, 0);
    }

    $scope.scenarioPortfolioSave = function () {
      name = $('#save-scenario-portfolio-name').val();
      if (name) {
        var postData = {};
        postData.allocation = $scope.inputData.scenarioAllocations;
        postData.action = 'new';
        postData.portfolio_name = name;
        postData.advisor_id = $scope.inputData.advisor_id;
        postData.type = 'portfolio';
        ApiRequest.savePortfolioTrigger(postData).success(function () {
          $scope.getSavedScenarios();
          $scope.getSavedPortfolios();
          $scope.saveScenarioAssetClass = false;
          alert('Action updated successfully');
          $scope.closeOverlay();
        }).error(function (response) {
          alert(response.message);
        });
        $('#save-portfolio-name').val('')
      } else {
        alert('Please Enter Portfolio name');
      }
    }

    $scope.saveScenario = function (name) {
      $scope.inputData.currentType = 'scenario';
      if (name == '') {
        name = $('#save-scenario-name').val();
      }
      if (name) {
        $scope.savePortfolio(name, 'scenario');
        $scope.saveScenarioAssetClass = true;
        $('#save-scenario-name').val('')
      } else {
        alert('Please Enter Scenario name');
      }
    };

    $scope.checkDefaultValues = function () {
      var defaultVal = true;
      for (key in $scope.defaultInputData) {
        if (!angular.isUndefined($scope.defaultInputData[key].minValue) && (($scope.defaultInputData[key].minValue != $scope.inputData[key].minValue) || ($scope.defaultInputData[key].maxValue != $scope.inputData[key].maxValue))) {
          defaultVal = false;
        } else if (!angular.isUndefined($scope.defaultInputData[key].value) && $scope.defaultInputData[key].value != $scope.inputData[key].value) {
          defaultVal = false;
        } else if (key == 'scenarioAllocations' && !angular.equals($scope.defaultInputData[key], $scope.inputData[key])) {
          defaultVal = false;
        }
      }
      return defaultVal;
    };

    $scope.saveAsPortfolio = function (portfolioName, type) {
      $scope.resetFormPostData();
      var postData = {};
      angular.copy($scope.postData, postData);
      postData.action = 'new';
      postData.portfolio_name = portfolioName;
      postData.type = type;

      ApiRequest.savePortfolioTrigger(postData).success(function (data) {
        $scope.selectNewlyCreated(data, portfolioName, type, postData.action);
        $scope.getSavedScenarios();
        $scope.getSavedPortfolios();
        alert(type + ' saved successfully!!!');
        $scope.closeOverlay();
      }).error(function (response) {
        alert(response.message);
      });
    };

    $scope.selectNewlyCreated = function (data, portfolioName, type, action) {
      if (type == 'scenario' && action == 'new') {
        $scope.savedScenario = {'id': data.message.id, 'name': portfolioName};
        $scope.inputData.scenario_portfolio_id = data.message.id;
      } else if (type == 'portfolio' && action == 'new') {
        $scope.savedPortfolio = {'id': data.message.id, 'name': portfolioName};
        $scope.inputData.port_portfolio_id = data.message.id;
      }
    };

    $scope.savePortfolio = function (portfolioName, type) {
      $scope.resetFormPostData();
      var postData = {};
      angular.copy($scope.postData, postData);
      if (postData.portfolio_id > 0) {
        postData.action = 'update';
      } else {
        postData.action = 'new';
        postData.portfolio_name = portfolioName;
      }
      postData.type = type;
      ApiRequest.savePortfolioTrigger(postData).success(function (data) {
        $scope.selectNewlyCreated(data, portfolioName, type, postData.action);
        $scope.getSavedScenarios();
        $scope.getSavedPortfolios();
        alert('Action updated successfully');
        $scope.closeOverlay();
      }).error(function (response) {
        alert(response.message);
      });
    };
    $scope.compareAssetClass = function (item) {
      if (angular.isUndefined(item)) {
        return;
      }
      if ($scope.inputData.compare == 'Yes') {
        $scope.compareName = item.name;
        $scope.inputData.compare_type = item.type;
        $scope.inputData.compare_portfolio_id = Number(item.id);
        $scope.inputData.currentType = 'compare';
        $scope.getAllApiData();
      }
    };
    $scope.switchCompare = function () {
      if ($scope.inputData.compare == 'No') {
        $scope.compareName = '';
        $scope.inputData.currentType = 'scenario';
      }
    };
    $scope.closeOverlay = function () {
      $('.popup-dialog').slideUp('slow');
      $('.overlay_popup').hide();
      $('[data-toggle="customcollapse"]').removeClass('active');
    };

    ApiRequest.getFormData().success(function (data) {
      $scope.inputFormData = data;
      $scope.initializeFormData();
    });
    $scope.callFunction = function (name) {
      console.log(name);
      if (angular.isFunction($scope[name])) {
        $scope[name]();
      }
    };
    $scope.createCompositionChart = function () {
      $scope.report.value = 1;
      $scope.currentChart.value = "createCompositionChart";
      ApiRequest.getCompositionChartData($scope.postData).
              success(function (data) {
                if (data.comparison) {
                  var allocationCompare = [];
                  for(var x in data.comparison.Allocation){
                    var colorIntegrateCompare = {};
                      colorIntegrateCompare.name = data.comparison.Allocation[x][0];
                      colorIntegrateCompare.y = data.comparison.Allocation[x][1];
                      colorIntegrateCompare.color = COLOR_CODES[data.comparison.Allocation[x][0]];
                    allocationCompare.push(colorIntegrateCompare);
                  }
                  createHighChart("compositionCompare", allocationCompare,
                          "Asset Class Portfolio Allocation", 100);
                  createHighChart("equityVsFixedCompare", data.comparison.equityFixedIncome, "Fixed Income vs.Equity", 50);
                  createHighChart("domVsIntrCompare", data.comparison.domesticInternational, "Domestic Vs.International", 50);
                } else {
                  clearElement();
                  console.log(data.portfolio.Allocation);
                  var allocationValue = [];
                  for(var x in data.portfolio.Allocation){
                    var colorIntegrate = {};
                      colorIntegrate.name = data.portfolio.Allocation[x][0];
                      colorIntegrate.y = data.portfolio.Allocation[x][1];
                      colorIntegrate.color = COLOR_CODES[data.portfolio.Allocation[x][0]];
                    allocationValue.push(colorIntegrate);
                  }
                  console.log(data.portfolio.Allocation);
                  console.log(allocationValue);
                  createHighChart("composition", allocationValue,
                          "Asset Class Portfolio Allocation", 100);
                  createHighChart("CompEquityVsFixed", data.portfolio.equityFixedIncome, "Fixed Income vs.Equity", 50);
                  createHighChart("domVsIntr", data.portfolio.domesticInternational, "Domestic Vs.International", 50);
                }
              }).error(function () {
      });
    };
    $scope.createGrowthOfPortfolio = function () {
      $scope.report.value = 2;
      $scope.currentChart.value = "createGrowthOfPortfolio";
      ApiRequest.growthOfPortfolio($scope.postData).
              success(function (growthData) {
                if (growthData.comparison) {
                  var compareSeries = [];
                  var compareWithDistSeries = [];
                  angular.copy($scope.portfolioGrowthSeries, compareSeries);
                  angular.copy($scope.portfolioGrowthWithDistSeries, compareWithDistSeries);
                  compareSeries.push(growthData.comparison.portfolio.series[0]);
                  compareWithDistSeries.push(growthData.comparison.distribution.series[0]);
                  chartRedraw('#composition', compareSeries);
                  chartRedraw('#equityVsFixed', compareWithDistSeries);
                } else if (growthData.portfolio) {
                  clearElement();
                  createLineChart(growthData.portfolio.portfolio.categories, growthData.portfolio.portfolio.series, "Portfolio Growth", "#composition");
                  $scope.portfolioGrowthSeries = growthData.portfolio.portfolio.series;
                  createLineChart(growthData.portfolio.distribution.categories, growthData.portfolio.distribution.series, "Portfolio Growth with Distribution", "#equityVsFixed");
                  $scope.portfolioGrowthWithDistSeries = growthData.portfolio.distribution.series;
                }
              }).error(function () {
      });
    };
    $scope.createDowntownAndRecoveries = function () {
      $scope.report.value = 3;
      $scope.currentChart.value = "createDowntownAndRecoveries";
//      $scope.postData = 0;
      ApiRequest.getDownturnsAndRecoveries($scope.postData).success(function (downRecRes) {
        if ($scope.postData.compare === 0) {
          clearElement();
          createLineChart(downRecRes[0].categories, downRecRes[0].series, downRecRes[0].title, "#composition");
          $scope.downAndRecoverInitialYrSeries = downRecRes[0].series;
          createLineChart(downRecRes[1].categories, downRecRes[1].series, downRecRes[1].title, "#equityVsFixed");
          $scope.downAndRecoverFinalYrSeries = downRecRes[1].series;
        } else if ($scope.postData.compare === 1) {
          var downAndRecoverInitialYrSeriesTemp = [];
          angular.copy($scope.downAndRecoverInitialYrSeries, downAndRecoverInitialYrSeriesTemp);
          downAndRecoverInitialYrSeriesTemp.push(downRecRes[0].series[0]);

          chartRedraw('#composition', downAndRecoverInitialYrSeriesTemp);
          var downAndRecoverFinalYrSeriesTemp = [];
          angular.copy($scope.downAndRecoverFinalYrSeries, downAndRecoverFinalYrSeriesTemp);
          downAndRecoverFinalYrSeriesTemp.push(downRecRes[1].series[0]);
          chartRedraw('#equityVsFixed', downAndRecoverFinalYrSeriesTemp);
        }
      }).error(function () {
      });
    };
    $scope.createRisksBarometerReport = function () {
      $scope.report.value = 5;
      $scope.currentChart.value = "createRisksBarometerReport";
      ApiRequest.getRiskBarometer($scope.postData).success(function (riskData) {
        var riskDisplay = [];
        var riskRecord = [];
        if (riskData.comparison) {
          var compareName = $scope.compareName;
          angular.copy($scope.riskSeries, riskRecord);
          angular.copy($scope.normalPortfolioRisks, riskDisplay);
          var selectValue = {"": compareName};
          var riskRender = angular.extend(selectValue, riskData.comparison.table);
          riskDisplay.push(riskRender);
          riskRecord.push({"name": compareName, "data": riskData.comparison.graph.value});
          chartRedraw('#composition', riskRecord);
        } else if (riskData.portfolio) {
          $scope.riskSeries = [{"name": "Asset Class Portfolio", "data": riskData.portfolio.graph.value}];
          var selectPortfolioValue = {"": "Asset Class Portfolio"};
          var riskPortfolioValues = riskData.portfolio.table;
          var riskPortfolioRender = angular.extend(selectPortfolioValue, riskPortfolioValues);
          riskDisplay.push(riskPortfolioRender);
          clearElement();
          barometerChart(riskData.portfolio.graph.range, $scope.riskSeries, 'Annual Returns %', 'No of Returns', '#composition', 'Risk Barometer');
          $scope.portfolioRisksLabel = riskData.portfolio.table;
          $scope.normalPortfolioRisks = riskDisplay;
          angular.element(document.getElementById('composition')).append($compile("<risk-barometer></risk-barometer>")($scope));
        }
        $scope.portfolioRisks = riskDisplay;

      }).error(function () {});
    };

    $scope.createNormalDistribution = function () {
      $scope.report.value = 7;
      $scope.currentChart.value = "createNormalDistribution";
      ApiRequest.getDistribution($scope.postData).success(function (distributionData) {
        var distDisplay = [];
        var distRangeDisplay = [];
        var distRecord = [];
        var compareName, selectValue, distValues, distRender, distTableValue;
        if (distributionData.comparison) {
          var compareName = $scope.compareName;
          angular.copy($scope.normalDist, distDisplay);
          selectValue = {"": compareName + " Return"};
          distValues = distributionData.comparison.annual;
          distRender = angular.extend(selectValue, distValues);
          distDisplay.push(distRender);
          angular.copy($scope.distSeries, distRecord);
          angular.copy($scope.normalRange, distRangeDisplay);
          distTableValue = distributionData.comparison.tablerange;
          var distRangeValue = new Array();
          distRangeValue.push(compareName + ' Return');
          for (var d = 0; d < $scope.distributionKeys.length; d++) {
            distRangeValue.push(distTableValue[$scope.distributionKeys[d]]);
          }
          distRangeDisplay.push(distRangeValue);
          distRecord.push({"name": compareName, "data": distributionData.comparison.report});
          chartRedraw('#composition', distRecord);
        } else if (distributionData.portfolio) {
          selectValue = {"": "Asset Class Portfolio"};
          distValues = distributionData.portfolio.annual;
          distRender = angular.extend(selectValue, distValues);
          distDisplay.push(distRender);
          $scope.distributionKeys = distributionData.portfolio.tablekeys;
          distTableValue = distributionData.portfolio.tablerange;
          var distRangeValue = new Array();
          distRangeValue.push('Historical Return');
          for (var d = 0; d < $scope.distributionKeys.length; d++) {
            distRangeValue.push(distTableValue[$scope.distributionKeys[d]]);
          }
          distRangeDisplay.push(distRangeValue);
          $scope.normalDist = distDisplay;
          $scope.normalRange = distRangeDisplay;
          $scope.distSeries = [{"name": "Asset Class Portfolio", "data": distributionData.portfolio.report}];
          $scope.distributionLabel = distributionData.portfolio.annual;
          clearElement();
          splineChart(distributionData.portfolio.range, $scope.distSeries, '', '', '#composition', 'Normal Distribution', '{value}%', '%');
          $scope.distributions = distDisplay;
          $scope.rangeDistributions = distRangeDisplay;

        }
        angular.element(document.getElementById('composition')).append($compile("<normal-distribution></normal-distribution>")($scope));

      }).error(function () {});
    };



    $scope.createPortfolioPerformenceHistory = function () {
      $scope.report.value = 6;
      $scope.currentChart.value = "createPortfolioPerformenceHistory";
      ApiRequest.getPortfolioPerformanceHistory($scope.postData).success(function (historyData) {
        if (historyData.comparision) {
          var distributionList = [];
          var performencePortfolioSeries = [];
          var performencePortfolioSeriesCompare = [];
          angular.copy($scope.performanceHistoryPortfolio, performencePortfolioSeries);
          angular.copy($scope.historyData, performencePortfolioSeriesCompare);
          for (var compYr in historyData.comparision.year) {
            distributionList.push(historyData.comparision.year[compYr].portfolio);
          }
          performencePortfolioSeries.push({"name": "Comparision", "data": distributionList});
          performencePortfolioSeriesCompare.push(historyData.comparision);
          chartRedraw('#composition', performencePortfolioSeries);
          $scope.performanceHistoryCompare = historyData.comparision;
//          console.log($scope.performanceHistoryCompare);
//          angular.element(document.getElementById('composition')).append($compile("<performance-history-table></performance-history-table>")($scope));
        } else if (historyData.portfolio) {
          var yearsList = [];
          var seriesList = [];
          var dataObject = [];
          for (var portYr in historyData.portfolio.year) {
            yearsList.push(portYr);
            dataObject.push(historyData.portfolio.year[portYr].portfolio);
          }
          seriesList.push({"name": "Portfolio", "data": dataObject});
          $scope.performanceHistoryPortfolio = seriesList;
          clearElement();
          gridLightChart(yearsList, seriesList);
          $scope.historyData = historyData;
          angular.element(document.getElementById('composition')).append($compile("<performance-history-table></performance-history-table>")($scope));
        }
      }).error(function () {
      });
    };
    $scope.createBestAndWorstCaseChart = function () {
      $scope.report.value = 4;
      $scope.currentChart.value = "createBestAndWorstCaseChart";
      ApiRequest.getBestAndWorstCaseChart($scope.postData).success(function (data) {
        var status = ['Best', 'Worst', 'Average'];
        var valueType = ['value', 'growth', 'period'];
        var statusResultData = [];
        statusResultData.Best = [];
        statusResultData.Worst = [];
        statusResultData.Average = [];
        for (var yearKey in data.years) {
          statusResultData.Best.push(data.data[data.years[yearKey]]["Best"].value);
          statusResultData.Worst.push(data.data[data.years[yearKey]]["Worst"].value);
          statusResultData.Average.push(data.data[data.years[yearKey]]["Average"].value);
        }
        var bestAndWorstChartData = [];
        for (var s in status) {
          var tempObj = {};
          tempObj.name = status[s];
          tempObj.data = statusResultData[status[s]];
          bestAndWorstChartData.push(tempObj);
        }
        clearElement();
        bestAndWorstCaseChart(data.years, bestAndWorstChartData);
        $scope.bestAndWorstTabVal = data.years;
        var finalBestAndWorstData = [];

        var rowValue = [];

        for (var st in status) {
          var tempStatus = 0;
          for (var vt in valueType) {
            rowValue = [];
            if (tempStatus === 0) {
              rowValue.push(status[st]);
              tempStatus = 1;
            } else {
              rowValue.push(valueType[vt]);
            }
            if ((status[st] == "Best" || status[st] == "Worst" || status[st] == "Average") && (valueType[vt] == "period" || valueType[vt] == "value" || valueType[vt] == "growth") && (valueType[vt] !== "period" || status[st] !== "Average")) {
              for (var yearIndex in data.years) {
                if (valueType[vt] == "value") {
                  rowValue.push(data.data[data.years[yearIndex]][status[st]][valueType[vt]] + "%");
                } else if (valueType[vt] == "growth") {
                  rowValue.push($filter("currency")(data.data[data.years[yearIndex]][status[st]][valueType[vt]]));
                } else {
                  rowValue.push(data.data[data.years[yearIndex]][status[st]][valueType[vt]]);
                }
              }
              finalBestAndWorstData.push(rowValue);
            }

          }
        }
        $scope.finalBestAndWorstData = finalBestAndWorstData;
        angular.element(document.getElementById('composition'))
                .append($compile("<best-and-worst-table></best-and-worst-table>")($scope));


      }).error(function () {
      });
    };

    $scope.createDataDisclosure = function () {
      $scope.report.value = 8;
      $scope.currentChart.value = "createDataDisclosure";
      clearElement();
      angular.element(document.getElementById('composition')).append($compile("<footer-details></footer-details>")($scope));
    };

    $scope.createSkittleChart = function () {
      $scope.report.value = 11;
      $scope.currentChart.value = "createSkittleChart";
      clearElement();
      angular.element(document.getElementById('composition')).append($compile("<skittle-chart></skittle-chart>")($scope));
    };

    $scope.createHistoricalAssetPortfolioReturns = function () {
      $scope.report.value = 9;
      $scope.currentChart.value = "createHistoricalAssetPortfolioReturns";
      clearElement();
      angular.element(document.getElementById('composition')).append($compile("<historical-returns></historical-returns>")($scope));
    };

    $scope.createStressTest = function () {
      $scope.report.value = 10;
      $scope.currentChart.value = "createStressTest";
      clearElement();
      angular.element(document.getElementById('composition')).append($compile("<stress-test></stress-test>")($scope));
    };

    $scope.compare = function () {
      alert($scope.postData.compare);
      if ($scope.postData.compare) {
        alert("inside" + $scope.postData.compare);
        $scope.postData.compare = 1;
      } else {
        $scope.postData.compare = 0;
      }
      $scope.callFunction($scope.currentChart.value);
    };


    function chartRedraw(element, seriesData) {
      Highcharts.setOptions({
        colors: ['#26667B', '#0084AD']
      });

      var chart = $(element).highcharts();
      for (var i = 0, len = chart.series.length; i <= len; i++) {
        if (chart.series[0]) {
          chart.series[0].remove();
        }
      }
      for (var r = 0; r < seriesData.length; r++) {
        chart.addSeries(seriesData[r], false);
      }
      chart.redraw();
    }
    ;

    $scope.initializeFormData = function () {
      $scope.defaultInputData = {};
      $scope.inputData.investment_amount = {
        value: $scope.inputFormData.InvestmentAmount.default,
        options: {
          showSelectionBar: true,
          floor: $scope.inputFormData.InvestmentAmount.start,
          ceil: $scope.inputFormData.InvestmentAmount.end,
          step: $scope.inputFormData.InvestmentAmount.step,
          translate: function (value) {
            return value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
          }
        }
      };

      $scope.defaultInputData.investment_amount = {
        value: $scope.inputFormData.InvestmentAmount.default
      };
      $scope.defaultInputData.annual_distribution = {
        value: $scope.inputFormData.AnnualDistribution.default
      };
      $scope.defaultInputData.fee_adjustment = {
        value: $scope.inputFormData.FeeAdjustment.default
      };
      $scope.defaultInputData.custom_period = {
        minValue: 1972,
        maxValue: 2016
      };
      $scope.defaultInputData.scenarioAllocations = {};
      angular.copy($scope.inputFormData.CustomAllocation, $scope.defaultInputData.scenarioAllocations);

      $scope.inputData.annual_distribution = {
        value: $scope.inputFormData.AnnualDistribution.default,
        options: {
          showSelectionBar: true,
          floor: $scope.inputFormData.AnnualDistribution.start,
          ceil: $scope.inputFormData.AnnualDistribution.end,
          step: $scope.inputFormData.AnnualDistribution.step,
          precision: 2
        }
      };
      $scope.inputData.fee_adjustment = {
        value: $scope.inputFormData.FeeAdjustment.default,
        options: {
          showSelectionBar: true,
          floor: $scope.inputFormData.FeeAdjustment.start,
          ceil: $scope.inputFormData.FeeAdjustment.end,
          step: $scope.inputFormData.FeeAdjustment.step,
          precision: 2
        }
      };
      $scope.inputData.compare = 'No';
      $scope.inputData.scenarioAllocations = {};
      $scope.inputData.portfolioAllocations = {};
      $scope.inputData.compareAllocations = {};
      $scope.scenarioAssetCopy = {};
      $scope.portfolioAssetCopy = {};
      $scope.compareAssetCopy = {};
      angular.copy($scope.inputFormData.CustomAllocation, $scope.scenarioAssetCopy);
      angular.copy($scope.inputFormData.CustomAllocation, $scope.portfolioAssetCopy);
      angular.copy($scope.inputFormData.CustomAllocation, $scope.compareAssetCopy);
      angular.copy($scope.inputFormData.CustomAllocation, $scope.inputData.scenarioAllocations);
      angular.copy($scope.inputFormData.CustomAllocation, $scope.inputData.portfolioAllocations);
      angular.copy($scope.inputFormData.CustomAllocation, $scope.inputData.compareAllocations);
      $scope.inputData.portfolio_date = new Date();
      $scope.inputData.savedScenarios = [];
      $scope.inputData.savedPortfolios = [];
      $scope.inputData.custom_period = {
        minValue: 1972,
        maxValue: 2016,
        options: {
          floor: 1972,
          ceil: 2016,
          step: 1
        }
      };
      $scope.inputData.portfolio_id = 0;
      $scope.inputData.advisor_id = Number($('#current_advisor').val());
      $scope.inputData.scenarioAssetClass = $scope.inputFormData.assetClassList;
      $scope.inputData.portfolioAssetClass = $scope.inputFormData.assetClassList;
      $scope.inputData.compareAssetClass = $scope.inputFormData.assetClassList;
      $scope.inputData.assetClassMix = $scope.inputFormData.AssetClassMix;
      $scope.inputData.Benchmarks = $scope.inputFormData.Benchmarks;
      $scope.inputData.currentType = 'portfolio';
      $scope.getAllApiData();
    };

    $scope.getAllApiData = function () {
      $scope.resetFormPostData();
      $scope.getSavedScenarios();
      $scope.getSavedPortfolios();
      $scope.callFunction($scope.currentChart.value);
    }

    $scope.processAllocation = function (allocation, type, remove) {
      var oldAllocation = {};
      var input = {};
      if (type === 'scenario') {
        input = $scope.inputData.scenarioAllocations;
      } else if (type === 'portfolio') {
        input = $scope.inputData.portfolioAllocations;
      } else if (type === 'compare') {
        input = $scope.inputData.compareAllocations;
      }
      angular.copy(input, oldAllocation);
      if (remove) {
        delete input[allocation];
      }
      var total = 0;
      for (var aKey in input) {
        if (aKey !== $scope.defaultAllocation) {
          total += Number(input[aKey]);
        }
        input[aKey] = Number(input[aKey]);
      }
      if (total > 100) {
        alert('Asset Class mix must not be greater than 100!');
        var assetVal = 0;
        for (var aKey in input) {
          if (aKey !== allocation) {
            assetVal += Number(input[aKey]);
          }
        }
        input[allocation] = 100 - assetVal;
      } else {
        input[$scope.defaultAllocation] = 100 - total;
        $scope.inputData.currentType = type;
        $scope.getAllApiData();
      }
    };

    $scope.calculateAssetClass = function (input) {
      var total = 0;
      for (var aKey in input) {
        if (aKey !== $scope.defaultAllocation) {
          total += Number(input[aKey]);
        }
      }
      if (total > 100) {
        alert('Asset Class mix must not be greater than 100!');
      } else {
        input[$scope.defaultAllocation] = 100 - total;
      }
    };


    $scope.getSavedScenarios = function () {
      var postData = {};
      angular.copy($scope.postData, postData);
      postData.type = 'scenario';
      ApiRequest.getPortfolios(postData).success(function (data) {
        $scope.inputData.savedScenarios = data;
      });
    };

    $scope.scenarioSearch = function (scenarioText) {
      var results = scenarioText ? $scope.inputData.savedScenarios.filter($scope.createScenarioFilter(scenarioText)) : $scope.inputData.savedScenarios;
      return results;
    };

    $scope.assetClassSearch = function (assetText, type) {
      var input = {};
      var currentInput = {};

      if (type == 'scenario') {
        input = $scope.inputData.scenarioAssetClass;
        angular.copy($scope.inputData.scenarioAllocations, currentInput);
      } else if (type == 'portfolio') {
        input = $scope.inputData.portfolioAssetClass;
        angular.copy($scope.inputData.portfolioAllocations, currentInput);
      } else if (type == 'compare') {
        input = $scope.inputData.compareAssetClass;
        angular.copy($scope.inputData.compareAllocations, currentInput);
      }
      var results = assetText ? input.filter($scope.createScenarioFilter(assetText)) : input;
      var items = [];
      for (var value in results) {
        if (angular.isUndefined(currentInput[results[value].name])) {
          items.push(results[value]);
        }
      }
      return items;
    };

    $scope.assetClassMixSearch = function (assetText, type) {
      var input = {};
      if (type === 'scenario') {
        input = $scope.inputData.scenarioAssetClassMix;
      } else if (type === 'portfolio') {
        input = $scope.inputData.portfolioAssetClassMix;
      } else if (type === 'compare') {
        input = $scope.inputData.compareAssetClassMix;
      }
      var results = assetText ? input.filter($scope.createScenarioFilter(assetText)) : input;
      return results;
    };

    $scope.selectAssetClassMix = function (item, type, category) {
      var postData = {};
      if (angular.isUndefined(item)) {
        return;
      }
      $scope.inputData.currentType = category;
      if (type === 'custom') {
        postData.type = 'custom';
        postData.asset_mix_id = item.id;
      } else {
        if (category === 'compare') {
          $scope.inputData.compare_portfolio_id = item.id;
        } else if (category === 'scenario') {
          $scope.inputData.asset_portfolio_id = item.id;
        } else {
          $scope.inputData.port_portfolio_id = item.id;
        }
        postData.portfolio_id = item.id;
        postData.advisor_id = $scope.inputData.advisor_id;
        postData.type = 'portfolio';
      }
      ApiRequest.getScenarioDetails(postData).success(function (data) {
        var result;
        if (data.assetList) {
          result = data.assetList;
        } else {
          result = data;
        }
        if (category == 'scenario') {
          $scope.inputData.scenarioAllocations = result;
          angular.copy(result, $scope.scenarioAssetCopy);
        } else if (category == 'portfolio') {
          $scope.inputData.portfolioAllocations = result;
          angular.copy(result, $scope.portfolioAssetCopy);
        } else if (category == 'compare') {
          $scope.inputData.compareAllocations = result;
          angular.copy(result, $scope.compareAssetCopy);
        }
        $scope.getAllApiData();
      }).error(function () {
      });
    };

    $scope.selectAssetClass = function (item, type) {
      if (angular.isUndefined(item)) {
        return;
      }
      var input = {};
      $scope.inputData.currentType = type;
      if (type === 'scenario') {
        input = $scope.inputData.scenarioAllocations;
      } else if (type === 'portfolio') {
        input = $scope.inputData.portfolioAllocations;
      } else if (type === 'compare') {
        input = $scope.inputData.compareAllocations;
      }
      var newAsset = {};
      newAsset[item.name] = 0
      angular.extend(input, newAsset);
      $scope.calculateAssetClass(input);
    }

    $scope.selectScenario = function (scenario) {
      $scope.inputData.currentType = 'scenario';
      if (angular.isUndefined(scenario)) {
        $scope.inputData.scenario_portfolio_id = 0;
        $scope.scenarioName = 'Default Scenario Outputs';
        return;
      }
      var postData = {};
      $scope.inputData.scenario_portfolio_id = scenario.id;
      $scope.scenarioName = scenario.name;
      postData.portfolio_id = scenario.id;
      postData.advisor_id = $scope.inputData.advisor_id;
      postData.type = 'portfolio';
      ApiRequest.getScenarioDetails(postData).success(function (data) {
        $scope.inputData.investment_amount.value = data.investment_amount;
        $scope.inputData.annual_distribution.value = data.annual_distribution;
        $scope.inputData.fee_adjustment.value = data.fee_adjustment;
        $scope.inputData.scenarioAllocations = data.assetList;
        angular.copy($scope.inputData.scenarioAllocations, $scope.compareAssetCopy);
        $scope.inputData.portfolio_date = new Date(data.portfolio_date);
        $scope.inputData.custom_period = {
          minValue: data.portfolio_start,
          maxValue: data.portfolio_end,
          options: {
            floor: 1972,
            ceil: 2016,
            step: 1
          }
        };
        $scope.getAllApiData();
      }).error(function () {
      });
    };

    $scope.createScenarioFilter = function (txt) {
      var lowercaseTxt = angular.lowercase(txt);
      return function filterFn(item) {
        var lowerName = angular.lowercase(item.name);
        return (lowerName.indexOf(lowercaseTxt) === 0);
      };
    };

    $scope.portfolioSearch = function (portfolioText) {
      var results = portfolioText ? $scope.inputData.savedPortfolios.filter(portfolioText) : portfolioText;
      return results;
    };
    $scope.deletePortFolio = function (id) {
      alert(id);
    };
    $scope.getSavedPortfolios = function (data) {
      var postData = {};
      angular.copy($scope.postData, postData);
      postData.type = 'portfolio';
      ApiRequest.getPortfolios(postData).success(function (data) {
        $scope.inputData.savedPortfolios = data;
        $scope.buildAssetClassMix();
      });
    };
    $scope.portfolioSelection = function (item) {
    };

    $scope.buildAssetClassMix = function () {
      var assetClassMix = {}, assetClasses = [], compareClasses = [], Benchmarks = {};
      angular.copy($scope.inputData.assetClassMix, assetClassMix);
      angular.copy($scope.inputData.Benchmarks, Benchmarks);
      for (var assetId in assetClassMix.range) {
        var aMix = {};
        aMix.id = assetId;
        aMix.name = assetClassMix.range[assetId];
        aMix.type = 'custom';
        assetClasses.push(aMix);
      }
      for (var benchId in Benchmarks) {
        var aMix = {};
        aMix.id = benchId;
        aMix.name = Benchmarks[benchId];
        aMix.type = 'benchmark';
        compareClasses.push(aMix);
      }
      for (var asset in $scope.inputData.savedPortfolios) {
        var aMix = {};
        aMix.id = $scope.inputData.savedPortfolios[asset].id;
        aMix.name = $scope.inputData.savedPortfolios[asset].name;
        aMix.type = 'portfolio';
        assetClasses.push(aMix);
        compareClasses.push(aMix);
      }
      $scope.inputData.scenarioAssetClassMix = assetClasses;
      $scope.inputData.portfolioAssetClassMix = assetClasses;
      $scope.inputData.compareAssetClassMix = compareClasses;
    };
    $scope.$on("slideEnded", function () {
      $scope.getAllApiData();
    });
    $scope.resetFormPostData = function () {
      $scope.postData.investment_amount = $scope.inputData.investment_amount.value;
      $scope.postData.annual_distribution = $scope.inputData.annual_distribution.value;
      $scope.postData.fee_adjustment = $scope.inputData.fee_adjustment.value;
      $scope.postData.year_from = $scope.inputData.custom_period.minValue;
      $scope.postData.year_to = $scope.inputData.custom_period.maxValue;
      $scope.postData.portfolio_date = $scope.inputData.portfolio_date;
      $scope.postData.portfolio_date = $scope.formatDate($scope.postData.portfolio_date);
      $scope.postData.advisor_id = $scope.inputData.advisor_id;
      if ($scope.inputData.currentType == 'compare') {
        $scope.postData.portfolio_id = $scope.inputData.compare_portfolio_id;
        $scope.postData.compare = 1;
        $scope.postData.allocation = $scope.inputData.compareAllocations;
        $scope.postData.compare_type = $scope.inputData.compare_type;
      } else if ($scope.inputData.currentType == 'scenario') {
        $scope.postData.portfolio_id = $scope.inputData.scenario_portfolio_id;
        $scope.postData.allocation = $scope.inputData.scenarioAllocations;
      } else {
        $scope.postData.compare = 0;
        $scope.postData.portfolio_id = $scope.inputData.port_portfolio_id;
        $scope.postData.allocation = $scope.inputData.portfolioAllocations;
      }
    };

    function clearElement() {
      $('html, body').animate({scrollTop: 0}, 800);
      var myEl = angular.element(document.querySelector('#composition'));
      myEl.empty();
      myEl = angular.element(document.querySelector('#equityVsFixed'));
      myEl.empty();
      myEl = angular.element(document.querySelector('#domVsIntr'));
      myEl.empty();
      myEl = angular.element(document.querySelector('#CompEquityVsFixed'));
      myEl.empty();
      myEl = angular.element(document.querySelector('#domVsIntrCompare'));
      myEl.empty();
      myEl = angular.element(document.querySelector('#equityVsFixedCompare'));
      myEl.empty();
      myEl = angular.element(document.querySelector('#compositionCompare'));
      myEl.empty();
    }

    function createHighChart(element, jsonData, title, size) {
      Highcharts.setOptions({
        colors: ['#26667B', '#0084AD', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#DDDEEE', '#24CFFF']
      });
      Highcharts.chart(element, {
        chart: {
          type: 'pie',
          spacingTop: 0,
          spacingBottom: -50,
          width: null,
          height: null,
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        title: {
          text: title
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 15,
            dataLabels: {
              enabled: false,
              format: '{point.name}'
            },
            showInLegend: true
          }
        },
        legend: {
          enabled: true,
          layout: 'vertical',
          align: 'right',
          width: 270,
          verticalAlign: 'middle',
          useHTML: true,
          labelFormatter: function () {
            return '<div style="text-align: left; width:300px;float:left;">' + this.name + ": " + this.y + '</div>';
          }
        },
        series: [{
            type: 'pie',
            name: 'Asset',
            data: jsonData,
            size: size + "%"
          }]
      });
    }

    function createLineChart(category, series, title, element) {

      Highcharts.setOptions({
        colors: ['#26667B', '#0084AD', '#A1C371', '#5C9D4D']
      });

      $(element).highcharts({
        title: {
          text: title,
          x: -20 //center
        },
        xAxis: {
          categories: category
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          }
        },
        credits: {
          enabled: false
        },
        yAxis: {
          title: {
            text: '$'
          },
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
        },
        tooltip: {
          valueSuffix: '$'
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series: series
      });
    }

    function gridLightChart(categories, series) {
      Highcharts.setOptions({
        colors: ['#26667B', '#0084AD']
      });
      $('#composition').highcharts({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Performance History'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: categories
        },
        yAxis: {
          title: {
            text: '%'
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: false
        },
        plotOptions: {
          column: {
            stacking: 'value'
          }
        },
        series: series
      });
    }

    function bestAndWorstCaseChart(xAxis, serialData) {
      Highcharts.setOptions({
        colors: ['#26667B', '#0084AD', '#A1C371', '#5C9D4D']
      });
      $('#composition').highcharts({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Best and Worst case'
        },
        xAxis: {
          categories: xAxis
        },
        credits: {
          enabled: false
        },
        series: serialData
      });
    }

    function barometerChart(categories, seriesData, xAxisTitle, YAxisTitle, element, chartTitle) {
      Highcharts.setOptions({
        colors: ['#26667B', '#0084AD', '#A1C371', '#5C9D4D']
      });
      $(element).highcharts({
        chart: {
          type: 'column'
        },
        title: {
          text: chartTitle
        },
        xAxis: {
          categories: categories,
          title: {
            text: xAxisTitle
          }
        },
        credits: {
          enabled: false
        },
        yAxis: {
          min: 0,
          title: {
            text: YAxisTitle
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
          }
        },
        legend: {
          align: 'right',
          x: -30,
          verticalAlign: 'top',
          y: 25,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        tooltip: {
          headerFormat: '',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: true,
              color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
              style: {
                textShadow: '0 0 3px black'
              },
              formatter: function () {
                if (this.y !== 0) {
                  return this.y;
                }
              }
            }
          }
        },
        series: seriesData
      });
    }

    function splineChart(categories, seriesData, xAxisTitle, YAxisTitle, element, chartTitle, yAxisFormat, toolTipSuffix) {
      Highcharts.setOptions({
        colors: ['#26667B', '#0084AD', '#A1C371', '#5C9D4D']
      });
      $(element).highcharts({
        chart: {
          zoomType: 'xy'
        },
        title: {
          text: chartTitle
        },
        xAxis: [{
            categories: categories
          }],
        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          }
        },
        yAxis: [{
            labels: {
              format: yAxisFormat,
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            }
          }],
        credits: {
          enabled: false
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          x: 120,
          verticalAlign: 'top',
          y: 100,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: seriesData,
        tooltip: {
          shared: true,
          valueSuffix: toolTipSuffix
        }
      });

    }
  }
]).directive('footerDetails', function (ApiRequest) {
  return {
    templateUrl: 'Pac/View/data_disclosure.tpl.html',
    restrict: 'E',
    link: function (scope) {
      ApiRequest.getDataDisclosure().
              success(function (data) {
                scope.disCloserTblData = data;
              }).error(function () {});
    }
  };
}).directive('historicalReturns', ['ApiRequest', function (ApiRequest) {
    return {
      templateUrl: 'Pac/View/historical_returns.tpl.html',
      restrict: 'E',
      link: function (scope) {
        ApiRequest.getHistoricalAssertClassReturns(scope.postData).
                success(function (data) {
                  if (data.portfolio) {
                    scope.hisAstClsData = data;
                  } else if (data.comparision) {
                    scope.hisAstClsDataCompare = data.comparision;
                  }

                }).error(function () {});
      }
    };
  }]).directive('performanceHistoryTable', function () {
  return {
    templateUrl: 'Pac/View/performance_history.tpl.html',
    restrict: 'E',
    link: function (scope) {
    }
  };
}).directive('bestAndWorstTable', function () {
  return {
    templateUrl: 'Pac/View/best_and_worst_table.tpl.html',
    restrict: 'E',
    link: function (scope) {
    }
  };
}).directive('riskBarometer', function () {
  return {
    templateUrl: 'Pac/View/risk_barometer.tpl.html',
    restrict: 'E',
    link: function (scope) {
    }
  };
}).directive('normalDistribution', function () {
  return {
    templateUrl: 'Pac/View/normal_distribution.tpl.html',
    restrict: 'E',
    link: function (scope) {
    }
  };
}).directive('skittleChart', ['ApiRequest', function (ApiRequest) {
    return {
      templateUrl: 'Pac/View/skittle_chart.tpl.html',
      restrict: 'E',
      link: function (scope) {
        ApiRequest.getPortfolioReport(scope.postData).success(function (portfolioData) {
          scope.portfolioAssetClasses = portfolioData.portfolio.assetclass;
          scope.annualRecords = portfolioData.portfolio.annual;
        }).error(function () {
        });
      }
    };
  }]).directive('stressTest', ['ApiRequest', function (ApiRequest) {
    return {
      templateUrl: 'Pac/View/stress_test.tpl.html',
      restrict: 'E',
      link: function (scope) {
        ApiRequest.getStressTest(scope.postData).
                success(function (stressData) {
                  var yearList = stressData.portfolio.years;
                  var valuationRawList = stressData.portfolio.data.valuation;
                  var valuationFormatedList = [];
                  for (var rowData in valuationRawList) {
                    for (var allocationData in valuationRawList[rowData]) {
                      valuationFormatedList.push(allocationData);
                    }
                    break;
                  }
                  var valuationFormatedListFinal = [];
                  for (var valuationData in valuationFormatedList) {
                    var yearObj = [];
                    yearObj.push(valuationFormatedList[valuationData]);
                    for (var year in yearList) {
                      yearObj.push(valuationRawList[yearList[year]][valuationFormatedList[valuationData]]);
                    }
                    valuationFormatedListFinal.push(yearObj);
                  }
                  scope.getStressTestdata = stressData;
                  scope.stresTestWithDist = valuationFormatedListFinal;
                }).error(function () {});
      }
    };
  }]);
