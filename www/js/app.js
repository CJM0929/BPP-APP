
//Angular module declaration linted:
 angular
 .module('app', ['ionic','ion-profile-picture','app.controllers', 'app.routes', 'app.directives','app.services','app.constants', 'ngRoute','angular-jwt','angular-storage','ngFileUpload','ngCordova','angularMoment', 'ngMessages', 'ngMap', 'angularMoment'])
     .run(appRunModuleFunction)
     .config(appConfigModuleFunction);

function appRunModuleFunction($ionicPlatform, $rootScope, $timeout ,$cordovaNetwork,$ionicPopup, amMoment)
{
    
    //under development, Network Information
    document.addEventListener("deviceready", function () {

        $scope.network = $cordovaNetwork.getNetwork();
        $scope.isOnline = $cordovaNetwork.isOnline();
        $scope.$apply();

        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
            $scope.isOnline = true;
            $scope.network = $cordovaNetwork.getNetwork();
            $scope.$apply();
        });

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
            //console.log("got offline");
            $scope.isOnline = false;
            $scope.network = $cordovaNetwork.getNetwork();
            $scope.$apply();

            if(!$scope.isOnline)
            {
                $ionicPopup.confirm(
                    {
                        title: 'No Internet Connection',
                        content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
                    }
                ).then(function(result) {
                    if(!result)
                    {
                        ionic.Platform.exitApp();
                    }
                });
            }
        });
    }, false);

    $ionicPlatform.ready(function() {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard)
      {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
          cordova.plugins.Keyboard.disableScroll(false);
          cordova.plugins.Keyboard.close();
      }

      if (window.StatusBar)
      {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
      }
  });

    $rootScope.authStatus = false;
	 //stateChange event
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

        $rootScope.authStatus = toState.authStatus;

        if($rootScope.authStatus)
        {
            //Empty space...
        }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        //console.log("URL : "+toState.url);
        if(toState.url=='/home')
        {
            //console.log("match : "+toState.url);
            $timeout(function() {
                angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
            },1000);
        }
    });
    
    amMoment.changeLocale('de');
    
}

function appConfigModuleFunction($stateProvider, $urlRouterProvider, $ionicConfigProvider)
{
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.text("");
        $ionicConfigProvider.views.swipeBackEnabled(false);
}
