//.config(['$httpProvider', function($httpProvider) {
//    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
//    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
//}])

//.config(function ($httpProvider) {
////  $httpProvider.defaults.headers.common = {};
//  $httpProvider.defaults.headers.post = {};
////  $httpProvider.defaults.headers.put = {};
////  $httpProvider.defaults.headers.patch = {};
//    //  $httpProvider.defaults.headers.patch = {};
//
//})


// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var POST_MAX_CHAR = 2000;

angular.module('app', ['ionic','ion-profile-picture','app.controllers', 'app.routes', 'app.directives','app.services','app.constants', 'ngRoute','angular-jwt','angular-storage','ngFileUpload','ngCordova','angularMoment',])//'ngRoute',

 
          
.run(function($ionicPlatform, $rootScope, $timeout ,$cordovaNetwork,$ionicPopup) {
    

    
    
    
    //under development, Network Information
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
     document.addEventListener("deviceready", function () {
 
        $scope.network = $cordovaNetwork.getNetwork();
        $scope.isOnline = $cordovaNetwork.isOnline();
        $scope.$apply();
        
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            $scope.isOnline = true;
            $scope.network = $cordovaNetwork.getNetwork();
            
            $scope.$apply();
        })
 
        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("got offline");
            $scope.isOnline = false;
            $scope.network = $cordovaNetwork.getNetwork();
            
            $scope.$apply();
            
            
                  if(!$scope.isOnline) {

            $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
                  }
            
            
        })
 
  }, false);
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    
    
    
    
    
    
    
    
    
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(false);
      cordova.plugins.Keyboard.close();

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
    
    $rootScope.authStatus = false;
	 //stateChange event
	  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		  $rootScope.authStatus = toState.authStatus;
		  if($rootScope.authStatus){
			  
			
		  }
    });
    
    
    

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		console.log("URL : "+toState.url);
		if(toState.url=='/home'){
			console.log("match : "+toState.url);
			$timeout(function(){
				angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
			},1000);
		}	
	});
})
   
 .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.text("")
  $ionicConfigProvider.views.swipeBackEnabled(false);
})

