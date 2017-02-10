/*
//=====================================================================================================//
//-----------------------------------------------------------------------------------------------------//
// File name: main.c                                                                                   //
//-----------------------------------------------------------------------------------------------------//
//                                                                                                     //
// Author: Pedro Grillo (Coder)                                                                        //
//         Jose Freytes (Tester)                                                                       //
// Group: Codiceaeneas                                                                                 //
// Class name: Operating Systems                                                                       //
// Class code:CECS 4230                                                                                //
// Class section: 21                                                                                   //
// Instructor(s): Medina Delgado, Jose R.                                                              //
//-----------------------------------------------------------------------------------------------------//
// Purpose: The purpose of this program is to simulate a console environment where the program         //
// displays the types and amount of resources that a process uses. Resources can be classified         //
// in different types.                                                                                 //
//                                                                                                     //
// Inputs : The available inputs in the console program are:                                           //
// a) -t : means the types of resources that are available in the program for the processes            //
// b) -r : the resources that are gonna run in the program, the user can input as many as they can     //
//         (be sure to match the same number of processes that are gonna run, this is explained on     //
//         the next point).                                                                            //
// c) -p : the amount of processes that are gonna run in the program, this has to match with the same  //
//         amount of resources in -r.                                                                  //
//                                                                                                     //
// Note: before writing all these commands, remember to write the name of the program.                 //
//                                                                                                     //
// Outputs:                                                                                            //
//                                                                                                     //
// Last date of Modification, by:  1/26/16                                                             //
// Reasons for Modification: Finishing touches on the program, everything has been implemented.        //
//                                                                                                     //
// Compatibility: Windows Operating systems.                                                           //
// Compilator used: Code::Block, GNU GCC Compiler.                                                     //
// Modifications:                                                                                      //
// Implementation for optional functions for further implementation for user interface improvement.    //
// ---                                                                                                 //
// Last debug stage test: 1/26/16; on 10:00 A.M.                                                       //
// Result of the last date of test: The program is running successful, but still needs implementation  //
// for optional functions for further implementation for user interface improvement.                   //
=========================================================================================================


==========================================================
/Program's template index:                              //
--------------------------------------------------------//
The program template is organized in the form as:       //
                                                        //
A) Preprocessor's library implementation declarations.  //
B) Macro declarations.                                  //
C) Global variables.                                    //
E) Function Prototypes.                                 //
F) Main function source code definition.                //
G) Functions' definitions.                              //
                                                        //
Template of organization:                               //
                                                        //
//Libraries                                             //
//Macros.                                               //
//Global variables.                                     //
//Function prototypes.                                  //
//Main function source code: int main(void).            //
//Functions' definitions.                               //
========================================================//

========================================================
Routes' list:                                         //
------------------------------------------------------//
Purpose: Function prototypes are to make the function //
definitions and types of the functions available      //
before the program compiles, to be able to determine  //
pre-bugs before they happen very uncertain            //
to the human eyes.                                    //
------------------------------------------------------//
------------------------------------------------------//
int input_read(char *a);                              //
int examine_string(char a[]);                         //
int examine_t_part(char a[]);                         //
int examine_r_part(char a[]);                         //
int examine_p_part(char a[]);                         //
------------------------------------------------------//
int examine_input_data();                             //
void set_resources();                                 //
void set_resources_needs();                           //
------------------------------------------------------//
int deadlock_algorithm();                             //
int verify_resources_for_p_n(int p);                  //
------------------------------------------------------//
void allocate_resources_for_p_n();                    //
void deallocate_resources(int const p);               //
void set_max_resources();                             //
------------------------------------------------------//
------------------------------------------------------//
======================================================//
*/

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
/**********************************************************************************************/
        
//GUEST
/**********************************************************************************************/

//    }) .state('discover', {
//
//        url: '/discover',
//        templateUrl: 'templates/discover.html',
//        abstract:true
//
//    }).state('discover.allPost', {
//
//        url: '/allPost',
//        views: {
//            'tab1': {
//                templateUrl: 'templates/allPost.html',
//                controller: 'allPostsCtrl'
//            }
//        }
//
//    }).state('discover.allEvents', {
//
//        url: '/allEvents',
//        views:
//        {
//            'tab2':
//            {
//                templateUrl: 'templates/allEvents.html',
//                controller: 'allEventsCtrl'
//            }
//        }
//
//    }).state('discover.allVolunteerings', {
//
//        url: '/allVolunteerings',
//        views:
//        {
//            'tab3':
//            {
//                templateUrl: 'templates/allVolunteerings.html',
//                controller: 'allVolunteeringsCtrl'
//            }
//        }
/**********************************************************************************************/
   
        
//HOME 
/**********************************************************************************************/
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

    }).state('login', {

        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl',
        authorization: false

    }).state('profile', {

        url: '/profile',
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl',
        authorization: true

    }).state('entities', {

        url: '/entities',
        templateUrl: 'templates/entities.html',
        controller: 'entitiesCtrl'

    }).state('entityProfiles', {
        url: '/entityProfiles/:profileId',
        templateUrl: 'templates/Entity/entityProfiles.html',
        controller: 'entityProfilesCtrl'
        
        }).state('followedEntities', {
        url: '/followedEntities/:profileId',
        templateUrl: 'templates/followedEntities.html',
        controller: 'followedEntitiesCtrl'

    }).state('categories', {
        url: '/categories',
        templateUrl: 'templates/categories.html',
        controller: 'categoriesCtrl'

    }).state('forgotPassword', {
        url: '/password',
        templateUrl: 'templates/forgotPassword.html',
        controller: 'forgotPasswordCtrl'

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

    }).state('aboutAddressContactInformation', {
        url: '/about',
        templateUrl: 'templates/Entity/aboutAddressContactInformation.html',
        controller: 'aboutAddressContactInformationCtrl'

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
        
        }).state('privateEventFullView',{
        url: '/peivateEventFullView',
        templateUrl: 'templates/privateEventFullView.html',
        controller: 'publicEventFullViewCtrl'

      }).state('privateVolunteeringFullView',{
        url: '/privateVolunteeringFullView',
        templateUrl: 'templates/privateVolunteeringFullView.html',
        controller: 'privateVolunteeringFullViewCtrl'
    
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

        });


    $urlRouterProvider.otherwise('/login');


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
