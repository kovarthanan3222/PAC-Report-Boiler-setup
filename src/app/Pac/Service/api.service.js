angular.module('pacApi').
        factory('ApiRequest', ['$http',
          function ($http) {
            return {
              getFormData: function () {
                return $http({
                  method: 'GET',
                  url: 'http://172.24.144.75:8000/api/form-inputs-data'
                });
              },
              getCompositionChartData: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/composition',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });

              },
              growthOfPortfolio: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/portfolio-growth',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
              },
              getPortfolioPerformanceHistory: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/portfolio-performance-history',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
              },
              getBestAndWorstCaseChart: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/best-and-worst-historic-returns',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
              },
              getDownturnsAndRecoveries: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/downturns-recoveries',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
              },
              getDataDisclosure: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/data-disclosure',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });

              },
              getHistoricalAssertClassReturns: function (postData) {

                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/historical-portfolio-returns',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
              },
              getStressTest: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/stress-test',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
              },
              getRiskBarometer: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/portfolio-risks',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
              },
              getPortfolioReport: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/best-assetclass-report',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
              },
              getDistribution: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/portfolio-normal-distribution',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
              },
              getPortfolios: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/search-portfolio',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
              },
              savePortfolioTrigger: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/save-portfolio',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
              },
              getScenarioDetails: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/view-portfolio',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
              }
            };
          }
        ]);
