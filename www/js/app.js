/*
  Local Storage Code (Use as is)
*/
angular.module('ionic.utils', [])
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key, defaultValue) {
      return JSON.parse($window.localStorage[key] || JSON.stringify(defaultValue));
    }
  }
}]);

/*
  Ionic default stuff
*/
angular.module('App', ['ionic','ngSanitize', 'ionic.utils'])

.run(function ($ionicPlatform, $localstorage) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('tabs.home', {
                url: "/home",
                views: {
                    'home-tab': {
                        templateUrl: "templates/home.html",
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('tabs.facts', {
                url: "/facts",
                views: {
                    'home-tab': {
                        templateUrl: "templates/facts.html"
                    }
                }
            })
            .state('tabs.facts2', {
                url: "/facts2",
                views: {
                    'home-tab': {
                        templateUrl: "templates/facts2.html"
                    }
                }
            })
            .state('tabs.about', {
                url: "/about",
                views: {
                    'about-tab': {
                        templateUrl: "templates/about.html"
                    }
                }
            })
           /* .state('tabs.navstack', {
                url: "/navstack",
                views: {
                    'about-tab': {
                        templateUrl: "templates/nav-stack.html"
                    }
                }
            })*/
            .state('tabs.contact', {
                url: "/contact",
                views: {
                    'contact-tab': {
                        templateUrl: "templates/contact.html"
                    }
                }
            })
            .state('tabs.list', {
                url: "/list",
                views: {
                    'home-tab': {
                        templateUrl: "templates/list.html",
                        controller:'ListCtrl'
                    }
                }
            });


        $urlRouterProvider.otherwise("/tab/home");

    })


/*
  Main controller
*/

.controller('MainCtrl', function ($scope,$localstorage) {
  $scope.variable = $localstorage.get ('variable', 4);
  $scope.fields = $localstorage.getObject('fields', {
    a: {text: '', state:true},
    b: {text: ''}
  });
  $scope.output = "";
  $scope.$watch('fields', function (fields) {
    console.log('"fields": ' + JSON.stringify(fields, null, '\t'));
  }, true);
  $scope.save = function () {
    $localstorage.setObject('fields', $scope.fields);
  };
})


.controller('ListCtrl', function ($scope,$localstorage) {
     $scope.data = {
     showDelete: false
     };

     $scope.edit = function (item) {
     alert('Edit Item: ' + item.id);
     };
     $scope.share = function (item) {
     alert('Share Item: ' + item.id);
     };

     $scope.moveItem = function (item, fromIndex, toIndex) {
     $scope.items.splice(fromIndex, 1);
     $scope.items.splice(toIndex, 0, item);
     };

     $scope.onItemDelete = function (item) {
     $scope.items.splice($scope.items.indexOf(item), 1);
     };
        $scope.items = [
            { id: 0 },
            { id: 1 },
            { id: 2 },
            { id: 3 }];
});