
// $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
// jwtInterceptorProvider.tokenGetter = function() {
//        return localStorage.getItem('token');
//    };
//  $httpProvider.interceptors.push('jwtInterceptor');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
angular.module('app.routes', ['angular-jwt'])


 
.config(function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {

    
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    //en cada petición enviamos el token a través de los headers con el nombre Authorization
    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');

  $stateProvider
    
    .state('home', {
    url: '/Home',
    templateUrl: 'templates/home.html',
    abstract:true
  })

  .state('home.activityFeed', {
      url: '/newsfeed',
      views: {
        'tab1': {
          templateUrl: 'templates/activityFeed.html',
          controller: 'activityFeedCtrl'
        }
      }
    })

  .state('home.volunteering', {
    url: '/volunteer',
    views: {
      'tab2': {
        templateUrl: 'templates/volunteering.html',
        controller: 'volunteeringCtrl'
      }
    }
  })

.state('home.events', {
    url: '/events',
    views: {
      'tab3': {
        templateUrl: 'templates/events.html',
        controller: 'eventsCtrl'
      }
    }
  })

  .state('home.donate', {
    url: '/donate',
    views: {
      'tab4': {
        templateUrl: 'templates/donate.html',
        controller: 'donateCtrl'
      }
    }
  })
///////////////////////////////////////////////////////////
  
  
  
  
  
    .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    abstract:true
  })
  
   .state('entityPost', {
    url: '/entityPost',
    templateUrl: 'templates/Entity/entityPost.html',
    controller: 'entityPostCtrl'
  })

  .state('dashboard.EactivityFeed', {
      url: '/EntityActivityFeed', 
      views: {
        'tab11': {
          templateUrl: 'templates/Entity/EactivityFeed.html',
          controller: 'EactivityFeedCtrl'
        }
      }
    })

  .state('dashboard.Evolunteering', {
    url: '/Evolunteer',
    views: {
      'tab22': {
        templateUrl: 'templates/Entity/Evolunteering.html',
        controller: 'EvolunteeringCtrl'
      }
    }
  })

.state('dashboard.Eevents', {
    url: '/Eevents',
    views: {
      'tab33': {
        templateUrl: 'templates/Entity/Eevents.html',
        controller: 'EeventsCtrl'
      }
        
    }
  })

  .state('dashboard.Edonate', {
    url: '/Edonate',
    views: {
      'tab44': {
        templateUrl: 'templates/Entity/Edonate.html',
        controller: 'EdonateCtrl'
      }
    }
  })
  
  
  
  
  
  
    

  
  
  
  .state('supporterRegistration', {
    url: '/supporterRegistration',
    templateUrl: 'templates/supporterRegistration.html',
    controller: 'supporterRegistrationCtrl'
  })

  .state('entityRegistration', {
    url: '/entityRegistration',
    templateUrl: 'templates/Entity/entityRegistration.html',
    controller: 'entityRegistrationCtrl'
  })
///////////////////////////////////
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
    authorization: false
  })
//////////////////////////////////
  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl',
    authorization: true
  })

  ////////////////////////////////////////////////////
  .state('entities', {
    url: '/entities',
    templateUrl: 'templates/entities.html',
    controller: 'entitiesCtrl'
  })

  .state('entityProfiles', {
    url: '/entityProfiles/:profileId',
    templateUrl: 'templates/Entity/entityProfiles.html',
    controller: 'entityProfilesCtrl'
  })
/////////////////////////////////////////////////////

  .state('categories', {
    url: '/categories', //item-avatar '/entityProfiles/:profileId'
    templateUrl: 'templates/categories.html',
    controller: 'categoriesCtrl'
  })

  .state('forgotPassword', {
    url: '/password',
    templateUrl: 'templates/forgotPassword.html',
    controller: 'forgotPasswordCtrl'
  })
  
   .state('changePassword', {
    url: '/changePassword',
    templateUrl: 'templates/changePassword.html',
    controller: 'changePasswordCtrl'
  })
  
  .state('index', {
    templateUrl: 'index.html',
    controller: 'indexCtrl'
  })

  .state('roleDecision', {
    url: '/selectr',
    templateUrl: 'templates/roleDecision.html',
    controller: 'roleDecisionCtrl'
  })
      
      
      .state('aboutAddressContactInformation', {
    url: '/about',
    templateUrl: 'templates/Entity/aboutAddressContactInformation.html',
    controller: 'aboutAddressContactInformationCtrl'
  })

  .state('volunteering2', {
    url: '/Vpage',
    templateUrl: 'templates/volunteering2.html',
    controller: 'volunteering2Ctrl'
  })

  .state('editSupportersProfile', {
    url: '/editSupportersProfile',
    templateUrl: 'templates/editSupportersProfile.html',
    controller: 'editSupportersProfileCtrl'
  })
  
  .state('editEntityProfile', {
    url: '/editEntityProfile',
    templateUrl: 'templates/Entity/editEntityProfile.html',
    controller: 'editentityProfileCtrl'
  })

  .state('settings', {
    url: '/Settingchoice',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })
  /////////////////////////////////////////////////////
  .state('postVolunt',{
      url: '/postVolunt',
      templateUrl: 'templates/Entity/postVolunt.html',
      controller: 'postVoluntCtrl'
  })
  
  .state('searchSupporters',{
      url: '/searchSupporters',
      templateUrl: 'templates/Entity/searchSupporters.html',
      controller: 'postVoluntCtrl'
  })
  
    .state('emailSent', {
    url: '/confirmreset',
    templateUrl: 'templates/emailSent.html',
    controller: 'emailSentCtrl'
  })
  
  .state('voluntPage',{
      url: '/voluntPage',
      templateUrl: 'templates/voluntPage.html',
      controller: 'voluntPageCtrl'
  })
  
  .state('postEvent',{
      url: '/postEventt',
      templateUrl: 'templates/Entity/postEvent.html',
      controller: 'postEventCtrl'
  })
  
  .state('eventPage',{
      url: '/eventPage',
      templateUrl: 'templates/Entity/eventPage.html',
      controller: 'eventPageCtrl'
  })
  
  .state('entityProfile',{
      url: '/entityProfile',
      templateUrl: 'templates/Entity/entityProfile.html',
      controller: 'entityProfileCtrl'
  })
//////////////////////////////////////////////////////////
$urlRouterProvider.otherwise('/login')

})

.run(["$rootScope", 'jwtHelper', 'store', '$state','authFactory','AuthService', function($rootScope, jwtHelper, store, $state, authFactory, AuthService)
{
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) 
    {
    
      var token = store.get("token") || null;
    
    if (!$rootScope.isAuthenticated) {
        console.log(next.name);

      if (next.name !== 'login' 
          && next.name !== 'roleDecision' 
          && next.name !== 'categories'  
          && next.name !== 'entityProfiles' 
          && next.name !== 'entities'
          && next.name !== 'entityRegistration'
          && next.name !== 'supporterRegistration'
          && next.name !== 'forgotPassword'
          && next.name !== 'emailSent') {

          if (!token) {
            $state.go('login');
            event.preventDefault();
            var bool = jwtHelper.isTokenExpired(token);
            if(bool === true)        
            $state.go('login');
            event.preventDefault();
           }
          }
        }
    });
}])