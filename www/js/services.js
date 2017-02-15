/*
//=====================================================================================================//
//-----------------------------------------------------------------------------------------------------//
// File name:                                                                                          //
//-----------------------------------------------------------------------------------------------------//
//                                                                                                     //
// Author: Pedro Grillo (Coder)                                                                        //
//-----------------------------------------------------------------------------------------------------//
// Purpose: The purpose of this program is to simulate a console environment where the program         //
// displays the types and amount of resources that a process uses. Resources can be classified         //
// in different types.                                                                                 //
//                                                                                                     //
// Instructions (How to use):                                                                          //
//                                                                                                     //
//                                                                                                     //
// Note: before writing all these commands, remember to write the name of the program.                 //
//                                                                                                     //
// Outputs:                                                                                            //
//                                                                                                     //
// Last date of Modification, by:                                                                      //
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
Services' list:                                       //
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

/**
=============================================================================================================
// * @-Service name: Profile service.                                                                      //
// *                                                                                                       //
// * @-Author:                                                                                             //
// *                                                                                                       //
// * @-Service type: factory.                                                                              //
// *                                                                                                       //
// * @-Service snippet name: profile.F.s1.                                                                 //
// *                                                                                                       //
// * @-Service tag name: F.s1.                                                                             //
// *                                                                                                       //
// * @-Module: app.services.                                                                               //
// *                                                                                                       //
// * @-Purpose description: This service provides this and that, chris this is your part.                  //
// *                                                                                                       //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Last full date modified: 10/20/2016 at 10:13 AM.                                                    //
// * @-Last date of test: 10/20/2016.                                                                      //
// * @-Last test results:                                                                                  //
// * @-Reason for modification: Refactoring code following John Papa's AngularJS code documentation guide. //
// *------------------------------------------------------------------------------------------------------ //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Digital secure signature of developer: PGM.1.618.                                                   //
// * @ Lint compilar used: JShint was used.                                                                //
// * @@ return changeProfilePicture object.                                                                //
// * @@@ Service being used in files:                                                                      //
=============================================================================================================
**/
//=========================================================================================================//
(function() {

    'use strict';

    angular
        .module('app.services', [])
        .factory('Profile', profileFactoryFunction);

    profileFactoryFunction.$inject = ["$http", "$q", "CONFIG","CordovaCamera"];

    function profileFactoryFunction($http, $q, CONFIG, CordovaCamera) {

        self.changeProfilePicture = changeProfilePictureFunction;

        function changeProfilePictureFunction (sourceTypeIndex, uid)
        {
            return CordovaCamera.newImage(sourceTypeIndex, 200)

                .then(function(imageData) {

                if(imageData !== undefined)
                {
                    return self.setGlobal(uid, 'profilePicture', imageData);
                }
                else
                {
                    return imageData;
                }
            },
                      function(error)
                      {
                Codes.handleError(error);
            });
        }
    }

})();
/*
=============================================================================================================
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// Function reference: N/A                                                                                 //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// What was referenced?  N/A                                                                               //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
=============================================================================================================
*/

/**
=============================================================================================================
// * @-Service name: Profile service.                                                                      //
// *                                                                                                       //
// * @-Author:                                                                                             //
// *                                                                                                       //
// * @-Service type: factory.                                                                              //
// *                                                                                                       //
// * @-Service snippet name: profile.F.s1.                                                                 //
// *                                                                                                       //
// * @-Service tag name: F.s1.                                                                             //
// *                                                                                                       //
// * @-Module: app.services.                                                                               //
// *                                                                                                       //
// * @-Purpose description: This service provides this and that, chris this is your part.                  //
// *                                                                                                       //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Last full date modified: 10/20/2016 at 10:13 AM.                                                    //
// * @-Last date of test: 10/20/2016.                                                                      //
// * @-Last test results:                                                                                  //
// * @-Reason for modification: Refactoring code following John Papa's AngularJS code documentation guide. //
// *------------------------------------------------------------------------------------------------------ //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Digital secure signature of developer: PGM.1.618.                                                   //
// *@ Lint compilar used: JShint was used.                                                                 //
// *@@ return changeProfilePicture object.                                                                 //
// *@@@ Service being used in files:                                                                       //
=============================================================================================================
**/
//=========================================================================================================//

/*
=============================================================================================================
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// Function reference: N/A                                                                                 //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// What was referenced?  N/A                                                                               //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
=============================================================================================================
*/

/**
=============================================================================================================
// * @-Service name: Profile service.                                                                      //
// *                                                                                                       //
// * @-Author:                                                                                             //
// *                                                                                                       //
// * @-Service type: factory.                                                                              //
// *                                                                                                       //
// * @-Service snippet name: profile.F.s1.                                                                 //
// *                                                                                                       //
// * @-Service tag name: F.s1.                                                                             //
// *                                                                                                       //
// * @-Module: app.services.                                                                               //
// *                                                                                                       //
// * @-Purpose description: This service provides this and that, chris this is your part.                  //
// *                                                                                                       //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Last full date modified: 10/20/2016 at 10:13 AM.                                                    //
// * @-Last date of test: 10/20/2016.                                                                      //
// * @-Last test results:                                                                                  //
// * @-Reason for modification: Refactoring code following John Papa's AngularJS code documentation guide. //
// *------------------------------------------------------------------------------------------------------ //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Digital secure signature of developer: PGM.1.618.                                                   //
// *@ Lint compilar used: JShint was used.                                                                 //
// *@@ return changeProfilePicture object.                                                                 //
// *@@@ Service being used in files:                                                                       //
=============================================================================================================
**/
//=========================================================================================================//

/*
=============================================================================================================
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// Function reference: N/A                                                                                 //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// What was referenced?  N/A                                                                               //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
=============================================================================================================
*/

/**
=============================================================================================================
// * @-Service name: Profile service.                                                                      //
// *                                                                                                       //
// * @-Author:                                                                                             //
// *                                                                                                       //
// * @-Service type: factory.                                                                              //
// *                                                                                                       //
// * @-Service snippet name: profile.F.s1.                                                                 //
// *                                                                                                       //
// * @-Service tag name: F.s1.                                                                             //
// *                                                                                                       //
// * @-Module: app.services.                                                                               //
// *                                                                                                       //
// * @-Purpose description: This service provides this and that, chris this is your part.                  //
// *                                                                                                       //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Last full date modified: 10/20/2016 at 10:13 AM.                                                    //
// * @-Last date of test: 10/20/2016.                                                                      //
// * @-Last test results:                                                                                  //
// * @-Reason for modification: Refactoring code following John Papa's AngularJS code documentation guide. //
// *------------------------------------------------------------------------------------------------------ //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Digital secure signature of developer: PGM.1.618.                                                   //
// *@ Lint compilar used: JShint was used.                                                                 //
// *@@ return changeProfilePicture object.                                                                 //
// *@@@ Service being used in files:                                                                       //
=============================================================================================================
**/
//=========================================================================================================//
(function() {

    'use strict';

    angular
        .module('app.services')
        .factory("authFactory", authFactoryFunction);

    authFactoryFunction.$inject = ["$http", "$q", "CONFIG","$ionicPopup","$ionicLoading","$timeout"];


    function authFactoryFunction($http, $q, CONFIG, $ionicPopup,$ionicLoading,$timeout)
    {
        return {

            login: function(user)
            {
                var deferred = $q.defer();

                $http(
                    {
                        method: 'POST',
                        skipAuthorization: true,
                        url: CONFIG.APIURL+'/auth/login/',
                        data: "username=" + user.username + "&password=" + user.password,
                        headers:
                        {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-API-KEY' : '123456'}
                    })

                    .then(function(res)
                          {
                    deferred.resolve(res);
                },

                          function errorCallback(error) {
                    if(user.username === "" && user.password === "")
                    {
                return $ionicPopup.alert(
                  {
                      title: 'Username & password field is empty!',
                      template: 'The username and password fields are required in order to login!'
                  });
            }
        else if (user.username === "")
            {
                 return $ionicPopup.alert(
                  {
                      title: 'Username field is empty!',
                      template: 'The username field is required in order to login!'
                  });
            }

           else if (user.password === "")
            {
                 return $ionicPopup.alert(
                  {
                      title: 'Password field is empty!',
                      template: 'The password field is required in order to login!'
                  });
            }
                    var PostDataResponse = error.data.status;

                    if(PostDataResponse == "failure")
                    {
                        var alertPopup = $ionicPopup.alert(
                            {
                                title: 'Error!',
                                template: 'The credentials used to log in were invalid or this user does not exist.<button ui-sref="roleDecision">Sign up for an account.</button>'
                            }
                        );

                        $timeout(function() {

                            alertPopup.close(); //close the popup after 3 seconds for some reason
                        }, 3000);
                    }
                });
                return deferred.promise;
            }
        };
    }
})();
/*
=============================================================================================================
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// Function reference: N/A                                                                                 //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// What was referenced?  N/A                                                                               //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
=============================================================================================================
*/

/**
=============================================================================================================
// * @-Service name: Profile service.                                                                      //
// *                                                                                                       //
// * @-Author:                                                                                             //
// *                                                                                                       //
// * @-Service type: factory.                                                                              //
// *                                                                                                       //
// * @-Service snippet name: profile.F.s1.                                                                 //
// *                                                                                                       //
// * @-Service tag name: F.s1.                                                                             //
// *                                                                                                       //
// * @-Module: app.services.                                                                               //
// *                                                                                                       //
// * @-Purpose description: This service provides this and that, chris this is your part.                  //
// *                                                                                                       //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Last full date modified: 10/20/2016 at 10:13 AM.                                                    //
// * @-Last date of test: 10/20/2016.                                                                      //
// * @-Last test results:                                                                                  //
// * @-Reason for modification: Refactoring code following John Papa's AngularJS code documentation guide. //
// *------------------------------------------------------------------------------------------------------ //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Digital secure signature of developer: PGM.1.618.                                                   //
// *@ Lint compilar used: JShint was used.                                                                 //
// *@@ return changeProfilePicture object.                                                                 //
// *@@@ Service being used in files:                                                                       //
=============================================================================================================
**/
//=========================================================================================================//
(function() {

    'use strict';

    angular
        .module('app.services')
        .service('AuthService', AuthServiceFunction);

    AuthServiceFunction.$inject = ['$q', '$http', 'CONFIG', 'store'];

    function AuthServiceFunction($q, $http, CONFIG, store)
    {
        var token = 'yourTokenKey';
        var isAuthenticated = false;
        var authToken;

        function loadUserCredentials()
        {
            var token = store.get('token');

            if (token)
            {
                useCredentials(token);
            }
        }

        function storeUserCredentials(token)
        {
            window.store.set('token', token);
            useCredentials(token);
        }

        function useCredentials(token)
        {
            isAuthenticated = true;
            authToken = token;
        }

        loadUserCredentials();
    }

})();
/*
=============================================================================================================
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// Function reference: N/A                                                                                 //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// What was referenced?  N/A                                                                               //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
=============================================================================================================
*/

/**
=============================================================================================================
// * @-Service name: Profile service.                                                                      //
// *                                                                                                       //
// * @-Author:                                                                                             //
// *                                                                                                       //
// * @-Service type: factory.                                                                              //
// *                                                                                                       //
// * @-Service snippet name: profile.F.s1.                                                                 //
// *                                                                                                       //
// * @-Service tag name: F.s1.                                                                             //
// *                                                                                                       //
// * @-Module: app.services.                                                                               //
// *                                                                                                       //
// * @-Purpose description: This service provides this and that, chris this is your part.                  //
// *                                                                                                       //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Last full date modified: 10/20/2016 at 10:13 AM.                                                    //
// * @-Last date of test: 10/20/2016.                                                                      //
// * @-Last test results:                                                                                  //
// * @-Reason for modification: Refactoring code following John Papa's AngularJS code documentation guide. //
// *------------------------------------------------------------------------------------------------------ //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Digital secure signature of developer: PGM.1.618.                                                   //
// *@ Lint compilar used: JShint was used.                                                                 //
// *@@ return changeProfilePicture object.                                                                 //
// *@@@ Service being used in files:                                                                       //
=============================================================================================================
**/
//=========================================================================================================//
(function() {

    'use strict';

    angular
        .module('app.services')
        .service('multipartForm', multipartFormFunction);

    multipartFormFunction.$inject = ['$http', 'store', 'jwtHelper','$state','$stateParams'];

    function multipartFormFunction($http,store,jwtHelper,$state,$stateParams)
    {
        var self = this;
        
        var t1 = store.get('token');
        var tp = jwtHelper.decodeToken(t1);

        self.post = postFunction;

        function postFunction(uploadUrl, data)
        {
            var fd = new FormData();

            for(var key in data)
            {
                fd.append(key, data[key]);
            }

            $http.post(uploadUrl, fd,
                       {
                transformRequest: angular.indentity,
                headers:
                {
                    'Content-Type': undefined,
                    'X-API-KEY' : '123456',
                    'TOKEN' : t1
                }
            }).success(function(){
            
       $state.go($state.current, $stateParams, {reload: true, inherit: false});

        });
        }
    }

})();
/*
=============================================================================================================
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// Function reference: N/A                                                                                 //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// What was referenced?  N/A                                                                               //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
=============================================================================================================
*/

/**
=============================================================================================================
// * @-Service name: Profile service.                                                                      //
// *                                                                                                       //
// * @-Author:                                                                                             //
// *                                                                                                       //
// * @-Service type: factory.                                                                              //
// *                                                                                                       //
// * @-Service snippet name: profile.F.s1.                                                                 //
// *                                                                                                       //
// * @-Service tag name: F.s1.                                                                             //
// *                                                                                                       //
// * @-Module: app.services.                                                                               //
// *                                                                                                       //
// * @-Purpose description: This service provides this and that, chris this is your part.                  //
// *                                                                                                       //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Last full date modified: 10/20/2016 at 10:13 AM.                                                    //
// * @-Last date of test: 10/20/2016.                                                                      //
// * @-Last test results:                                                                                  //
// * @-Reason for modification: Refactoring code following John Papa's AngularJS code documentation guide. //
// *------------------------------------------------------------------------------------------------------ //
// *------------------------------------------------------------------------------------------------------ //
// *                                                                                                       //
// * @-Digital secure signature of developer: PGM.1.618.                                                   //
// *@ Lint compilar used: JShint was used.                                                                 //
// *@@ return changeProfilePicture object.                                                                 //
// *@@@ Service being used in files:                                                                       //
=============================================================================================================
**/
//=========================================================================================================//

/*
=============================================================================================================
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// Function reference: N/A                                                                                 //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
// What was referenced?  N/A                                                                               //
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
=============================================================================================================
*/

(function()
{
    'use strict';


})();

//NEW SERVICE PLEASE WORK AND COMMENT!
(function(){

    'use strict';

    angular
        .module('app.services')
        .service('entitiesCategoriesService', entitiesCategoriesServiceFunction);

    function entitiesCategoriesServiceFunction()
    {
        //Setters
        //Getters
        this.CategoriesList = undefined;
        this.entitiesList = undefined;
    }



})();

//HTTP services:
//NEw SERVICE PLEASE WORK AND COMMENT!
(function(){

    'use strict';

    angular
        .module('app.services')
        .service('BpprBackendHttpServices', BpprBackendHttpServicesFunction);

    function BpprBackendHttpServicesFunction()
    {
        //Setters
        //Getters
    }

})();

(function(){

  'use strict';

  angular
    .module('app.services')
    .service('entityProfiles', entityProfilesServiceFunction);

  function entityProfilesServiceFunction($http, store)
  {
    //Setters
    //Getters
    //this.entList = undefined;
    //this.individualEntity = undefined;

    //console.log(this.entList);
  }

})();

(function(){

  'use strict';

  angular
    .module('app.services')
    .service('volunteeringData', volunteeringDataServiceFunction);

  function volunteeringDataServiceFunction($http, store)
  {
    //Setters
    //Getters
    var volunteeringDataObject = undefined;
    this.individualVoluntPost = undefined;
      
      this.setVoluntPost = function(volunt)
      {
          this.individualVoluntPost = volunt;
          volunteeringDataObject = volunt;

          return volunteeringDataObject;
      }
      
      this.getVoluntPost = function()
      {
          return volunteeringDataObject;
      }
      return this;
  }

})();

(function(){

  'use strict';

  angular
    .module('app.services')
    .service('eventData', eventDataServiceFunction);

  function eventDataServiceFunction($http, store)
  {
      var eventDataObject = undefined;
    //Setters
    //Getters
    this.individualEventPost = undefined;
      
      this.setEvent = function(event)
      {
          this.individualEventPost = event;
          eventDataObject = event;
         // console.log(eventDataObject);
          return eventDataObject;
      }
      
      this.getEvent = function()
      {
          return eventDataObject;
      }
      return this;
  }

})();

(function(){

  'use strict';

  angular
    .module('app.services')
    .service('editTextPost', editTextPostServiceFunction);

  function editTextPostServiceFunction($http)
  {
    //Setters
    //Getters

    this.editTextPostVar = undefined;

  }

})();

(function(){

  'use strict';

  angular
    .module('app.services')
    .service('editEventPost', editEventPostFunction);

  function editEventPostFunction($http)
  {
    //Setters
    //Getters
    //Remember to use this.
    this.editEventPostVar = undefined;
  }

})();

(function(){

  'use strict';

  angular
    .module('app.services')
    .service('editVolunteeringPost', editVolunteeringPostFunction);

  function editVolunteeringPostFunction($http)
  {
    //Setters
    //Getters
    //Remember to use this.
    this.editVolunteeringPostVar = undefined;
  }

})();


(function(){
    
    'use strict';
    
    angular
        .module('app.services')
        .service('Events', EventsFunction); 
                 
    function EventsFunction($q, $cordovaCalendar, $ionicPopup, moment)
    {
        console.log(moment);
        
        var incrementDate = function (date, amount) {
            var tmpDate = new Date(date);
            tmpDate.setDate(tmpDate.getDate() + amount);
            tmpDate.setHours(13);
            tmpDate.setMinutes(0);
            tmpDate.setSeconds(0);
            tmpDate.setMilliseconds(0);
            return tmpDate;
        };
        
        var incrementHour = function(date, amount) {
    
            var tmpDate = new Date(date);
            tmpDate.setHours(tmpDate.getHours() + amount);
            
            return tmpDate;
	};
	
	
	
	var getEvents = function(event) {
			var deferred = $q.defer();
  	
			/*
			Logic is:
			For each, see if it exists an event.
			*/
			var promises = [];
        
				event.end_time = incrementHour(event.end_time, 1);
				//console.log('try to find '+JSON.stringify(event));
				promises.push($cordovaCalendar.findEvent({
					title:event.title,
					startDate:event.start_time
				}));
			
			$q.all(promises).then(function(results) {
				console.log("in the all done");	
				//should be the same len as events
				for(var i=0;i<results.length;i++) {
					event.status = results[i].length === 1;
				}
                
				deferred.resolve(event);
			});
			
			return deferred.promise;
	}
	
	var addEvent = function(event) {
        //event.start_time = moment(event.start_time);
        //event.end_time = moment(event.end_time);
        console.log(event);
		var deferred = $q.defer();
		$cordovaCalendar.createEvent({
			title: event.title,
			notes: event.description,
			startDate: moment(event.start_time),
			endDate:moment(event.end_time)
            
		}).then(function(result)
                {
            
            $ionicPopup.alert({
                title: 'Added to your calendar!',
                template: 'The event was successfully added to your native calendar!'
            });
            
            deferred.resolve(1);
        
        }, function (err) {
            $ionicPopup.alert({
                title: 'Error adding to calendar...',
                template: 'There was an error adding this event to your calendar...'
            });
			deferred.resolve(0);
		
        });	
		
		return deferred.promise;

	};
    
    return {
        get: getEvents,
		add:addEvent
	};
   }})();