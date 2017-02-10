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
app's list:                                           //
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

//Angular module declaration linted:
 angular
 .module('app', ['ionic','ion-profile-picture','app.controllers', 'app.routes', 'app.directives','app.services','app.constants', 'ngRoute','angular-jwt','angular-storage','ngFileUpload','ngCordova','angularMoment', 'ngMessages', 'ngMap'])
     .run(appRunModuleFunction)
     .config(appConfigModuleFunction);

function appRunModuleFunction($ionicPlatform, $rootScope, $timeout ,$cordovaNetwork,$ionicPopup)
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
}

function appConfigModuleFunction($stateProvider, $urlRouterProvider, $ionicConfigProvider)
{
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.text("");
        $ionicConfigProvider.views.swipeBackEnabled(false);
}
