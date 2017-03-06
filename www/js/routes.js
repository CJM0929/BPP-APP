angular.module('app.routes', ['angular-jwt'])

.config(function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    //en cada petición enviamos el token a través de los headers con el nombre Authorization
    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('token');
    };

    $httpProvider.interceptors.push('jwtInterceptor');

    $stateProvider
//GUEST
/**********************************************************************************************/

        .state('guest', {

        url: '/guest',
        templateUrl: 'templates/guest.html',
        abstract:true

    }).state('guest.activityFeed', {

        url: '/newsfeed',
        views: {
            'tab1': {
                templateUrl: 'templates/activityFeed.html',
                controller: 'activityFeedCtrl'
            }
        }

    }).state('guest.volunteering', {

        url: '/volunteer',
        views:
        {
            'tab2':
            {
                templateUrl: 'templates/volunteering.html',
                controller: 'volunteeringCtrl'
            }
        }

    }).state('guest.events', {

        url: '/events',
        views:
        {
            'tab3':
            {
                templateUrl: 'templates/events.html',
                controller: 'eventsCtrl'
            }
        }

    }).state('home', {

        url: '/home',
        templateUrl: 'templates/home.html',
        abstract:true

    }).state('home.myEntityEvents', {

        url: '/myEntityEvents',
        views: {
            'tab111': {
                templateUrl: 'templates/myEntityEvents.html',
                controller: 'myEntityEventsCtrl'
            }
        }

    }).state('home.registeredEvents', {

        url: '/registeredEvents',
        views:
        {
            'tab222':
            {
                templateUrl: 'templates/registeredEvents.html',
                controller: 'registeredEventsCtrl'
            }
        }

    }).state('home.myEntities', {

        url: '/myEntities',
        views:
        {
            'tab333':
            {
                templateUrl: 'templates/myEntities.html',
                controller: 'myEntitiesCtrl'
            }
        }
        
   }).state('home.discover', {

    url: '/discover',
    views: {
        'tab444': {
            templateUrl: 'templates/discover.html',
            controller: 'discoverCtrl'
        }
    }

        
/**********************************************************************************************/


    }).state('entityPost', {

        url: '/entityPost',
        templateUrl: 'templates/Entity/entityPost.html',
        controller: 'entityPostCtrl'
        
    }).state('dashboard', {

        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
        abstract:true


    }).state('dashboard.EactivityFeed', {

        url: '/EactivityFeed',
        views:
        {
            'tab33':
            {
                templateUrl: 'templates/Entity/EactivityFeed.html',
                controller: 'EactivityFeedCtrl'
            }
        }

    }).state('dashboard.Evolunteering', {

        url: '/Evolunteer',
        views:
        {
            'tab22':
            {
                templateUrl: 'templates/Entity/Evolunteering.html',
                controller: 'EvolunteeringCtrl'
            }
        }

    }).state('dashboard.Eevents', {

        url: '/Eevents',
        views:
        {
            'tab11':
            {
                templateUrl: 'templates/Entity/Eevents.html',
                controller: 'EeventsCtrl'
            }
        }

    }).state('supporterRegistration', {

        url: '/supporterRegistration',
        templateUrl: 'templates/supporterRegistration.html',
        controller: 'supporterRegistrationCtrl'

    }).state('entityRegistration', {

        url: '/entityRegistration',
        templateUrl: 'templates/Entity/entityRegistration.html',
        controller: 'entityRegistrationCtrl'
        
        
    // this is the ROUTE and CONTROLLER for entityProfiles.html
    }).state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl',
        authorization: false
   
    // this is the ROUTE and CONTROLLER for profile.html
    }).state('supporterProfile', {
        url: '/profile',
        templateUrl: 'templates/supporterProfile.html',
        controller: 'supporterProfileCtrl',
        authorization: true

    // this is the ROUTE and CONTROLLER for entities.html
    }).state('entities', {
        url: '/entities',
        templateUrl: 'templates/entities.html',
        controller: 'entitiesCtrl'

    // this is the ROUTE and CONTROLLER for entityProfiles.html
    }).state('entityProfiles', {
        url: '/entityProfiles/',
        templateUrl: 'templates/Entity/entityProfiles.html',
        controller: 'entityProfilesCtrl'

    // this is the ROUTE and CONTROLLER for followedEntities.html
    }).state('followedEntities', {
    url: '/followedEntities/:profileId',
    templateUrl: 'templates/followedEntities.html',
    controller: 'followedEntitiesCtrl'

    // this is the ROUTE and CONTROLLER for categories.html
    }).state('categories', {
        url: '/categories',
        templateUrl: 'templates/categories.html',
        controller: 'categoriesCtrl'

    // this is the ROUTE and CONTROLLER for forgotPassword.html
    }).state('forgotPassword', {
        url: '/password',
        templateUrl: 'templates/forgotPassword.html',
        controller: 'forgotPasswordCtrl'

    // this is the ROUTE and CONTROLLER for changePassword.html
    }).state('changePassword', {
        url: '/changePassword',
        templateUrl: 'templates/changePassword.html',
        controller: 'changePasswordCtrl'

    }).state('index', {
        templateUrl: 'index.html',
        controller: 'indexCtrl'

    }).state('roleDecision', {
        url: '/selectr',
        templateUrl: 'templates/roleDecision.html',
        controller: 'roleDecisionCtrl'

    

    }).state('editSupportersProfile', {
        url: '/editSupportersProfile',
        templateUrl: 'templates/editSupportersProfile.html',
        controller: 'editSupportersProfileCtrl'

    }).state('editEntityProfile', {

        url: '/editEntityProfile',
        templateUrl: 'templates/Entity/editEntityProfile.html',
        controller: 'editentityProfileCtrl'

    }).state('settings', {
        url: '/Settingchoice',
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'

    }).state('postVolunt', {
        url: '/postVolunt',
        templateUrl: 'templates/Entity/postVolunt.html',
        controller: 'postVoluntCtrl'

    }).state('searchSupporters', {
        url: '/searchSupporters',
        templateUrl: 'templates/Entity/searchSupporters.html',
        controller: 'postVoluntCtrl'

    }).state('emailSent', {
        url: '/confirmreset',
        templateUrl: 'templates/emailSent.html',
        controller: 'emailSentCtrl'

    }).state('postEvent', {
        url: '/postEvent',
        templateUrl: 'templates/Entity/postEvent.html',
        controller: 'postEventCtrl'

    }).state('entityProfile', {
        url: '/entityProfile',
        templateUrl: 'templates/Entity/entityProfile.html',
        controller: 'entityProfileCtrl'

    }).state('RegistrationSuccessful', {

        url: '/RegistrationSuccessful',
        templateUrl: 'templates/Entity/RegistrationSuccessful.html'

    }).state('intro', {

        url: '/intro',
        templateUrl: 'templates/intro.html',
        controller:"introCtrl"

    }).state('eventFullView',{
        url: '/eventFullView',
        templateUrl: 'templates/Entity/eventFullView.html',
        controller: 'eventFullViewCtrl'

      }).state('volunteeringFullView',{
        url: '/volunteeringFullView',
        templateUrl: 'templates/Entity/volunteeringFullView.html',
        controller: 'volunteeringFullViewCtrl'

      }).state('publicAbout', {
        url: '/publicAbout',
        templateUrl: 'templates/publicAbout.html',
        controller: 'publicAboutCtrl'

      }).state('editEvent', {

        url: '/editEvent',
        templateUrl: 'templates/Entity/editEvent.html',
        controller:"editEventCtrl"

      }).state('editVolunteering', {

        url: '/editVolunteering',
        templateUrl: 'templates/Entity/editVolunteering.html',
        controller:"editVolunteeringCtrl"

      }).state('editTextPost', {

        url: '/editTextPost',
        templateUrl: 'templates/Entity/editTextPost.html',
        controller:"editTextPostCtrl"
      })
      .state('guestPage', {
       url: '/guestPage',
       templateUrl: 'templates/guestPage.html'
    // controller: 'guestPageCtrl'
  
    }).state('publicEventFullView',{
        url: '/publicEventFullView',
        templateUrl: 'templates/publicEventFullView.html',
        controller: 'publicEventFullViewCtrl'

      }).state('publicVolunteeringFullView',{
        url: '/publicVolunteeringFullView',
        templateUrl: 'templates/publicVolunteeringFullView.html',
        controller: 'publicVolunteeringFullViewCtrl'

        }).state('discoverEventFullView',{
        url: '/discoverEventFullView',
        templateUrl: 'templates/discoverEventFullView.html',
        controller: 'publicEventFullViewCtrl'

      }).state('discoverVolunteeringFullView',{
        url: '/discoverVolunteeringFullView',
        templateUrl: 'templates/discoverVolunteeringFullView.html',
        controller: 'publicVolunteeringFullViewCtrl'
    
         }).state('discoverCategories', {
        url: '/discoverCategories',
        templateUrl: 'templates/discoverCategories.html',
        controller: 'categoriesCtrl'
     
        }).state('allPosts',{
            url: '/allPosts',
            templateUrl: 'templates/allPosts.html',
            controller: 'allPostsCtrl'

        }).state('allEvents',{
            url: '/allEvents',
            templateUrl: 'templates/allEvents.html',
            controller: 'allEventsCtrl'

        }).state('allVolunteerings',{
            url: '/allVolunteerings',
            templateUrl: 'templates/allVolunteerings.html',
            controller: 'allVolunteeringsCtrl'
        
        }).state('guestEventFullView',{
        url: '/guestEventFullView',
        templateUrl: 'templates/guestEventFullView.html',
        controller: 'guestEventFullViewCtrl'

        }).state('guestVolunteeringFullView',{
        url: '/guestVolunteeringFullView',
        templateUrl: 'templates/guestVolunteeringFullView.html',
        controller: 'guestVolunteeringFullViewCtrl'

        }).state('termsAndConditions',{
        url: '/terms_and_Condition',
        templateUrl: 'templates/termsAndConditions.html',
        controller: 'termsAndConditionsCtrl'

        });


    $urlRouterProvider.otherwise('/login');


    
// this are the places the user can go without being registered
}).run(["$rootScope", 'jwtHelper', 'store', '$state','authFactory','AuthService',
      function($rootScope, jwtHelper, store, $state, authFactory, AuthService)
      {
          $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

              var token = store.get("token") || null;

              if (!$rootScope.isAuthenticated)
              {
                  console.log(next.name);

                  if (next.name !== 'login' && 
                      next.name !== 'roleDecision' && 
                      next.name !== 'categories'  && 
                      next.name !== 'entityProfiles' && 
                      next.name !== 'entities' && 
                      next.name !== 'entityRegistration'&& 
                      next.name !== 'supporterRegistration' && 
                      next.name !== 'forgotPassword'&& 
                      next.name !== 'emailSent' && 
                      next.name !== 'entityProfile'&&
                      next.name !=='RegistrationSuccessful' && 
                      next.name !== 'intro'&& 
                      next.name !== 'guestPage'&& 
                      next.name !== 'guest.activityFeed'&& 
                      next.name !== 'guest.events'&& 
                      next.name !== 'guest.volunteering'&& 
                      next.name !== 'publicEventFullView'&& 
                      next.name !== 'publicVolunteeringFullView'&&
                      next.name !== 'publicAbout'&&
                      next.name !== 'guestVolunteeringFullView'&&
                      next.name !== 'guestEventFullView')
                  {
                      if (!token)
                      {
                          $state.go('login');

                          event.preventDefault();

                           $rootScope.bool = jwtHelper.isTokenExpired(token);

                          if($rootScope.bool === true)
                          {
                              $state.go('login');
                          }

                          event.preventDefault();
                      }
                  }
              }
          });
      }]);
