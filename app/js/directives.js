define(['angular', 'services', 'jquery', 'bootstrap', 'angularBootstrap'], function(angular, services) {
    'use strict';

    /* Directives */

    angular.module('myApp.directives', ['myApp.services', 'ui.bootstrap'])
    /*
     * @Description : iOS style switcher
     */
    .directive('ngSwitcher', function() {
        return {
            require: 'ngModel',
            restrict: 'AE',
            scope: false,
            template: "<div class=\"switch\" ng-class=\"{\'switch-left\': !model, \'switch-right\': model}\" ng-click=\"toggle()\">\n  <div class=\"switch-button\">&nbsp;</div>\n</div>",
            link: function(scope, element, attrs, ngModel) {
                var updateModel;
                updateModel = function() {
                    return scope.model = ngModel.$viewValue;
                };
                scope.toggle = function() {
                    ngModel.$setViewValue(!ngModel.$viewValue);
                    return updateModel();
                };
                return ngModel.$render = function() {
                    return updateModel();
                };
            }
        };
    })
    /*
     * @Description : Select country, province, city and district; input zipcode
     */
    .directive('selectarea', ['AreaService', 'TerritoryService', '$timeout',
        function(AreaService, TerritoryService, $timeout) {
            return {
                restrict: 'E',
                scope: {
                    countryModel: '=',
                    areaModel: '=',
                    provinceModel: '=',
                    cityModel: '=',
                    districtModel: '=',
                    changeEvent: '&'
                },
                templateUrl: 'app/views/directive-template/selectArea.html',
                controller: function($scope, $element, $attrs, $transclude) {
                    TerritoryService.findAll(function(data) {
                        $scope.countries = data;
                        if ($scope.countryModel != undefined) {
                            angular.forEach($scope.countries, function(t) {
                                if (t.code == $scope.countryModel.code) {
                                    $scope.countryModel = t;
                                }
                            })
                        }
                    })

                    AreaService.getAreas({
                        code: ''
                    }, function(data) {
                        $scope.provinces = data;
                        if ($scope.provinceModel != undefined) {
                            angular.forEach($scope.provinces, function(t) {
                                if (t.code == $scope.provinceModel.code) {
                                    $scope.provinceModel = t;
                                    $scope.getCity(t.code);
                                }
                            })
                        }
                    })

                    $scope.onChange = function() {
                        $scope.changeEvent();
                        $scope.getArea();
                    }

                    $scope.getArea = function() {
                        if ($scope.districtModel) {
                            $scope.areaModel = $scope.districtModel;
                        } else if ($scope.cityModel) {
                            $scope.areaModel = $scope.cityModel;
                        } else if ($scope.provinceModel) {
                            $scope.areaModel = $scope.provinceModel;
                        } else if ($scope.countryModel) {
                            $scope.areaModel = $scope.countryModel;
                        } else {
                            $scope.areaModel = undefined;
                        }
                    }


                    $scope.onProvinceChange = function(c) {
                        $scope.cityModel = undefined;
                        $scope.districtModel = undefined;
                        $scope.getCity(c);
                        $scope.onChange();
                    }

                    $scope.onCityChange = function(c) {
                        $scope.districtModel = undefined;
                        $scope.getDistrict(c);
                        $scope.onChange();
                    }

                    $scope.getCity = function(c) {
                        if (c != undefined) {
                            AreaService.getAreas({
                                code: c
                            }, function(data) {
                                $scope.cities = data;
                                if ($scope.cityModel != undefined) {
                                    angular.forEach($scope.cities, function(t) {
                                        if (t.code == $scope.cityModel.code) {
                                            $scope.cityModel = t;
                                            $scope.getDistrict(t.code);
                                        }
                                    })
                                } else {
                                    $scope.districts = [];
                                }
                            })
                        } else {
                            $scope.cities = [];
                            $scope.districts = [];
                        }
                    }
                    $scope.getDistrict = function(c) {
                        if (c != undefined) {
                            AreaService.getAreas({
                                code: c
                            }, function(data) {
                                $scope.districts = data;
                                if ($scope.districtModel != undefined) {
                                    angular.forEach($scope.districts, function(t) {
                                        if (t.code == $scope.districtModel.code) {
                                            $scope.districtModel = t;
                                        }
                                    })
                                }
                            })
                        }
                    }
                }
            }
        }
    ])
    /*
     * @Description : select and input contact infomation
     */
    .directive('contactinfo', ['$timeout', 'DictQueryService',
        function($timeout, DictQueryService) {
            return {
                restrict: 'E',
                scope: {
                    titleKey: '@',
                    contactModel: '=',
                    linkName: '@'
                },
                templateUrl: 'app/views/directive-template/contactInfo.html',
                controller: function($scope, $element, $attrs, $transclude) {
                    DictQueryService.fetch({
                        key: $attrs.titleKey
                    }, function(data) {
                        $scope.infoTitles = data.options;
                        if ($scope.contactModel && $scope.contactModel.length > 0) {
                            angular.forEach($scope.contactModel, function(c) {
                                c.markAsUpdate = true;
                            })
                        } else {
                            $scope.contactModel = [];
                            $scope.contactModel.push({
                                pointName: $scope.infoTitles[0].code,
                                value: '',
                                markAsNew: true
                            })
                        }
                    })

                    function isEmpty(arr) {
                        if ( !! arr == false || !! arr.length == false) {
                            return true;
                        }
                        for (var i = 0; i < arr.length; i++) {
                            if ( !! arr[i].markAsDelete == false) {
                                return false;
                            }
                        }
                        return true;
                    }

                    $scope.removeContactInfo = function(index) {
                        if ( !! $scope.contactModel[index].pointId) {
                            $scope.contactModel[index].markAsDelete = true;
                            $scope.contactModel[index].markAsUpdate = false;
                        } else {
                            $scope.contactModel.splice(index, 1);
                        }
                        if (isEmpty($scope.contactModel)) {
                            $scope.contactModel.push({
                                pointName: $scope.infoTitles[0].code,
                                value: '',
                                markAsNew: true
                            })
                        }
                        if (index == 0) {
                            $timeout(function() {
                                $element.find('input')[0].focus();
                            })
                        } else {
                            $timeout(function() {
                                $element.find('input')[index - 1].focus();
                            })
                        }
                    }


                    $scope.addContactInfo = function(index) {
                        var pointNameTemp;
                        var infoTitlesFlag = [];
                        for (var i = 0; i < $scope.infoTitles.length; i++) {
                            if ($scope.contactModel && $scope.contactModel.length > 0) {
                                angular.forEach($scope.contactModel, function(c) {
                                    if (c.pointName == $scope.infoTitles[i].code)
                                        infoTitlesFlag[i] = true;
                                })
                            }
                        }
                        for (var j = 0; j < infoTitlesFlag.length; j++) {
                            if (infoTitlesFlag[j]) {
                                continue;
                            } else {
                                break;
                            }
                        }
                        if (j == $scope.infoTitles.length) {
                            pointNameTemp = $scope.infoTitles[0].code;
                        } else {
                            pointNameTemp = $scope.infoTitles[j].code;
                        }
                        $scope.contactModel.splice(index + 1, 0, {
                            pointName: pointNameTemp,
                            value: '',
                            markAsNew: true
                        })
                        $timeout(function() {
                            $element.find('input')[index + 1].focus();
                        })
                    }

                }
            }
        }
    ])

    /*
     * @Description : Select country, province, city and district; input zipcode
     */
    .directive('typeaheadJh', ['$compile', '$parse', '$q', '$timeout', '$document', '$position', 'typeaheadParser',
        function($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {

            var HOT_KEYS = [9, 13, 27, 38, 40];

            return {
                require: 'ngModel',
                link: function(originalScope, element, attrs, modelCtrl) {

                    //SUPPORTED ATTRIBUTES (OPTIONS)

                    //minimal no of characters that needs to be entered before typeahead kicks-in
                    var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;

                    //minimal wait time after last character typed before typehead kicks-in
                    var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

                    //should it restrict model values to the ones selected from the popup only?
                    var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

                    //binding to a variable that indicates if matches are being retrieved asynchronously
                    var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

                    //a callback executed when a match is selected
                    var onSelectCallback = $parse(attrs.typeaheadOnSelect);

                    var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

                    var appendToBody = attrs.typeaheadAppendToBody ? $parse(attrs.typeaheadAppendToBody) : false;

                    //INTERNAL VARIABLES

                    //model setter executed upon match selection
                    var $setModelValue = $parse(attrs.ngModel).assign;

                    //expressions used by typeahead
                    var parserResult = typeaheadParser.parse(attrs.typeaheadJh);
                    var extraOption = attrs.extraOption;
                    var hasFocus; //Fuxiao，在typeahead后面加button后，点击button时，typeahead并不能focus
                    //append button or not
                    var withBtn = originalScope.$eval(attrs.withBtn) !== false;
                    //pop-up element used to display matches
                    var popUpEl = angular.element('<div typeahead-popup></div>');
                    popUpEl.attr({
                        matches: 'matches',
                        active: 'activeIdx',
                        select: 'select(activeIdx)',
                        query: 'query',
                        position: 'position'
                    });
                    //custom item template
                    if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
                        popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
                    }

                    //create a child scope for the typeahead directive so we are not polluting original scope
                    //with typeahead-specific data (matches, query etc.)
                    var scope = originalScope.$new();
                    originalScope.$on('$destroy', function() {
                        scope.$destroy();
                    });

                    var resetMatches = function() {
                        scope.matches = [];
                        scope.activeIdx = -1;
                    };

                    var getMatchesAsync = function(inputValue) {

                        var locals = {
                            $viewValue: inputValue
                        };
                        isLoadingSetter(originalScope, true);
                        $q.when(parserResult.source(originalScope, locals)).then(function(matches) {

                            //it might happen that several async queries were in progress if a user were typing fast
                            //but we are interested only in responses that correspond to the current view value
                            if (inputValue === modelCtrl.$viewValue) { //与源码比较，去掉了hasfocus
                                if (matches.length > 0) {

                                    scope.activeIdx = 0;
                                    scope.matches.length = 0;

                                    //transform labels
                                    for (var i = 0; i < matches.length; i++) {
                                        locals[parserResult.itemName] = matches[i];
                                        scope.matches.push({
                                            label: parserResult.viewMapper(scope, locals),
                                            model: matches[i]
                                        });
                                    }

                                    scope.query = inputValue;
                                    //position pop-up with matches - we need to re-calculate its position each time we are opening a window
                                    //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
                                    //due to other elements being rendered
                                    scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                                    scope.position.top = scope.position.top + element.prop('offsetHeight');

                                } else {
                                    resetMatches();
                                    if (!attrs.hasOwnProperty('emptyLabel')) {
                                        scope.matches.push({
                                            label: "未找到" + inputValue,
                                            model: "未找到",
                                            unSelectable: true
                                        });
                                    }

                                    if (extraOption) {
                                        scope.matches.push({
                                            label: extraOption,
                                            model: extraOption,
                                            extraOption: true
                                        });
                                    }

                                    scope.query = inputValue;;
                                    scope.position = $position.position(element);
                                    scope.position.top = scope.position.top + element.prop('offsetHeight');

                                }
                                isLoadingSetter(originalScope, false);
                            }
                        }, function() {
                            resetMatches();
                            isLoadingSetter(originalScope, false);
                        });
                    };

                    resetMatches();

                    //we need to propagate user's query so we can higlight matches
                    scope.query = undefined;

                    //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later 
                    var timeoutPromise;

                    //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
                    //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
                    modelCtrl.$parsers.unshift(function(inputValue) {

                        hasFocus = true;

                        if (inputValue && inputValue.length >= minSearch) {
                            if (waitTime > 0) {
                                if (timeoutPromise) {
                                    $timeout.cancel(timeoutPromise); //cancel previous timeout
                                }
                                timeoutPromise = $timeout(function() {
                                    getMatchesAsync(inputValue);
                                }, waitTime);
                            } else {
                                getMatchesAsync(inputValue);
                            }
                        } else {
                            isLoadingSetter(originalScope, false);
                            resetMatches();
                        }

                        if (isEditable) {
                            return inputValue;
                        } else {
                            if (!inputValue) {
                                // Reset in case user had typed something previously.
                                modelCtrl.$setValidity('editable', true);
                                return inputValue;
                            } else {
                                modelCtrl.$setValidity('editable', false);
                                return undefined;
                            }
                        }
                    });

                    modelCtrl.$formatters.push(function(modelValue) {

                        var candidateViewValue, emptyViewValue;
                        var locals = {};

                        if (inputFormatter) {

                            locals['$model'] = modelValue;
                            return inputFormatter(originalScope, locals);

                        } else {

                            //it might happen that we don't have enough info to properly render input value
                            //we need to check for this situation and simply return model value if we can't apply custom formatting
                            locals[parserResult.itemName] = modelValue;
                            candidateViewValue = parserResult.viewMapper(originalScope, locals);
                            locals[parserResult.itemName] = undefined;
                            emptyViewValue = parserResult.viewMapper(originalScope, locals);

                            return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
                        }
                    });

                    scope.select = function(activeIdx) {
                        //called from within the $digest() cycle
                        var locals = {};
                        var model, item;

                        locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
                        model = parserResult.modelMapper(originalScope, locals);
                        $setModelValue(originalScope, model);
                        modelCtrl.$setValidity('editable', true);

                        onSelectCallback(originalScope, {
                            $item: item,
                            $model: model,
                            $label: parserResult.viewMapper(originalScope, locals)
                        });

                        resetMatches();

                        //return focus to the input element if a mach was selected via a mouse click event
                        element[0].focus();
                    };

                    //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
                    element.bind('keydown', function(evt) {

                        //typeahead is open and an "interesting" key was pressed
                        if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
                            return;
                        }

                        evt.preventDefault();

                        if (evt.which === 40) {
                            scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
                            scope.$digest();

                        } else if (evt.which === 38) {
                            scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
                            scope.$digest();

                        } else if (evt.which === 13 || evt.which === 9) {
                            scope.$apply(function() {
                                scope.select(scope.activeIdx);
                            });

                        } else if (evt.which === 27) {
                            evt.stopPropagation();

                            resetMatches();
                            scope.$digest();
                        }
                    });

                    element.bind('blur', function(evt) {
                        hasFocus = false;
                    });

                    // Keep reference to click handler to unbind it.
                    var dismissClickHandler = function(evt) {
                        if (element[0] !== evt.target) {
                            resetMatches();
                            scope.$digest();
                        }
                    };

                    $document.bind('click', dismissClickHandler);

                    originalScope.$on('$destroy', function() {
                        $document.unbind('click', dismissClickHandler);
                    });

                    var $popup = $compile(popUpEl)(scope);
                    if (appendToBody) {
                        $document.find('body').append($popup);
                    } else {
                        element.after($popup);
                    }
                    if (withBtn) {
                        var btn = angular.element('<a class="col-md-1 col-sm-1 dropdown-toggle icon-in-input" data-toggle="dropdown" href="#"><i class="fa fa-chevron-down"></i></a>');
                        btn.bind('click', function() {
                            resetMatches();
                            modelCtrl.$viewValue = modelCtrl.$viewValue || '.';
                            scope.$digest();
                            getMatchesAsync(modelCtrl.$viewValue);
                            // modelCtrl.$setViewValue('总');
                        });
                        element.after($compile(btn)(scope));
                    }

                }
            };

        }
    ]);
});