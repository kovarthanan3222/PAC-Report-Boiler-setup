angular.module('templates-app', ['Pac/View/asset_class_statistics.tpl.html', 'Pac/View/best_and_worst_table.tpl.html', 'Pac/View/data_disclosure.tpl.html', 'Pac/View/historical_returns.tpl.html', 'Pac/View/normal_distribution.tpl.html', 'Pac/View/output.tpl.html', 'Pac/View/performance_history.tpl.html', 'Pac/View/risk_barometer.tpl.html', 'Pac/View/skittle_chart.tpl.html', 'Pac/View/stress_test.tpl.html']);

angular.module("Pac/View/asset_class_statistics.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Pac/View/asset_class_statistics.tpl.html",
    "<div>\n" +
    "    <h4 class=\"text-center\">Asset Class Portfolio Statistics</h4>\n" +
    "    <div class=\"asset-portfolio\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th>Asset Class Portfolio Statistics</th>\n" +
    "                        <th>Asset Class Portfolio</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"(key, value) in hisAstClsData.portfolio.totalreport\">\n" +
    "                        <td>{{key}}</td>\n" +
    "                        <td>{{value}}</td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("Pac/View/best_and_worst_table.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Pac/View/best_and_worst_table.tpl.html",
    "<div>\n" +
    "    <h4 class=\"text-center\">Best and Worst Case</h4>\n" +
    "    <div class=\"asset-portfolio\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th></th>\n" +
    "                        <th ng-repeat=\"year in bestAndWorstTabVal\">{{year}} Years</th>\n" +
    "\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tr ng-repeat=\"value in finalBestAndWorstData\">\n" +
    "                    <td ng-repeat=\"v in value track by $index\">{{v}}</td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("Pac/View/data_disclosure.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Pac/View/data_disclosure.tpl.html",
    "<div>\n" +
    "    <h4 class=\"text-center\">Data Disclosure</h4>\n" +
    "    <div class=\"asset-portfolio\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped table-scroll\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th>Asset Classes</th>\n" +
    "                        <th>Index Data </th>\n" +
    "                        <th>Annualized Return</th>\n" +
    "                        <th>Standard Deviation</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"tbldata in disCloserTblData\">\n" +
    "                        <td>{{tbldata.assetClass}}</td>\n" +
    "                        <td>{{tbldata.indexData}}</td>\n" +
    "                        <td>{{tbldata.annualizedReturns}}</td>\n" +
    "                        <td>{{tbldata.stdDeviation}}</td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("Pac/View/historical_returns.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Pac/View/historical_returns.tpl.html",
    "<div>\n" +
    "    <h4 class=\"text-center\">Historical Asset Class Portfolio Returns</h4>\n" +
    "\n" +
    "    <div class=\"asset-portfolio\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped table-scroll\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th>Year</th>\n" +
    "                        <th>Asset Class Portfolio</th>\n" +
    "                        <th ng-show=\"hisAstClsDataCompare\">Compare</th>\n" +
    "                        <th ng-show=\"hisAstClsDataCompare\">+/-Index</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"tbldata in hisAstClsData.portfolio.yearreport\">\n" +
    "                        <td>{{tbldata.year}}</td>\n" +
    "                        <td>{{tbldata.portfolio}}%</td>\n" +
    "                        <td ng-show=\"hisAstClsDataCompare\">{{hisAstClsDataCompare.yearreport[tbldata.year].portfolio}}%</td>\n" +
    "                        <td ng-show=\"hisAstClsDataCompare\">{{tbldata.portfolio - hisAstClsDataCompare.yearreport[tbldata.year].portfolio |number:2}}%</td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div>\n" +
    "    <h4 class=\"text-center\">Asset Class Portfolio Statistics</h4>\n" +
    "    <div class=\"asset-portfolio\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped table-scroll\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th>Asset Class Portfolio Statistics</th>\n" +
    "                        <th>Asset Class Portfolio</th>\n" +
    "                        <th ng-show=\"hisAstClsDataCompare\">Compare</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"(key, value) in hisAstClsData.portfolio.totalreport\">\n" +
    "                        <td>{{key}}</td>\n" +
    "                        <td>{{value}}</td>\n" +
    "                        <td ng-show=\"hisAstClsDataCompare\">{{hisAstClsDataCompare.totalreport[key]}}</td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("Pac/View/normal_distribution.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Pac/View/normal_distribution.tpl.html",
    "<div>\n" +
    "    <h4 class=\"text-center\">Distribution</h4>\n" +
    "    <div class=\"asset-portfolio\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th></th>\n" +
    "                        <th ng-repeat=\"(key, value) in distributionLabel\">{{key}}</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"distribution in distributions\">\n" +
    "                        <td ng-repeat=\"(key, val) in distribution\">\n" +
    "                            {{val}}%\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"asset-portfolio\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th></th>\n" +
    "                        <th ng-repeat=\"value in distributionKeys\">{{value}}</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"rangeDistribution in rangeDistributions\">\n" +
    "                        <td ng-repeat=\"val in rangeDistribution\">\n" +
    "                            {{val}}%\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("Pac/View/output.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Pac/View/output.tpl.html",
    "<div class=\"overlay_popup\"></div>\n" +
    "<div class=\"masterheader\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-6\">\n" +
    "                <img src=\"assets/images/header-logo.png\" class=\"logo-header\" alt=\"header-logo\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div id=\"wrapper\">\n" +
    "    <input type=\"hidden\" name=\"advisor_id\" value=\"1\" id=\"current_advisor\"/>\n" +
    "    <div class=\"sidebar-collapse\"><span ng-click=\"collapseme=!expandme\" ng-show=\"collapseme\"> < </span></div>\n" +
    "    <div class=\"side-panel sidebar\" ng-hide=\"collapseme\" role=\"navigation\">\n" +
    "        <div class=\"sidebar-nav navbar-collapse\">\n" +
    "            <div class=\"header\">Portfolio Analytics Center<span ng-click=\"expandme=!collapseme\" class=\"sidebar-collapse\"> < </span></div>\n" +
    "            <div class=\"slim-scroll-wrapper\">\n" +
    "            <ul class=\"nav\" id=\"side-menu\">\n" +
    "                <li class=\"first-level-menus active\">\n" +
    "                    <a href=\"javascript:void(0)\" class=\"pull-left action-btns\" ng-click=\"showActionButtons('scenario')\"><span class=\"glyphicon arrow\"></span> Scenario Inputs </a>\n" +
    "                    <span class=\"pull-right btn-actions\" style=\"padding: 10px 15px;\" ng-show=\"scenarioAction==true\">\n" +
    "                        <span class=\"btn-controls-wrapper\">\n" +
    "                            <button class=\"btn btn-controls btn-refresh\" ng-click=\"initializeFormData();\">\n" +
    "                                <i class=\"ic icon-refresh ic-lg\" aria-hidden=\"true\"></i>\n" +
    "                            </button>\n" +
    "                        </span>\n" +
    "                        <span class=\"btn-controls-wrapper\">\n" +
    "                            <button class=\"btn btn-controls btn-save\" data-toggle=\"customcollapse\" data-target=\"#save\">\n" +
    "                                <i class=\"ic icon-save-all ic-lg\" aria-hidden=\"true\"></i>\n" +
    "                            </button>\n" +
    "                            <div id=\"save\" class=\"collapse popup-dialog\">\n" +
    "                                <div class=\"popup-body\">\n" +
    "                                    <div class=\"form-group\">\n" +
    "                                        <label for=\"\">Save Scenario</label>\n" +
    "                                        <input type=\"text\" class=\"form-control\" id=\"save-scenario-name\" placeholder=\"Scenario Name\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"text-right\">\n" +
    "                                        <button class=\"btn btn-primary-blue btn-outline close-overlay\" data-dismiss=\"cancel-popup\">Cancel</button>\n" +
    "                                        <button class=\"btn btn-primary-blue\" ng-click=\"saveScenario('')\">Save</button>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>                           \n" +
    "                        </span>\n" +
    "                        <span class=\"btn-controls-wrapper\">\n" +
    "                            <button class=\"btn btn-controls btn-save-edit\" data-toggle=\"customcollapse\" data-target=\"#save-edit\">\n" +
    "                                <i class=\"ic icon-save-edit ic-lg\" aria-hidden=\"true\"></i>\n" +
    "                            </button>\n" +
    "                            <div id=\"save-edit\" class=\"collapse popup-dialog\">\n" +
    "                                <div class=\"popup-body\">\n" +
    "                                    <div class=\"form-group\">\n" +
    "                                        <label for=\"\">Save Scenario as</label>\n" +
    "                                        <input type=\"text\" class=\"form-control\" id=\"saveas-scenario-name\" placeholder=\"Scenario Name\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"text-right\">\n" +
    "                                        <button class=\"btn btn-primary-blue btn-outline close-overlay\" data-dismiss=\"cancel-popup\">Cancel</button>\n" +
    "                                        <button class=\"btn btn-primary-blue\" ng-click=\"saveAsScenario()\">Save</button>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>                           \n" +
    "                        </span>\n" +
    "                    </span>\n" +
    "                    <span class=\"clearfix\"></span> \n" +
    "                    <ul class=\"nav nav-second-level\">\n" +
    "                        <li>\n" +
    "                            <div class=\"cmn-panel bg-transparent\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label class=\"sr-only\" for=\"\">Default Scenario</label>\n" +
    "                                    <div class=\"input-group\">\n" +
    "                                        <div class=\"input-group-addon\"><i class=\"glyphicon glyphicon-search\"></i></div>\n" +
    "                                        <md-autocomplete\n" +
    "                                        		id=\"scenario-auto-complete\"\n" +
    "                                        		md-no-cache=true\n" +
    "                                            md-selected-item-change=\"selectScenario(item)\"\n" +
    "                                            md-selected-item=\"savedScenario\"\n" +
    "                                            md-search-text=\"inputData.searchText\"\n" +
    "                                            md-items=\"item in scenarioSearch(inputData.searchText)\"\n" +
    "                                            md-item-text=\"item.name\"\n" +
    "                                            md-min-length=\"0\"\n" +
    "                                            placeholder=\"Default Scenario\"\n" +
    "                                            md-menu-class=\"autocomplete-custom-template\">\n" +
    "                                            <md-item-template>\n" +
    "                                                <span class=\"item-title scenarios\">\n" +
    "                                                    <span>{{item.name}}</span>\n" +
    "                                                    <span ng-click=\"deletePortFolio(item.id);\"><span class=\n" +
    "                                                                                                     \"pull-right\"><i class=\"ic icon-delete-button ic-valign fa-fw trash-bg\" aria-hidden=\"true\" data-toggle=\"customcollapse\" ng-click=\"$event.stopPropagation();test();\" data-target=\"#delete{{item.id}}\"></i></span></span>\n" +
    "                                                    <div id=\"delete{{item.id}}\" class=\"collapse popup-dialog\">\n" +
    "                                                        <div class=\"popup-body\">\n" +
    "                                                            <div class=\"form-group\">\n" +
    "                                                                <label for=\"\">Save Scenario</label>\n" +
    "                                                                <input type=\"text\" class=\"form-control\" id=\"save-scenario-name\" placeholder=\"Scenario Name\">\n" +
    "                                                            </div>\n" +
    "                                                            <div class=\"text-right\">\n" +
    "                                                                <button class=\"btn btn-primary-blue btn-outline close-overlay\" data-dismiss=\"cancel-popup\">Cancel</button>\n" +
    "                                                                <button class=\"btn btn-primary-blue\" ng-click=\"saveScenario('')\">Save</button>\n" +
    "                                                            </div>\n" +
    "                                                        </div>\n" +
    "                                                    </div>\n" +
    "                                                </span>\n" +
    "                                            </md-item-template>\n" +
    "                                        </md-autocomplete>\n" +
    "                                        <div class=\"input-group-addon\" ng-click=\"openAutocomplete('#scenario-auto-complete')\"><i class=\"glyphicon glyphicon-menu-down\"></i></div>\n" +
    "                                    </div>\n" +
    "                                </div>                           \n" +
    "                            </div>                        \n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"cmn-panel\">\n" +
    "                                <div class=\"form-horizontal\">\n" +
    "                                    <div class=\"form-group mb0\">\n" +
    "                                        <label class=\"col-xs-3 control-label\">Date</label>\n" +
    "                                        <div class=\"col-md-offset-0 col-xs-7\">\n" +
    "                                            <div class=\"input-group dateCustomize\">\n" +
    "                                                <md-datepicker ng-model=\"inputData.portfolio_date\" md-placeholder=\"Enter date\" md-open-on-focus></md-datepicker>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"cmn-panel\">\n" +
    "                                <span class=\"slider-header\">Investment Amount ($)</span>\n" +
    "                                <span class=\"pull-right slider-label\">{{(inputData.investment_amount.value)|number:0}}</span>\n" +
    "                                <div class=\"invest-amount\">\n" +
    "                                    <rzslider rz-slider-model=\"inputData.investment_amount.value\"\n" +
    "                                              rz-slider-options=\"inputData.investment_amount.options\">\n" +
    "                                    </rzslider>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"cmn-panel\">\n" +
    "                                <span class=\"slider-header\">Annual Distribution</span><br>\n" +
    "                                <span class=\"slider-sub-header\">(% of Initial Investment)</span>\n" +
    "                                <span class=\"pull-right slider-label\"><span>{{inputData.annual_distribution.value}}%</span><i>&nbsp;|&nbsp;</i><span>{{(inputData.investment_amount.value * (inputData.annual_distribution.value / 100)) | number:0}}$</span></span>\n" +
    "                                <div class=\"annual-distribution\">\n" +
    "                                    <rzslider rz-slider-model=\"inputData.annual_distribution.value\"\n" +
    "                                              rz-slider-options=\"inputData.annual_distribution.options\">\n" +
    "                                    </rzslider>                               \n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"cmn-panel\">\n" +
    "                                <span class=\"slider-header\">Fee Adjustment (%)</span>\n" +
    "                                <span class=\"pull-right slider-label\">{{inputData.fee_adjustment.value}}</span>\n" +
    "                                <div class=\"free-adjustment\">\n" +
    "                                    <rzslider rz-slider-model=\"inputData.fee_adjustment.value\"\n" +
    "                                              rz-slider-options=\"inputData.fee_adjustment.options\">\n" +
    "                                    </rzslider>                               \n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"cmn-panel\">\n" +
    "                                <span class=\"slider-header\">Custom period</span>\n" +
    "                                <span class=\"pull-right slider-label\">{{inputData.custom_period.minValue}}-{{inputData.custom_period.maxValue}}</span>\n" +
    "                                <div class=\"custom-period\">\n" +
    "                                    <rzslider rz-slider-model=\"inputData.custom_period.minValue\"\n" +
    "                                              rz-slider-high=\"inputData.custom_period.maxValue\"\n" +
    "                                              rz-slider-options=\"inputData.custom_period.options\"></rzslider>                               \n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"cmn-panel\">\n" +
    "                                <span class=\"slider-header\">Asset Class Mix (%)</span>\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label class=\"sr-only\" for=\"\">Default Scenario</label>\n" +
    "                                    <div class=\"input-group\">\n" +
    "                                        <div class=\"input-group-addon\"><i class=\"glyphicon glyphicon-search\"></i></div>\n" +
    "                                        <md-autocomplete\n" +
    "                                        		id=\"scenario-assetclass-mix\"\n" +
    "                                        		md-no-cache=true\n" +
    "                                            md-selected-item-change=\"selectAssetClassMix(item, item.type, 'scenario')\"\n" +
    "                                            md-search-text=\"inputData.scenarioAssetMixText\"\n" +
    "                                            md-items=\"item in assetClassMixSearch(inputData.scenarioAssetMixText, 'scenario')\"\n" +
    "                                            md-item-text=\"item.name\"\n" +
    "                                            md-min-length=\"0\"\n" +
    "                                            placeholder=\"Equity 65% / Fixed Income 35%\"\n" +
    "                                            md-menu-class=\"autocomplete-custom-template\">\n" +
    "                                            <md-item-template>\n" +
    "                                                <span class=\"item-title scenarios\">\n" +
    "                                                    <span>{{item.name}}</span>\n" +
    "                                                </span>\n" +
    "                                            </md-item-template>\n" +
    "                                        </md-autocomplete>\n" +
    "                                        <div class=\"input-group-addon\" ng-click=\"openAutocomplete('#scenario-assetclass-mix')\"><i class=\"glyphicon glyphicon-menu-down\"></i></div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"save-asset\" ng-show = \"saveScenarioAssetClass == true\">\n" +
    "                                    <span data-toggle=\"customcollapse\" data-target=\"#scenario-portfolio-save\"><a href=\"javascript:void(0)\">Click here to save asset class mix</a></span>\n" +
    "                                    <span>\n" +
    "                                        <button class=\"btn btn-controls btn-sm-primary-orange btn-sm\" ng-click=\"changeDefaultAsset('scenario');\"><i class=\"ic icon-cancel-form ic-2x\" aria-hidden=\"true\"></i></button>\n" +
    "                                        <div id=\"scenario-portfolio-save\" class=\"collapse popup-dialog\">\n" +
    "                                            <div class=\"popup-body\">\n" +
    "                                                <div class=\"form-group\">\n" +
    "                                                    <label for=\"\">Save Portfolio</label>\n" +
    "                                                    <input type=\"text\" class=\"form-control\" id=\"save-scenario-portfolio-name\" placeholder=\"Portfolio Name\">\n" +
    "                                                </div>\n" +
    "                                                <div class=\"text-right\">\n" +
    "                                                    <button class=\"btn btn-primary-blue btn-outline close-overlay\" data-dismiss=\"cancel-popup\">Cancel</button>\n" +
    "                                                    <button class=\"btn btn-primary-blue\" ng-click=\"scenarioPortfolioSave()\">Save</button>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </div>                            \n" +
    "\n" +
    "                                    </span>\n" +
    "                                </div>\n" +
    "                                <div class=\"form-horizontal\">\n" +
    "                                    <div class=\"form-group form-group-sm\" ng-repeat=\"(custom_allocation, allocation) in inputData.scenarioAllocations\">\n" +
    "                                        <label class=\"col-xs-8 control-label\">{{custom_allocation}}</label>\n" +
    "                                        <div class=\"col-xs-2 padding0\">\n" +
    "                                            <input type=\"text\" class=\"form-control\" ng-if=\"custom_allocation != defaultAllocation\" ng-change=\"processAllocation(custom_allocation, 'scenario', false)\" ng-model=\"inputData.scenarioAllocations[custom_allocation]\"/>\n" +
    "                                            <label class=\"asset-label\" ng-if=\"custom_allocation == defaultAllocation\" ng-bind=\"inputData.scenarioAllocations[custom_allocation]\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"col-xs-1 padding0\" ng-if=\"custom_allocation != defaultAllocation\" ng-click=\"processAllocation(custom_allocation, 'scenario', true);\">\n" +
    "                                            <i class=\"ic icon-delete-button ic-valign fa-fw trash-bg\" aria-hidden=\"true\"></i>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label class=\"sr-only\" for=\"\">Default Scenario</label>\n" +
    "                                    <div class=\"input-group\">\n" +
    "                                        <div class=\"input-group-addon\"><i class=\"glyphicon glyphicon-search\"></i></div>\n" +
    "                                        <md-autocomplete\n" +
    "                                        		id=\"scenario-asset-class\"\n" +
    "                                        		md-no-cache=true\n" +
    "                                            md-selected-item-change=\"selectAssetClass(item, 'scenario')\"\n" +
    "                                            md-search-text=\"inputData.scenarioAssetText\"\n" +
    "                                            md-items=\"item in assetClassSearch(inputData.scenarioAssetText, 'scenario')\"\n" +
    "                                            md-item-text=\"item.name\"\n" +
    "                                            md-min-length=\"0\"\n" +
    "                                            placeholder=\"Search and add asset classes\"\n" +
    "                                            md-menu-class=\"autocomplete-custom-template\">\n" +
    "                                            <md-item-template>\n" +
    "                                                <span class=\"item-title scenarios\">\n" +
    "                                                    <span>{{item.name}}</span>\n" +
    "                                                </span>\n" +
    "                                            </md-item-template>\n" +
    "                                        </md-autocomplete>\n" +
    "                                        <div class=\"input-group-addon\" ng-click=\"openAutocomplete('#scenario-asset-class')\"><i class=\"glyphicon glyphicon-menu-down\"></i></div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </li>                                         \n" +
    "                    </ul>\n" +
    "                    <!-- /.nav-second-level -->\n" +
    "                </li>\n" +
    "                <li class=\"first-level-menus\">\n" +
    "                    <a href=\"javascript:void(0)\" class=\"pull-left\" ng-click=\"showActionButtons('portfolio')\"><span class=\"glyphicon arrow\"></span>  Manage Portfolio </a>\n" +
    "                    <span class=\"pull-right btn-actions\" style=\"padding: 10px 11px;\" ng-show=\"portfolioAction==true\">\n" +
    "                        <span class=\"btn-controls-wrapper\">\n" +
    "                            <button class=\"btn btn-controls btn-refresh\" ng-click=\"initializeFormData();\">\n" +
    "                                <i class=\"ic icon-refresh ic-lg\" aria-hidden=\"true\"></i>\n" +
    "                            </button>\n" +
    "                        </span>\n" +
    "                        <span class=\"btn-controls-wrapper\">\n" +
    "                            <button class=\"btn btn-controls btn-save\" data-toggle=\"customcollapse\" data-target=\"#portfolio-save\">\n" +
    "                                <i class=\"ic icon-save-all ic-lg\" aria-hidden=\"true\"></i>\n" +
    "                            </button>\n" +
    "                            <div id=\"portfolio-save\" class=\"collapse popup-dialog\">\n" +
    "                                <div class=\"popup-body\">\n" +
    "                                    <div class=\"form-group\">\n" +
    "                                        <label for=\"\">Save Portfolio</label>\n" +
    "                                        <input type=\"text\" class=\"form-control\" id=\"save-portfolio-name\" placeholder=\"Portfolio Name\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"text-right\">\n" +
    "                                        <button class=\"btn btn-primary-blue btn-outline close-overlay\" data-dismiss=\"cancel-popup\">Cancel</button>\n" +
    "                                        <button class=\"btn btn-primary-blue\" ng-click=\"portfolioSave('')\">Save</button>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>                           \n" +
    "                        </span>\n" +
    "                        <span class=\"btn-controls-wrapper\">\n" +
    "                            <button class=\"btn btn-controls btn-save-edit\" data-toggle=\"customcollapse\" data-target=\"#portfolio-save-edit\">\n" +
    "                                <i class=\"ic icon-save-edit ic-lg\" aria-hidden=\"true\"></i>\n" +
    "                            </button>\n" +
    "                            <div id=\"portfolio-save-edit\" class=\"collapse popup-dialog\">\n" +
    "                                <div class=\"popup-body\">\n" +
    "                                    <div class=\"form-group\">\n" +
    "                                        <label for=\"\">Save Portfolio as</label>\n" +
    "                                        <input type=\"text\" class=\"form-control\" id=\"saveas-portfolio-name\" placeholder=\"Portfolio Name\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"text-right\">\n" +
    "                                        <button class=\"btn btn-primary-blue btn-outline close-overlay\" data-dismiss=\"cancel-popup\">Cancel</button>\n" +
    "                                        <button class=\"btn btn-primary-blue\" ng-click=\"savePortfolioAs()\">Save</button>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>                           \n" +
    "                        </span>\n" +
    "                    </span> \n" +
    "                    <span class=\"clearfix\"></span>\n" +
    "                    <ul class=\"nav nav-second-level\">\n" +
    "                        <li>\n" +
    "                            <div class=\"cmn-panel\">\n" +
    "                                <span class=\"slider-header\">Asset Class Mix (%)</span>\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label class=\"sr-only\" for=\"\">Default Scenario</label>\n" +
    "                                    <div class=\"input-group\">\n" +
    "                                        <div class=\"input-group-addon\"><i class=\"glyphicon glyphicon-search\"></i></div>\n" +
    "                                        <md-autocomplete\n" +
    "                                        		id=\"portfolio-assetclass-mix\"\n" +
    "                                        		md-no-cache=true\n" +
    "                                            md-selected-item-change=\"selectAssetClassMix(item, item.type, 'portfolio')\"\n" +
    "                                            md-selected-item=\"savedPortfolio\"\n" +
    "                                            md-search-text=\"inputData.portfolioAssetMixText\"\n" +
    "                                            md-items=\"item in assetClassMixSearch(inputData.portfolioAssetMixText, 'portfolio')\"\n" +
    "                                            md-item-text=\"item.name\"\n" +
    "                                            md-min-length=\"0\"\n" +
    "                                            placeholder=\"Equity 65% / Fixed Income 35%\"\n" +
    "                                            md-menu-class=\"autocomplete-custom-template\">\n" +
    "                                            <md-item-template>\n" +
    "                                                <span class=\"item-title scenarios\">\n" +
    "                                                    <span>{{item.name}}</span>\n" +
    "                                                </span>\n" +
    "                                            </md-item-template>\n" +
    "                                        </md-autocomplete>\n" +
    "                                        <div class=\"input-group-addon\" ng-click=\"openAutocomplete('#portfolio-assetclass-mix')\"><i class=\"glyphicon glyphicon-menu-down\"></i></div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                \n" +
    "                                <ul class=\"list-inline\">\n" +
    "                                    <li><button class=\"btn btn-sm-primary-orange btn-sm\" ng-click=\"changeDefaultAsset('portfolio')\"><i aria-hidden=\"true\" class=\"ic icon-cancel-form ic-2x\"></i></button></li>\n" +
    "                                </ul>\n" +
    "                                <div class=\"form-horizontal\">\n" +
    "                                    <div class=\"form-group form-group-sm\" ng-repeat=\"(custom_allocation, allocation) in inputData.portfolioAllocations\">\n" +
    "                                        <label class=\"col-xs-8 control-label\">{{custom_allocation}}</label>\n" +
    "                                        <div class=\"col-xs-2 padding0\">\n" +
    "                                            <input type=\"text\" class=\"form-control\" ng-if=\"custom_allocation != defaultAllocation\" ng-change=\"processAllocation(custom_allocation, 'portfolio', false)\" ng-model=\"inputData.portfolioAllocations[custom_allocation]\"/>\n" +
    "                                            <label class=\"asset-label\" ng-if=\"custom_allocation == defaultAllocation\" ng-bind=\"inputData.portfolioAllocations[custom_allocation]\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"col-xs-1 padding0\" ng-if=\"custom_allocation != defaultAllocation\" ng-click=\"processAllocation(custom_allocation, 'portfolio', true);\">\n" +
    "                                            <i class=\"ic icon-delete-button ic-valign fa-fw trash-bg\" aria-hidden=\"true\"></i>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label class=\"sr-only\" for=\"\">Default Scenario</label>\n" +
    "                                    <div class=\"input-group\">\n" +
    "                                        <div class=\"input-group-addon\"><i class=\"glyphicon glyphicon-search\"></i></div>\n" +
    "                                        <md-autocomplete\n" +
    "                                        		id=\"portfolio-assetclass\"\n" +
    "                                        		md-no-cache=true\n" +
    "                                            md-selected-item-change=\"selectAssetClass(item, 'portfolio')\"\n" +
    "                                            md-search-text=\"inputData.portfolioAssetText\"\n" +
    "                                            md-items=\"item in assetClassSearch(inputData.portfolioAssetText, 'portfolio')\"\n" +
    "                                            md-item-text=\"item.name\"\n" +
    "                                            md-min-length=\"0\"\n" +
    "                                            placeholder=\"Search and add asset classes\"\n" +
    "                                            md-menu-class=\"autocomplete-custom-template\">\n" +
    "                                            <md-item-template>\n" +
    "                                                <span class=\"item-title scenarios\">\n" +
    "                                                    <span>{{item.name}}</span>\n" +
    "                                                </span>\n" +
    "                                            </md-item-template>\n" +
    "                                        </md-autocomplete>\n" +
    "                                        <div class=\"input-group-addon\" ng-click=\"openAutocomplete('#portfolio-assetclass')\"><i class=\"glyphicon glyphicon-menu-down\"></i></div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <!-- /.nav-second-level -->\n" +
    "                </li>\n" +
    "\n" +
    "                <li class=\"first-level-menus\">\n" +
    "                    <a href=\"#\" ng-click=\"showActionButtons('compare')\"><span class=\"glyphicon arrow\"></span>  Compare Reports with Benchmark</a>\n" +
    "                    <ul class=\"nav nav-second-level\">\n" +
    "                        <li>\n" +
    "                            <div class=\"cmn-panel cmp-switch\">\n" +
    "                            	<div class=\"compare-input\">\n" +
    "                            		<span class=\"compare-yes\"><b>No</b></span>\n" +
    "                                <md-switch ng-model=\"inputData.compare\" aria-label=\"Compare\" ng-true-value=\"'Yes'\" ng-false-value=\"'No'\" class=\"Compare\"  ng-change=\"switchCompare()\"></md-switch>\n" +
    "                            		<span class=\"compare-no\"><b>Yes</b></span>\n" +
    "                            	</div>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li ng-if = \"inputData.compare == 'Yes'\">\n" +
    "                            <div class=\"cmn-panel\">\n" +
    "                                <span class=\"slider-header\">Asset Class Mix (%)</span>\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label class=\"sr-only\" for=\"\">Default Scenario</label>\n" +
    "                                    <div class=\"input-group\">\n" +
    "                                        <div class=\"input-group-addon\"><i class=\"glyphicon glyphicon-search\"></i></div>\n" +
    "                                        <md-autocomplete\n" +
    "                                        		id=\"compare-assetclass-mix\"\n" +
    "                                        		md-no-cache=true\n" +
    "                                            md-selected-item-change=\"compareAssetClass(item)\"\n" +
    "                                            md-search-text=\"inputData.compareAssetMixText\"\n" +
    "                                            md-items=\"item in assetClassMixSearch(inputData.compareAssetMixText, 'compare')\"\n" +
    "                                            md-item-text=\"item.name\"\n" +
    "                                            md-min-length=\"0\"\n" +
    "                                            placeholder=\"Compare With\"\n" +
    "                                            md-menu-class=\"autocomplete-custom-template\">\n" +
    "                                            <md-item-template>\n" +
    "                                                <span class=\"item-title scenarios\">\n" +
    "                                                    <span>{{item.name}}</span>\n" +
    "                                                </span>\n" +
    "                                            </md-item-template>\n" +
    "                                        </md-autocomplete>\n" +
    "                                        <div class=\"input-group-addon\" ng-click=\"openAutocomplete('#compare-assetclass-mix')\"><i class=\"glyphicon glyphicon-menu-down\"></i></div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <ul class=\"list-inline\">\n" +
    "                                    <li><button class=\"btn btn-sm-primary-orange btn-sm\" ng-click=\"changeDefaultAsset('compare');\"><i class=\"ic icon-cancel-form ic-2x\" aria-hidden=\"true\"></i></button></li>\n" +
    "                                </ul>\n" +
    "                                <div class=\"form-horizontal\">\n" +
    "                                    <div class=\"form-group form-group-sm\" ng-repeat=\"(custom_allocation, allocation) in inputData.compareAllocations\">\n" +
    "                                        <label class=\"col-xs-8 control-label\">{{custom_allocation}}</label>\n" +
    "                                        <div class=\"col-xs-2 padding0\">\n" +
    "                                            <input type=\"text\" class=\"form-control\" ng-if=\"custom_allocation != defaultAllocation\" ng-change=\"processAllocation(custom_allocation, 'compare', false)\" ng-model=\"inputData.compareAllocations[custom_allocation]\"/>\n" +
    "                                            <label class=\"asset-label\" ng-if=\"custom_allocation == defaultAllocation\" ng-bind=\"inputData.compareAllocations[custom_allocation]\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"col-xs-1 padding0\" ng-if=\"custom_allocation != defaultAllocation\" ng-click=\"processAllocation(custom_allocation, 'compare', true);\">\n" +
    "                                            <i class=\"ic icon-delete-button ic-valign fa-fw trash-bg\" aria-hidden=\"true\"></i>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label class=\"sr-only\" for=\"\">Default Scenario</label>\n" +
    "                                    <div class=\"input-group\">\n" +
    "                                        <div class=\"input-group-addon\"><i class=\"glyphicon glyphicon-search\"></i></div>\n" +
    "                                        <md-autocomplete\n" +
    "                                        		id=\"compare-assetclass\"\n" +
    "                                        		md-no-cache=true\n" +
    "                                            md-selected-item-change=\"selectAssetClass(item, 'compare')\"\n" +
    "                                            md-search-text=\"inputData.compareAssetText\"\n" +
    "                                            md-items=\"item in assetClassSearch(inputData.compareAssetText, 'compare')\"\n" +
    "                                            md-item-text=\"item.name\"\n" +
    "                                            md-min-length=\"0\"\n" +
    "                                            placeholder=\"Search and add asset classes\"\n" +
    "                                            md-menu-class=\"autocomplete-custom-template\">\n" +
    "                                            <md-item-template>\n" +
    "                                                <span class=\"item-title scenarios\">\n" +
    "                                                    <span>{{item.name}}</span>\n" +
    "                                                </span>\n" +
    "                                            </md-item-template>\n" +
    "                                        </md-autocomplete>\n" +
    "                                        <div class=\"input-group-addon\" ng-click=\"openAutocomplete('#compare-assetclass')\"><i class=\"glyphicon glyphicon-menu-down\"></i></div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <!-- /.nav-second-level -->\n" +
    "                </li>\n" +
    "\n" +
    "\n" +
    "            </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- /.sidebar-collapse -->\n" +
    "    </div>\n" +
    "    <div id=\"page-wrapper\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-12\">\n" +
    "                    <div class=\"panel panel-default scenario-header\">\n" +
    "                        <div class=\"panel-heading\"><h4>{{scenarioName}}</h4></div>\n" +
    "                        <div class=\"panel-body\">\n" +
    "                            <div id=\"outputContiner\">\n" +
    "\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-12\">\n" +
    "                                        <div id = \"composition\"></div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-12\">\n" +
    "                                        <div id = \"equityVsFixed\"></div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"row\" >\n" +
    "                                    <div class=\"col-md-6\">\n" +
    "                                        <div id = \"CompEquityVsFixed\" style=\"height:200px;\"></div>                                \n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-6\">\n" +
    "                                        <div id = \"domVsIntr\" style=\"height:200px;\"></div>                                \n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-12\">\n" +
    "                                        <div id = \"compositionCompare\"></div>\n" +
    "                                    </div>                         \n" +
    "                                </div>\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-6\">\n" +
    "                                        <div id = \"equityVsFixedCompare\"></div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-6\">\n" +
    "                                        <div id = \"domVsIntrCompare\"></div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                    <!-- /.col-lg-12 -->\n" +
    "                </div>\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <!-- Slider Begins Here -->\n" +
    "                    <div class=\"slider-wrapper\">\n" +
    "                        <div class=\"report-status\">Report <span>{{report.value}}</span> of <span>11</span></div>\n" +
    "                        <div class=\"owl-carousel\">\n" +
    "                            <a href=\"javascript:void(0)\" ng-click=\"createCompositionChart();\"><div class=\"item\">\n" +
    "                                    <img src=\"assets/images/slider/composition.png\" alt=\"thumbnail\">\n" +
    "                                    <div class=\"owlc-caption\">\n" +
    "                                        Composition\n" +
    "                                    </div>\n" +
    "                                </div></a>\n" +
    "                            <a href=\"javascript:void(0)\" ng-click=\"createGrowthOfPortfolio();\" ><div class=\"item\">\n" +
    "                                    <img src=\"assets/images/slider/perfomancehistory.png\" alt=\"thumbnail\">\n" +
    "                                    <div class=\"owlc-caption\">\n" +
    "                                        Growth Of Portfolio\n" +
    "                                    </div>\n" +
    "                                </div></a>\n" +
    "                            <a href=\"javascript:void(0)\" ng-click=\"createDowntownAndRecoveries();\" ><div class=\"item\">\n" +
    "                                    <img src=\"assets/images/slider/perfomancehistory.png\" alt=\"thumbnail\">\n" +
    "                                    <div class=\"owlc-caption\">\n" +
    "                                        Downtown and Recoveries\n" +
    "                                    </div>\n" +
    "                                </div></a>\n" +
    "                            <a href=\"javascript:void(0)\" ng-click=\"createBestAndWorstCaseChart();\" ><div class=\"item\">\n" +
    "                                    <img src=\"assets/images/slider/graphsii.png\" alt=\"thumbnail\">\n" +
    "                                    <div class=\"owlc-caption\">\n" +
    "                                        Best and Worst Case Returns\n" +
    "                                    </div>                                 \n" +
    "                                </div></a>\n" +
    "                            <a href=\"javascript:void(0)\" ng-click=\"createRisksBarometerReport();\" ><div class=\"item\">\n" +
    "                                    <img src=\"assets/images/slider/returngraphs.png\" alt=\"thumbnail\">\n" +
    "                                    <div class=\"owlc-caption\">\n" +
    "                                        Risk Barometer\n" +
    "                                    </div>                                 \n" +
    "                                </div></a>\n" +
    "                            <a href=\"javascript:void(0)\" ng-click=\"createPortfolioPerformenceHistory();\" ><div class=\"item\">\n" +
    "                                    <img src=\"assets/images/slider/graphsii.png\" alt=\"thumbnail\">\n" +
    "                                    <div class=\"owlc-caption\">\n" +
    "                                        Performance History\n" +
    "                                    </div>                                 \n" +
    "                                </div></a>\n" +
    "                            <a href=\"javascript:void(0)\" ng-click=\"createNormalDistribution();\" ><div class=\"item\">\n" +
    "                                    <img src=\"assets/images/slider/composition.png\" alt=\"thumbnail\">\n" +
    "                                    <div class=\"owlc-caption\">\n" +
    "                                        Normal Distribution\n" +
    "                                    </div>                                 \n" +
    "                                </div></a>\n" +
    "                            <a href=\"javascript:void(0)\" ng-click=\"createDataDisclosure();\" ><div class=\"item\">\n" +
    "                                    <img src=\"assets/images/slider/composition.png\" alt=\"thumbnail\">\n" +
    "                                    <div class=\"owlc-caption\">\n" +
    "                                        Data Disclosure\n" +
    "                                    </div>                                 \n" +
    "                                </div></a>\n" +
    "                            <a href=\"javascript:void(0)\" ng-click=\"createHistoricalAssetPortfolioReturns();\"  ><div class=\"item\">\n" +
    "                                    <img src=\"assets/images/slider/composition.png\" alt=\"thumbnail\">\n" +
    "                                    <div class=\"owlc-caption\">\n" +
    "                                        Historical Asset Class Returns\n" +
    "                                    </div>                                 \n" +
    "                                </div></a>\n" +
    "                            <a href=\"javascript:void(0)\" ng-click=\"createStressTest();\" ><div class=\"item\">\n" +
    "                                    <img src=\"assets/images/slider/composition.png\" alt=\"thumbnail\">\n" +
    "                                    <div class=\"owlc-caption\">\n" +
    "                                        Stress Test\n" +
    "                                    </div>                                 \n" +
    "                                </div></a>\n" +
    "\n" +
    "                            <a href=\"javascript:void(0)\" ng-click=\"createSkittleChart();\" ><div class=\"item\">\n" +
    "                                    <img src=\"assets/images/slider/composition.png\" alt=\"thumbnail\">\n" +
    "                                    <div class=\"owlc-caption\">\n" +
    "                                        Skittle Chart\n" +
    "                                    </div>                                 \n" +
    "                                </div></a>\n" +
    "                        </div>                           \n" +
    "                    </div>\n" +
    "                    \n" +
    "                </div>\n" +
    "                <!-- /.row -->\n" +
    "            </div>\n" +
    "            <!-- /.container-fluid -->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("Pac/View/performance_history.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Pac/View/performance_history.tpl.html",
    "<div>\n" +
    "    <h4 class=\"text-center\">Performance History</h4>\n" +
    "    <div class=\"asset-portfolio\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped table-scroll\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th>Year</th>\n" +
    "                        <th>Asset Class Portfolio</th>\n" +
    "                        <th>Amount</th>\n" +
    "                        <th ng-show=\"performanceHistoryCompare\">Compare</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"(key, value) in historyData.portfolio.year\">\n" +
    "                        <td>{{key}}</td>\n" +
    "                        <td>{{historyData.portfolio.year[key].portfolio}}</td>\n" +
    "                        <td>{{historyData.portfolio.year[key].amount | currency}}</td>\n" +
    "                        <td ng-show=\"performanceHistoryCompare\">{{performanceHistoryCompare.year[key].amount | currency}}</td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <td>Annualized Return</td>\n" +
    "                        <td>{{historyData.portfolio[\"Annualized Return\"]}}%</td>\n" +
    "                        <td ng-show=\"performanceHistoryCompare\">{{performanceHistoryCompare[\"Annualized Return\"]}}%</td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <td>Standard Deviation</td>\n" +
    "                        <td>{{historyData.portfolio[\"Standard Deviation\"]}}%</td>\n" +
    "                        <td ng-show=\"performanceHistoryCompare\">{{performanceHistoryCompare[\"Standard Deviation\"]}}%</td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div>\n" +
    "    <h4 class=\"text-center\">Performance History Statistics</h4>\n" +
    "    <div class=\"asset-portfolio\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th>Asset Class Portfolio Statistics</th>\n" +
    "                        <th>Amount</th>\n" +
    "                        <th ng-show=\"performanceHistoryCompare\">Compare</th>\n" +
    "                    </tr>\n" +
    "                    \n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"(key, value) in historyData.portfolio.annual\">\n" +
    "                        <td>{{key}}</td>\n" +
    "                        <td>{{value |currency}}</td>\n" +
    "                        <td ng-show=\"performanceHistoryCompare\">{{performanceHistoryCompare.annual[key] |currency}}</td>\n" +
    "                    </tr>\n" +
    "                    \n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("Pac/View/risk_barometer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Pac/View/risk_barometer.tpl.html",
    "<div>\n" +
    "    <h4 class=\"text-center\">Portfolio Risks</h4>\n" +
    "    <div class=\"asset-portfolio\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th></th>\n" +
    "                        <th ng-repeat=\"(key, value) in portfolioRisksLabel\">{{key}}</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"portfolioRisk in portfolioRisks\">\n" +
    "                        <td ng-repeat=\"(key, val) in portfolioRisk\">\n" +
    "                            {{val}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("Pac/View/skittle_chart.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Pac/View/skittle_chart.tpl.html",
    "<div id=\"skittle-chart\" class=\"skittle-chart\">\n" +
    "    <h4 class=\"text-center\">Skittle Chart</h4>\n" +
    "    <ul ng-repeat=\"(pKey, portfolioAssetClass) in portfolioAssetClasses\">\n" +
    "        <li><span>{{pKey}}</span></li>\n" +
    "        <li ng-repeat=\"(key, val) in portfolioAssetClass\">\n" +
    "            <span style=\"padding: 2px 6px;\">{{key}}</span><span style=\"padding: 2px 6px;\">{{val}}</span>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "<div id=\"skittle-chart-annual\" class=\"skittle-chart\">\n" +
    "    <ul ng-repeat=\"(aKey, annual) in annualRecords\">\n" +
    "        <li>{{aKey}}</li>\n" +
    "        <li ng-repeat=\"(key, val) in annual\">\n" +
    "            <span>{{key}}<br>{{val}}</span>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>");
}]);

angular.module("Pac/View/stress_test.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Pac/View/stress_test.tpl.html",
    "<div>\n" +
    "    <h4 class=\"text-center\">Assert Class Portfolio Stress test</h4>\n" +
    "    <div class=\"asset-portfolio\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th>Assert Classes</th>\n" +
    "                        <th>% Allocation</th>\n" +
    "                        <th ng-repeat=\"tbldata in getStressTestdata.portfolio.years\">\n" +
    "                            {{tbldata}}</th>\n" +
    "\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"(key, value) in postData.allocation\">\n" +
    "                        <td>{{key}}</td>\n" +
    "                        <td>{{value}}%</td>\n" +
    "                        <td ng-repeat=\"(yearKey, allocationValue) in getStressTestdata.portfolio.data.performance[key]\">{{allocationValue}}%</td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div>\n" +
    "    <h4 class=\"text-center\">Asset Class Portfolio Stress Test with Distribution</h4>\n" +
    "    <div class=\"asset-portfolio\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th>Portfolio Valuations</th>\n" +
    "                        <th ng-repeat=\"tbldata in getStressTestdata.portfolio.years\">\n" +
    "                            {{tbldata}}</th>\n" +
    "\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"stresTest in stresTestWithDist\">\n" +
    "                        <td ng-repeat=\"value in stresTest\">{{value}}</td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
