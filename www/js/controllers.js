/*******************************************************************************************************/
//                                     بسم الله الرحمن الرحيم                                             //
/*******************************************************************************************************/

/*
//=====================================================================================================//
//-----------------------------------------------------------------------------------------------------//
// File name: main.c                                                                                   //
//-----------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------//
// Author: Pedro Grillo (Coder)                                                                        //
//         Jose Freytes (Tester)                                                                       //
// Group: Codiceaeneas                                                                                 //
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
Controllers' list:                                    //
------------------------------------------------------//
Purpose: Function prototypes are to make the function //
definitions and types of the functions available      //
before the program compiles, to be able to determine  //
pre-bugs before they happen very uncertain            //
to the human eyes.                                    //
------------------------------------------------------//
------------------------------------------------------//
COntroller's name: function controllerFunctionName Example, please use.//
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

(function(){

    angular
     .module('app')
     .run(function ($rootScope, $state, $http, $ionicActionSheet, $ionicPopup, store,$window)
    {
     $rootScope.logoutFunction = function (){

                    $rootScope.authToken = undefined; // when logout authToken will be set to undefined
                    $rootScope.isAuthenticated = false; // when logout isAuthenticated will be set to false
                    store.remove('token'); // when logout the token containing the credentials of the user will be deleted



                    $state.go('login'); // when logout the user will automatically go to the login page
                    $rootScope.u = false; // when user logout the profile page of user button will dissapear from the html DOM
                    $rootScope.e = false; // when user logout the profile page of entity button will dissapear from the html DOM
                    $rootScope.l = true;  // when user logout the login button will dissapear from the html DOM
                    $rootScope.s = true;  // when user logout the signup button will dissapear from the html DOM
                    $http.defaults.headers.common.Authorization = undefined; // when logout everything will be set to undefined and default.
                    
         
                        var alertPopup = $ionicPopup.alert({
                             title: "Logout",
                             template: "You've been logged out!"
                         });
                };          
        
                        $rootScope.editSupporterProfile = function() {
                    $state.go('editSupportersProfile');
                    };

                    
                    $rootScope.editEntityProfile = function() {
                    $state.go('editEntityProfile');
                    };

            });

})();

//aboutAddressContactInformationCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('aboutAddressContactInformationCtrl', aboutAddressContactInformationCtrlFunction);

    aboutAddressContactInformationCtrlFunction.$inject = ['$scope', '$log', '$stateParams','CONFIG', 'jwtHelper', 'store','$rootScope','$ionicScrollDelegate','$ionicSlideBoxDelegate','$http','$window','$state','$cordovaGeolocation'];

        function aboutAddressContactInformationCtrlFunction($scope, $log, $stateParams, CONFIG, jwtHelper, store,  $rootScope, $ionicScrollDelegate,$ionicSlideBoxDelegate,$http,$window,$state,$cordovaGeolocation)
{
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });

      var infoWindow = new google.maps.InfoWindow({
        content: "Here I am!"
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open($scope.map, marker);
      });
    });

  }, function(error){
    console.log("Could not get location");
  });

          //obtenemos el token en localStorage
          var token = store.get('token');
          //decodificamos para obtener los datos del user
          var tokenPayload = jwtHelper.decodeToken(token);
          console.log(tokenPayload);
          //los mandamos a la vista como user
          $rootScope.entityAdmin = tokenPayload;

          $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/' + $rootScope.entityAdmin.role_id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/x-www-form-urlencoded',
              'X-API-KEY' : '123456'}
          })
            .success(function (data) {
              $scope.info = data.message;
            });

          $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/posts/'+ $rootScope.entityAdmin.role_id ,
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/x-www-form-urlencoded',
              'X-API-KEY' : '123456'}
          })
            .success(function (data) {
              $scope.posts = data.message.posts;
            })
            .finally(function() {
              // Stop the ion-refresher from spinning
              $scope.$broadcast('scroll.refreshComplete');
            });


          $scope.doRefresh = function() {
            $http({
              method: 'GET',
              skipAuthorization: true,//es necesario enviar el token
              url: 'https://hoyportibppr.com/api/entities/' + $rootScope.entityAdmin.role_id,
              headers: {'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456'}
            })
              .success(function (data) {
                $scope.info = data.message;
                $scope.skills = {};
                $scope.skills = data.message.skills;
                console.log($scope.skills);
                console.log($scope.info);
              })
              .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
              });

            $http({
              method: 'GET',
              skipAuthorization: true,//es necesario enviar el token
              url: 'https://hoyportibppr.com/api/entities/posts/'+ $rootScope.entityAdmin.role_id ,
              headers: {'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456'}
            })
              .success(function (data) {
                $scope.posts = data.message.posts;
              })
              .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
              });

          };

          $scope.call = function () {
            $window.open('tel:' + $scope.info.sup_phone, '_system');
          };

          $scope.mail = function () {
            $window.open('mailto:' + $scope.info.email, '_system');
          };

          $ionicSlideBoxDelegate.update();
          $scope.onUserDetailContentScroll = onUserDetailContentScroll;


          function onUserDetailContentScroll(){
            var scrollDelegate = $ionicScrollDelegate.$getByHandle('userDetailContent');
            var scrollView = scrollDelegate.getScrollView();
            $scope.$broadcast('userDetailContent.scroll', scrollView);
          }
          $scope.toggleItem= function(item) {
            if ($scope.isItemShown(item)) {
              $scope.shownItem = null;
            } else {
              $scope.shownItem = item;
            }
          };
          $scope.isItemShown = function(item) {
            return $scope.shownItem === item;
          };
}

})();

//categoriesCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('categoriesCtrl', categoriesCtrlFunction);

    categoriesCtrlFunction.$inject = ['$scope', '$stateParams','$http', '$state','entityProfiles','$ionicPopup', '$rootScope'];

    function categoriesCtrlFunction($scope, $stateParams, $http, $state,entityProfiles,$ionicPopup, $rootScope) {
        
      $scope.cate = undefined;
      $scope.cate1 = undefined;

      $http({
        url: 'https://hoyportibppr.com/api/entities/categories',
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'
        }
      })
        .then( function(response) {
          $scope.cate = response.data.message.categories;
        console.log($scope.cate);
        });

      $scope.categorySelection = function(val) {

        $http({
          url: 'https://hoyportibppr.com/api/entities/category/'+val,
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'
          }
        })
          .then( function successCallback(response) {
            $scope.cate1 = response.data.message;
            console.log($scope.cate1);
            entityProfiles.entList = $scope.cate1;
            $state.go('entities');

          }, function errorCallback(response){
            $scope.ResponseDetails = response.data.status;
            console.log( $scope.ResponseDetails);

            if($scope.ResponseDetails == "failure"){

              var alertPopup = $ionicPopup.alert({
                title: 'No entities registered in this category.'
              });

            }

          });

      };

    }// categoriesCtrlFunction function definition end.

})();

//changePasswordCtrl
(function(){

    'use strict';

    function changePasswordCtrlFunction($scope, $stateParams, authFactory, jwtHelper, store, $rootScope, $http, $httpParamSerializerJQLike, $state, $ionicPopup)
{
    //Variables:
    $scope.data = {};
    var t1 = store.get('token');
    var tp = jwtHelper.decodeToken(t1);
    $scope.submit = submitFunction;

    //Function declarations:
    function submitFunction()
    {
        $http({
            url: 'https://hoyportibppr.com/api/auth/changepass',
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.data),
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456',
                'TOKEN' : t1
            }

        }).success(function (data, status, headers, config) {

            $scope.PostDataResponse = data.status;

            if($scope.PostDataResponse == "success")
            { // this if condition verify the response was an error and display the error to the user

                var alertPopup = $ionicPopup.alert(
                    { // Pop up which shows the errors to the user
                        title: 'Password Changed!',
                        template: 'Password has been change succesfully. Please sign in again with the new password.'
                    });

                $rootScope.authToken = undefined; // when logout authToken will be set to undefined
                $rootScope.isAuthenticated = false; // when logout isAuthenticated will be set to false
                store.remove('token'); // when logout the token containing the credentials of the user will be deleted
                $state.go('login'); // when logout the user will automatically go to the login page
                $rootScope.u = false; // when user logout the profile page of user button will dissapear from the html DOM
                $rootScope.e = false; // when user logout the profile page of entity button will dissapear from the html DOM
                $rootScope.l = true;  // when user logout the login button will dissapear from the html DOM
                $rootScope.s = true;  // when user logout the signup button will dissapear from the html DOM
                $http.defaults.headers.common.Authorization = undefined; // when logout everything will be set to undefined and default
                $state.transitionTo($state.current, $state.params, { reload: true, inherit: true, notify: true });//reload pg when transition to login page
            }// end of if

        }).error(function (data, status, header, config) {

            $scope.ResponseDetails = data.status;
            $scope.error1 = data.message.current_password;
            $scope.error2 = data.message.new_password;
            $scope.error3 = data.message.new_passconf;

            if($scope.ResponseDetails == "failure")
            {
                // this if condition verify the response was an error and display the error to the user
                var alertPopup = $ionicPopup.alert(
                    { // Pop up which shows the errors to the user
                        title: 'Error!',
                        template: $scope.error1 || $scope.error2 || $scope.error3 || "The current password doesn't match."
                    });
            }// end of if
        });
    }
} // End changePasswordCtrlFunction function definition.

    angular
        .module('app')
        .controller('changePasswordCtrl', changePasswordCtrlFunction);

    changePasswordCtrlFunction.$inject =
    ['$scope', '$stateParams', 'authFactory', 'jwtHelper', 'store', '$rootScope', '$http', '$httpParamSerializerJQLike', '$state', '$ionicPopup'];

})();

//EactivityFeedCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('EactivityFeedCtrl', EactivityFeedCtrlFunction);

    EactivityFeedCtrlFunction.$inject = ['$scope', '$rootScope','$stateParams', '$timeout', '$http', 'store', 'jwtHelper', '$httpParamSerializerJQLike', '$ionicActionSheet', '$state', '$ionicPopup', 'moment'];

       function EactivityFeedCtrlFunction($scope, $rootScope,$stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state, $ionicPopup,moment)
{
    //Variables:

    var t1 = store.get('token');
    var tp = jwtHelper.decodeToken(t1);
    var ent = tp;
     
    $scope.alterPost = alterPostFunction;
    $scope.data={};
    $scope.doRefresh = doRefreshFunction;
    $scope.newPost = newPostGoFunction;


    //Function definitons:
    function alterPostFunction(selectedPost)
    {
        $scope.selectedPost = selectedPost;
        var hideSheet = $ionicActionSheet.show(
            {
                buttons: [{ text: 'Edit' }],
                destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function()
                {
                    // add cancel code..
                },

                buttonClicked: function(index)
                {
                    $scope.data.message = $scope.selectedPost.post_message;
                    console.log($scope.selectedPost.post_message);
                    var myPopup = $ionicPopup.show(
                        {
                            
                            template: "<textarea rows='10' type='text' ng-model='data.message'></textarea>",
                            title: 'Edit Post',
                            scope: $scope,
                            buttons: [{ text: 'Cancel' },
                                      {text: '<b>Save</b>', type: 'button-royal',
                                       onTap: function(e)
                                       {
                                           $http({
                                               url: 'https://hoyportibppr.com/api/entities/post/'+selectedPost.id,
                                               method: 'PUT',
                                               data: $httpParamSerializerJQLike($scope.data),
                                               headers: {
                                                   'Content-Type': 'application/x-www-form-urlencoded',
                                                   'X-API-KEY' : '123456',
                                                   'TOKEN' : t1
                                               }
                                           }).success(function (data, status, headers, config) {

                                               $scope.PostDataResponse = data;
                                               $ionicPopup.alert(
                    {
                        title: 'Edit post successful',
                        template: 'Your activity post was successfuly edited!'
                    });
                    $state.go($state.current, $stateParams, {reload: true, inherit: false});

                                           }).error(function (data, status, header, config) {

                                               $scope.ResponseDetails = data;
                                           });
                                       }
                                      }
                                     ]
                        });
                },
                destructiveButtonClicked: function() {
                    
                    var confirmPopup = $ionicPopup.confirm({
         title: 'Event post deletion',
         template: " This post will be deleted and you won't be able to find it anymore. You can also edit this post, if you just want to change something."
     });
                    
                   
     
     confirmPopup.then(function(res) {
         if(res) {
                    
                   $http({
                        method: 'DELETE',
                        skipAuthorization: true,//es necesario enviar el token
                        url: 'https://hoyportibppr.com/api/entities/post/'+ selectedPost.id,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/x-www-form-urlencoded',
                            'X-API-KEY' : '123456',
                            TOKEN: t1
                        }

                    }).success(function (data) {
                         var alertPopup = $ionicPopup.alert({
     title: 'Post deleted',
     template: 'The post was successfuly deleted!'
   });
                        $state.go($state.current, $stateParams, {reload: true, inherit: false});
                        $scope.delete = data;
                    });    
     } else {
       console.log('You are not sure');
     }
   });
                }
            });
    }
    
    function doRefreshFunction()
    {
        $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/posts/'+ent.role_id ,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456'
            }

        }).success(function (data) {
            $scope.posts = data.message.posts;

        }).finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    }// end of function.

    function newPostGoFunction()
    {
        $state.go('entityPost');
    }

    //Controller code:
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/'+ent.role_id,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'
        }

    }).success(function (data) {
        $scope.info = data.message;
    });

    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/posts/'+ent.role_id,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'
        }

    }).success(function (data) {
        $scope.posts = data.message.posts;
    });
}

})();

//editentityProfileCtrl
(function(){
    
    'use strict';

    function editentityProfileCtrlFunction($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$ionicPopup,$ionicLoading,$state,  multipartForm, $rootScope, eventData)
{
     // Token retrieval
    var t1 = store.get('token');
    // Function to decode token
    var tp = jwtHelper.decodeToken(t1);
    var ent = tp;
    
      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
    
    $scope.cancelEdit = function()
    {
        $state.go('entityProfile')
    }
    
    $scope.data = { "entity": {
        "about":"",
        "ent_name":"",
        "phone":"",
        "founded": "",
        "web": "",
        country: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        fax: "",
        email:""
        }
    };
    
    $scope.info1 = {};
  
    $scope.UpdateData = function() {
         console.log($scope.data);
        $ionicLoading.show({
                template: '<ion-spinner icon="spiral"></ion-spinner><div>Updating profile data...</div>',
                duration: 1618
            });    

    $http({
        url: 'https://hoyportibppr.com/api/entities/edit',
        method: 'POST', 
        data: $scope.data,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
            'TOKEN' : t1 
        }// end of header
      }) 
           
         .success(function (data, status, headers, config) {
        
        $state.go('entityProfile');
        
        var alertPopup = $ionicPopup.alert({
                             title: "Profile information edited",
                             template: "Your profile information was successfuly edited!"
                         });

            })
    
         .error(function (data, status, header, config) {
        console.log(data);
          // here we will get response errors
                $scope.ResponseDetails = data.status;
                console.log( $scope.ResponseDetails);
                $scope.errorMessage = data.message.ent_name;
                $scope.errorMessage1 = data.message.fax;
                $scope.errorMessage2 = data.message.phone;
                $scope.errorMessage3 = data.message.web;
                $scope.errorMessage4 = data.message.web_email;
                $scope.errorMessage5 = data.message.zip;
                $scope.errorMessage6 = data.message.address1;
                $scope.errorMessage7 = data.message.address2;
                $scope.errorMessage8 = data.message;

              if($scope.ResponseDetails === "failure"){ 
                   var alertPopup = $ionicPopup.alert({
                       title: 'Warning',
                       template: $scope.errorMessage || $scope.errorMessage1 || $scope.errorMessage2 || $scope.errorMessage3
                       || $scope.errorMessage4 || $scope.errorMessage5 ||  $scope.errorMessage6 ||  $scope.errorMessage7 || $scope.errorMessage8
                   });     
                }// end of if       
            });// end of .error 
        };// end of UpdateData function
    
    //This $http service gets the current data that the user have to display it in the placeholder of the edit profile fields
     $http({
        method: 'GET',
        skipAuthorization: true,//it's necessary to send the token
        url: 'https://hoyportibppr.com/api/entities/'+ent.role_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
         
         console.log(data);
        
        $scope.data.entity.about=data.message.ent_about;
        $scope.data.entity.ent_name= "";
        $scope.data.entity.phone=data.message.ent_phone;
        $scope.data.entity.founded=data.message.ent_found;
        $scope.data.entity.web=data.message.end_web;
        $scope.data.entity.country=data.message.country_name;
        $scope.data.entity.address1=data.message.ent_address1;
        $scope.data.entity.address2=data.message.ent_address2;
        $scope.data.entity.city= data.message.city_name;
        $scope.data.entity.zip=data.message.ent_zip;
        $scope.data.entity.fax= data.message.ent_fax;
         
        $scope.info = data.message;
        console.log($scope.data);
        
         var img = data.message.ent_pic;
         var type = "entity";
        
         $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: "img=" + img + "&type=" + type,                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.info1 = data;
//            console.log($scope.info1);
            if($scope.info1 === null){
                $state.go($state.current, $stateParams, {reload: true, inherit: false});
            }
              })
        
        $scope.picData = {
        'submit' : $scope.submit = "entity",
        'userfile' : $scope.userfile
    }

   var uploadUrl = 'https://hoyportibppr.com/api/entities/uploadpicture';
    $scope.$watch('data.userfile', function (img) {
        $scope.picData.userfile = img;
        multipartForm.post(uploadUrl, $scope.picData);
//        $state.go($state.current, $stateParams, {reload: true, inherit: false});
    });
   
        $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: "img=" + $scope.img,                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
            if($scope.info == null){
                console.log(data);
                $state.go($state.current, $stateParams, {reload: true, inherit: false});
            
                    $rootScope.info2 = data.message;
            }
                });
        
    }); // end of $http service

}

    editentityProfileCtrlFunction.$inject = ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$ionicPopup','$ionicLoading','$state',  'multipartForm', '$rootScope', 'eventData'];

    angular
        .module('app')
        .controller('editentityProfileCtrl', editentityProfileCtrlFunction);

})();

//editSupportersProfileCtrl
(function(){

    'use strict';

    function editSupportersProfileCtrlFunction($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet, $ionicPopup,multipartForm,$ionicLoading,Upload,$state)
    {
        
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
 
////////////////////////////////////
    //    TOKEN RETRIEVAL
    var t1 = store.get('token');// get the encoded token
    var tp = jwtHelper.decodeToken(t1);// decode the encoded token
    var sup = tp;
    $scope.data = {};
        
        $scope.cancelEdit = function()
        {
            $state.go('profile')
        }
        
    $scope.UpdateData = function() { 
        
        $scope.supporterObject = 
            {
            "supporter": {
                "fname": $scope.info.message.sup_fname,
                "lname": $scope.info.message.sup_lname,
                "gender":$scope.info.message.sup_gender,
                "age": $scope.info.message.sup_age,
                "about": $scope.info.message.sup_about,
                "phone": $scope.info.message.sup_phone,
                "zip": $scope.info.message.sup_zip,
                "skills": $scope.info.message.skills,
                "interests": $scope.info.message.interests,
                "sup_privacy": $scope.info.message.sup_privacy,
                "city_name": $scope.info.message.city_name
            }
        };
        
         $ionicLoading.show({
                  template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                  duration: 300
                });
        
          $http({
        url: 'https://hoyportibppr.com/api/supporters/edit',
        method: 'POST',
        data: JSON.stringify($scope.supporterObject),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
            'TOKEN' : t1
        }
      }).success(function (data, status, headers, config) {
            
              $ionicPopup.alert({
                       title: 'Profile edit successful',
                       template: 'Your profile information was successfuly edited.'
              });     
              
              $state.go('profile');
             // $state.go($state.current, $stateParams, {reload: true, inherit: false});
              $scope.PostDataResponse = data;
            
          }).error(function (data, status, header, config) {
                $scope.ResponseDetails = data.status;
                $scope.errorMessage = data.message.fname;
                $scope.errorMessage1 = data.message.lname;
                $scope.errorMessage2 = data.message.phone;
                $scope.errorMessage3 = data.message.age;
                $scope.errorMessage4 = data.message.gender;
                $scope.errorMessage5 = data.message.zip;
                $scope.errorMessage6 = data.message;

              
              if($scope.ResponseDetails == "failure"){ 
        
                   var alertPopup = $ionicPopup.alert({
                       title: 'Warning',
                       template: $scope.errorMessage || $scope.errorMessage1 || $scope.errorMessage2 || $scope.errorMessage3
                       || $scope.errorMessage4 || $scope.errorMessage5 || $scope.errorMessage6 
                   });     

            }       
               
            });
        };
  
    /////////////////////////////////////////////////////////////////////
    //Here we get all the data from a specific user to display what
    //are the current values stored in the database
$http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456',
                  'TOKEN': store.get('token')}
    })
    .success(function (data) {
       $scope.info = data;
    $scope.info.message.sup_age = Number($scope.info.message.sup_age);
       console.log($scope.info);

        $scope.img={}
        $scope.img = data.message.sup_pic;
        console.log($scope.img);
        $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/supporters/displaypic/',
                data: "img=" + $scope.img,                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.info1 = data.message;
            
            if($scope.info == null){
                $state.go($state.current, $stateParams, {reload: true, inherit: false});
            }
            
                })
    })
    
         $scope.data = {
        'submit' : $scope.submit = 1,
        'userfile' : $scope.userfile
    }

           var uploadUrl = 'https://hoyportibppr.com/api/supporters/uploadpicture';
    
    $scope.$watch('data.userfile', function (img) {
        $scope.data.userfile = img;
        multipartForm.post(uploadUrl, $scope.data);

    });
    
    $scope.showSkill = false;
    $scope.skillFunct = function() {
        $scope.showSkill = !$scope.showSkill;
    };
    
     $scope.showInterests = false;
    $scope.interestsFunct = function() {
        $scope.showInterests = !$scope.showInterests;
    };
        
    }

    angular
        .module('app')
        .controller('editSupportersProfileCtrl', editSupportersProfileCtrlFunction);

     editSupportersProfileCtrlFunction.$inject = ['$scope','$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$ionicPopup','multipartForm','$ionicLoading','Upload','$state','$sce'];

})();

//EeventsCtrl
(function(){
    'use strict';

    function EeventsCtrlFunction($scope, $rootScope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state, $ionicPopup,moment, eventData, Events,$cordovaFileOpener2,$sce,$window)
{
    //Variables
    var t1 = store.get('token');
    var tp = jwtHelper.decodeToken(t1);
    var ent = tp;   
    
    $rootScope.entityAdmin = tp;
    
    
    
        $scope.event_report = function(eventPost_id, $event){

            $event.stopPropagation();

   $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event_report/'+eventPost_id,
         headers: {
                    'responseType': 'arraybuffer',
                   'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456',
                  'TOKEN': store.get('token')}
    })
    .success(function (response) {
       
//       console.log(response)
       
    var file = new Blob([response], {type: 'application/pdf'});
    console.log(file);
    var fileURL = URL.createObjectURL(file);
    console.log(fileURL);
    $window.open(fileURL);

       
     });   
        };
    
//       var confirmPopup = $ionicPopup.alert({
//         title: 'SUCCESS!',
//    });
//    
    
    
    

  $http({
    method: 'GET',
    skipAuthorization: true,//es necesario enviar el token
    url: 'https://hoyportibppr.com/api/entities/' + $rootScope.entityAdmin.role_id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/x-www-form-urlencoded',
      'X-API-KEY' : '123456'}
  })
    .success(function (data) {
      $scope.info = data.message;

    });

            $http({
                method: 'GET',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/' + $rootScope.entityAdmin.role_id,
                 headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
            })
            .success(function (data) {
                $scope.info = data.message;
                
         $scope.img={};
        $scope.img = data.message.ent_pic;
    console.log($scope.img);
       
         $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + $scope.img + "&type=" + "entity"),               
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.info1 = data;
             $rootScope.profilePicture = data;
                         if($scope.info == null){
                $state.go($state.current, $stateParams, {reload: true, inherit: false});
            }
              });
            });

    $scope.goToEventView = function(eventPost_id){
        
        $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event/'+eventPost_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
        $scope.event = data.message.event;
            
        eventData.individualEventPost = $scope.event;
        
        $state.go('eventFullView');
    });
        
};
    
    //Function definitions:
    $scope.doRefresh = function() {
        
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/events/'+ent.role_id ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message.events;
        console.log($scope.posts);
    })
    .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    
    };// end of function
    
    
    function newPostFunction()
    {
        $state.go('postEvent');
    }

    function alterPost(event, $index, $event)
    {
        $event.stopPropagation();
        
        $scope.data={};       
        
        $http({
            method: 'GET',
            url: 'https://hoyportibppr.com/api/entities/event/'+event.id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'
                     }
        }).success(function(data) {
            $scope.eventData = data.message.event; 
            eventData.individualEventPost = data.message.event;
            
            $scope.$watch('eventData', function(newValue, oldValue) { 
                
                eventData.individualEventPost = data.message.event;
                eventData.setEvent(data.message.event);
            
            });
        });

        var hideSheet = $ionicActionSheet.show(
            {

                buttons: [{ text: 'Edit' },],
                destructiveText: 'Delete',
                cancelText: 'Cancel',

                cancel: function() {
                    // add cancel code..
                },

                buttonClicked: function(index)
                {
                    if(index === 0)
                        {
                            $state.go('editEvent');
                        }
                    
                    else if(index === 1)
                        {
                            Events.add(event);
                            console.log(Events.get(event));
                        }
                },

                destructiveButtonClicked: function()
                {

     var confirmPopup = $ionicPopup.confirm({
         title: 'Event post deletion',
         template: "This post will be deleted and you won't be able to find it anymore. You can also edit this post, if you just want to change something."
     });
     
     confirmPopup.then(function(res) {
         if(res) {
             $http({
                 method: 'DELETE',
                 skipAuthorization: true,//es necesario enviar el token
                 url: 'https://hoyportibppr.com/api/entities/event/'+ event.id,
                 
                 headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/x-www-form-urlencoded',
                            'X-API-KEY' : '123456',
                            TOKEN: t1
                        }

                    }).success(function (data) {
                        $state.go($state.current, $stateParams, {reload: true, inherit: false});
                        $scope.delete = data;
                        var alertPopup = $ionicPopup.alert({
                       title: 'Event post deleted',
                       template: 'Your event post was successfuly deleted.'
                   });     
                    });
     } else {
       console.log('You are not sure');
     }
   });
                }
            });
    }

    //Function variables:
    $scope.newPost = newPostFunction;
    $scope.alterPost = alterPost;

    //Controller's code:
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/'+ent.role_id,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'
        }
    }).success(function (data) {
        $scope.info = data.message;
    });

    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/events/'+ent.role_id,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'
        }
    }).success(function (data) {
        $scope.posts = data.message.events;

    });

}

     EeventsCtrlFunction.$inject =
    ['$scope','$rootScope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$state','$ionicPopup','moment', 'eventData', 'Events','$cordovaFileOpener2','$sce','$window'];

    angular
        .module('app')
        .controller('EeventsCtrl', EeventsCtrlFunction);
})();

//emailSentCtrl
(function(){
    'use strict';

    function emailSentCtrlFunction($scope, $stateParams)
{
    //EmptyFunction.
}
    emailSentCtrlFunction.$inject = ['$scope', '$stateParams'];

    angular
        .module('app')
        .controller('emailSentCtrl', emailSentCtrlFunction);

})();

//entitiesCtrl
(function(){

    'use strict';

    function entitiesCtrlFunction($scope, $stateParams, entityProfiles, $state, $http) {

      $scope.cate = entityProfiles.entList;

      $scope.selectEnt = function(val) {

        $http({
          method: 'GET',
          skipAuthorization: true,//es necesario enviar el token
          url: 'https://hoyportibppr.com/api/entities/' + val,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        })
          .success(function (data) {
            $scope.info = data.message;
            entityProfiles.individualEntity = $scope.info;

            $state.go('entityProfiles');
          });
      };
    }// entitiesCtrlFunction function definition end.

    entitiesCtrlFunction.$inject = ['$scope', '$stateParams', 'entityProfiles', '$state','$http'];

    angular
        .module('app')
        .controller('entitiesCtrl', entitiesCtrlFunction);

})();

//entityPostCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('entityPostCtrl', entityPostCtrlFunction);

      entityPostCtrlFunction.$inject =
    ['$scope', '$stateParams', 'authFactory', '$state', 'jwtHelper', 'store','$rootScope', '$http', '$httpParamSerializerJQLike', 'moment', '$ionicPopup'];

     function entityPostCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment, $ionicPopup)
{
    //Variables:
    var t1 = store.get('token');
    var tp = jwtHelper.decodeToken(t1);
    var ent = tp;
    $scope.data = {};
    $scope.postData = postDataFunction;

    //Function declarations:
    function postDataFunction()
    {
        $http({
            url: 'https://hoyportibppr.com/api/entities/post',
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.data),
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456',
                'TOKEN' : t1
            }

        }).success(function (data, status, headers, config) {
            $scope.PostDataResponse = data;
            $ionicPopup.alert(
                    {
                        title: 'Activity post creted!',
                        template: 'Your post was successfuly created.'
                    });

        }).error(function (data, status, header, config) {
            $scope.ResponseDetails = data;
        });
    }
}
})();

//entityProfilesCtrl
(function(){

  'use strict';

angular
    .module('app')
    .controller('entityProfilesCtrl', entityProfilesCtrlFunction);

     function entityProfilesCtrlFunction($scope, $stateParams, CONFIG, jwtHelper, store,  $rootScope,
                                         $ionicScrollDelegate,$ionicSlideBoxDelegate,$http,$window,$state,$ionicActionSheet,
                                         $ionicPopup,$httpParamSerializerJQLike,entityProfiles, eventData, volunteeringData)
  {
      $scope.info = entityProfiles.individualEntity;
      $scope.scrollToTheTopButton;
      $scope.postsQuantity = 0;
      $scope.following;
      
                $scope.img={};
        $scope.img = $scope.info.ent_pic;
         $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + $scope.img + "&type=" + "entity"),               
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.entityPicture = data;
              });
      
      $scope.goToVoluntView = function(voluntPost_id){
          
        $http({
          method: 'GET',
          url: 'https://hoyportibppr.com/api/entities/volunteering/'+voluntPost_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        }).success(function (data) {
            $scope.posts = data.message;
            console.log("posts:" + $scope.posts);
            volunteeringData.individualVoluntPost = $scope.posts;
            $state.go('guestVolunteeringFullView');
          });
      };
      $scope.goToEventView = function(eventPost_id){
        
        $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event/'+eventPost_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
        $scope.event = data.message.event;
            
        eventData.individualEventPost = $scope.event;
        
        $state.go('guestEventFullView');
    });
        
    };
      
      if($rootScope.u === true)
          {
            $rootScope.supporter_data.followed_entities.forEach(function(element){

                if(element.ent_id === $scope.info.ent_id)
              {
                  $scope.following = true;
                  console.log($scope.following);
              }
            });
      
          }
      
        $scope.scrollTop = function() {
          $ionicScrollDelegate.scrollTop();
        };//scroll to top

        $http({
          method: 'GET',
          skipAuthorization: true,//es necesario enviar el token
          url: 'https://hoyportibppr.com/api/entities/newsfeed/'+$scope.info.ent_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        })
          .success(function (data) {
            $scope.posts = data.message;
            $scope.postsQuantity = $scope.posts.length;
            if($scope.posts.length > 1)
                {
                    $scope.scrollToTheTopButton = true;
                }
            else
                {
                    $scope.scrollToTheTopButton = false;
                }

            console.log($scope.posts.length);
          })
          .finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
          });

        $scope.doRefresh = function() {

          $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/newsfeed/'+ $scope.info.ent_id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/x-www-form-urlencoded',
              'X-API-KEY' : '123456'}
          })
            .success(function (data) {
              $scope.eposts = data.message.posts;
            })
            .finally(function() {
              // Stop the ion-refresher from spinning
              $scope.$broadcast('scroll.refreshComplete');
            });

          $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/' +$scope.info.ent_id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/x-www-form-urlencoded',
              'X-API-KEY' : '123456'}

          }).success(function (data) {
              $scope.info = data.message;

              console.log($rootScope.supporter_data);

            }).finally(function() {
              // Stop the ion-refresher from spinning
              $scope.$broadcast('scroll.refreshComplete');

            });
        };

    var myNewObject = store.get('token');
                    console.log(myNewObject);  

        $scope.follow = function(e_id){
            
            $rootScope.supporter_data.followed_entities.push({ent_id: e_id});
            console.log($rootScope.supporter_data.followed_entities);
            $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/supporters/follow_entity/'+e_id,
                 headers:
                {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'X-API-KEY' : '123456',
                    'TOKEN' : store.get('token')
                }
            }).success(function (data) {
                $scope.info1 = data.message;
                $scope.following = true;
                 var alertPopup = $ionicPopup.alert({
                      title: 'You are now following '+ entityProfiles.individualEntity.ent_name + '!'
                      });
            });

        };

          $scope.unfollow = function(ent_id){
              
            $http({
                method: 'DELETE',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/supporters/follow_entity/'+ent_id,
                 headers:
                {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'X-API-KEY' : '123456',
                    'TOKEN' : store.get('token')
                }
            }).success(function (data) {
                $scope.following = false;
                var alertPopup = $ionicPopup.alert({
                      title: 'You have unfollowed '+ entityProfiles.individualEntity.ent_name
                      });
                $scope.info1 = data.message;
                //$state.go($state.current, $stateParams, {reload: true, inherit: false});
            });
        };

          $scope.toggleItem= function(item) {

        if ($scope.isItemShown(item)) {
          $scope.shownItem = null;
        } else {
          $scope.shownItem = item;
        }

      };

      $scope.isItemShown = function(item) {
        return $scope.shownItem === item;
      };

  }

      entityProfilesCtrlFunction.$inject = ['$scope','$stateParams','CONFIG', 'jwtHelper', 'store','$rootScope',
      '$ionicScrollDelegate','$ionicSlideBoxDelegate','$http','$window','$state','$ionicActionSheet',
      '$ionicPopup','$httpParamSerializerJQLike','entityProfiles', 'eventData','volunteeringData'];
})();

//followedEntitiesCtrl
(function(){

  'use strict';

angular
    .module('app')
    .controller('followedEntitiesCtrl', followedEntitiesCtrl);

     function followedEntitiesCtrl($scope, $stateParams, CONFIG, jwtHelper, store,  $rootScope,$ionicScrollDelegate,$ionicSlideBoxDelegate,$http,$window,$state,$ionicActionSheet,
                                         $ionicPopup,$httpParamSerializerJQLike,entityProfiles)
  {
    $scope.info = entityProfiles.individualEntity;
    console.log($scope.info);

    $scope.scrollTop = function() {
      $ionicScrollDelegate.scrollTop();
    };//scroll to top
$http({
      method: 'GET',
      skipAuthorization: true,//es necesario enviar el token
      url: 'https://hoyportibppr.com/api/entities/newsfeed/'+$scope.info.ent_id,
      headers: {'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/x-www-form-urlencoded',
        'X-API-KEY' : '123456'}
    })
      .success(function (data) {
        $scope.posts = data.message;
        console.log($scope.posts);
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });

      $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/newsfeed/'+ $scope.info.ent_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'}
      })
        .success(function (data) {
          $scope.eposts = data.message.posts;
        })
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });

      $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/' +$scope.info.ent_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'}
      
      }).success(function (data) {
          $scope.info = data.message;
          console.log($scope.info);
             
         $scope.img={};
        $scope.img = data.message.ent_pic;
    console.log($scope.img);
       
         $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + $scope.img + "&type=" + "entity"),               
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.info1 = data;
             console.log($scope.info1);
                         if($scope.info == null){
                $state.go($state.current, $stateParams, {reload: true, inherit: false});
            }
              });
        });
      
    $scope.doRefresh = function() {

      $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/newsfeed/'+ $scope.info.ent_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'}
      })
        .success(function (data) {
          $scope.eposts = data.message.posts;
        })
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });

      $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/' +$scope.info.ent_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'}
      
      }).success(function (data) {
          $scope.info = data.message;
          console.log($scope.info);
             
         $scope.img={};
        $scope.img = data.message.ent_pic;
    console.log($scope.img);
       
         $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + $scope.img + "&type=" + "entity"),               
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.info1 = data;
             console.log($scope.info1);
                         if($scope.info == null){
                $state.go($state.current, $stateParams, {reload: true, inherit: false});
            }
              });
          
          console.log($rootScope.supporter_data);
          
        }).finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');

        });
    };
      
var myNewObject = store.get('token');
                console.log(myNewObject);  
      
          console.log($rootScope.supporter_data);
      
      $scope.unfollow = function(ent_id){
          
          $rootScope.supporter_data.followed_entities = $rootScope.supporter_data.followed_entities.filter(function(element){
             console.log(element);
              if(element.ent_id !== ent_id || Number(element.ent_id) !== ent_id)
                  {
                      return element;
                  }
          });
          
           console.log($rootScope.supporter_data);
          
        $http({
            method: 'DELETE',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/follow_entity/'+ent_id,
             headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
        }).success(function (data) {
            $state.go('home.myEntities');
            $scope.info1 = data.message;
            
             var alertPopup = $ionicPopup.alert({
                  title: 'You have unfollowed '+ entityProfiles.individualEntity.ent_name
                  });
            
        });
    };
      
  }

      followedEntitiesCtrl.$inject = ['$scope','$stateParams','CONFIG', 'jwtHelper', 'store','$rootScope',
      '$ionicScrollDelegate','$ionicSlideBoxDelegate','$http','$window','$state','$ionicActionSheet',
      '$ionicPopup','$httpParamSerializerJQLike','entityProfiles'];

})();

//entityProfileCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('entityProfileCtrl', entityProfileCtrlFunction);

    entityProfileCtrlFunction.$inject = ['$scope','$stateParams','CONFIG', 'jwtHelper', 'store','$rootScope','$ionicScrollDelegate','$ionicSlideBoxDelegate','$http','$window','$state','$ionicActionSheet','$ionicPopup','$httpParamSerializerJQLike', 'eventData', 'volunteeringData'];

    function entityProfileCtrlFunction ($scope, $stateParams, CONFIG, jwtHelper, store,  $rootScope, $ionicScrollDelegate,$ionicSlideBoxDelegate,$http,$window,$state,$ionicActionSheet,$ionicPopup,$httpParamSerializerJQLike, eventData, volunteeringData)
{
    $scope.goToVoluntView = function(voluntPost_id){
        $http({
          method: 'GET',
          url: 'https://hoyportibppr.com/api/entities/volunteering/'+voluntPost_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        })
          .success(function (data) {
            $scope.posts = data.message;

            volunteeringData.individualVoluntPost = $scope.posts;
            $state.go('volunteeringFullView');
          });
      };
    
    $scope.goToEventView = function(eventPost_id){
        
        $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event/'+eventPost_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
        $scope.event = data.message.event;
            
        eventData.individualEventPost = $scope.event;
        
        $state.go('eventFullView');
    });
        
};
    
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };//scroll to top

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton

  $scope.editProfile = function() {
    $state.go('editEntityProfile');
  };// edit profile button

  //obtenemos el token en localStorage
  var token = store.get('token');
  $scope.data = {};

  //decodificamos para obtener los datos del user
  var tokenPayload = jwtHelper.decodeToken(token);
  console.log(tokenPayload);
  //los mandamos a la vista como user
  $rootScope.entityAdmin = tokenPayload;
    
    $http({
      method: 'GET',
      skipAuthorization: true,//es necesario enviar el token
      url: 'https://hoyportibppr.com/api/entities/newsfeed/'+$rootScope.entityAdmin.role_id,
      headers: {'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/x-www-form-urlencoded',
        'X-API-KEY' : '123456'}
    })
      .success(function (data) {
        $scope.posts = data.message;
        console.log($scope.posts);
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });

    $scope.doRefresh = function() {

      $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/newsfeed/'+ $rootScope.entityAdmin.role_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'}
      })
        .success(function (data) {
          $scope.eposts = data.message.posts;
          console.log($scope.eposts)
        })
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });

      $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/' +$scope.info.ent_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'}
      
      }).success(function (data) {
          $scope.info = data.message;
          console.log($scope.info);
          
          console.log($rootScope.supporter_data);
          
        }).finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');

        });
    };

            $http({
                method: 'GET',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/' + $rootScope.entityAdmin.role_id,
                 headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
            })
            .success(function (data) {
                $scope.info = data.message;
                   console.log($scope.info);

         $scope.img={};
        $scope.img = data.message.ent_pic;
    console.log($scope.img);
       
         $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + $scope.img + "&type=" + "entity"),               
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.info1 = data;
             $rootScope.profilePicture = data;
                         if($scope.info == null){
                $state.go($state.current, $stateParams, {reload: true, inherit: false});
            }
              });
    
});
    
      $scope.toggleItem= function(item) {
          
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
          
  };
  $scope.isItemShown = function(item) {
    return $scope.shownItem === item;
  };
    
    }
})();

//entityRegistrationCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('entityRegistrationCtrl', entityRegistrationCtrlFunction);

     entityRegistrationCtrlFunction.$inject = ['$scope', '$http', '$stateParams','$httpParamSerializerJQLike','$state','$ionicPopup'];

     function entityRegistrationCtrlFunction($scope, $http, $stateParams, $httpParamSerializerJQLike, $state, $ionicPopup)
{
    $scope.cancelEntityRegistrationButton = function()
        {
            $state.go('roleDecision')
        }

    $scope.entityRegistrationObject =
        {
        username: undefined,
        ent_name: undefined,
        email: undefined,
        emailconf: undefined,
        category: undefined,
        founded_on: "",
        irs: undefined,
        password: undefined,
        passconf: undefined,
        phone: undefined,
        fax: undefined,
        address1: undefined,
        address2: undefined,
        city: undefined,
        country: undefined,
        zip: undefined
    };

    $scope.entityUsernameTip = tip1Function;

    function tip1Function() {
      var alertPopup = $ionicPopup.alert({
       title: 'Username rules',
       template: 'The username field may only contain 3–20 characters; A–Z, a–z, 0–9, dash, and underscore only'
        });
      }

    $scope.entityEmailtip = tip2Function;

    function tip2Function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Email rules',
       template: 'The email field may only contain alpha-numeric characters, underscores, dashes and mandatory @'
        });
      }

    $scope.entityPhonetip = tip3Function;

    function tip3Function() {

       var alertPopup = $ionicPopup.alert({
       title: 'Phone rules',
       template: 'The phone field may only contain digits numbers'
        });
      }

    $scope.entityFaxtip = tip4Function;

    function tip4Function() {

       var alertPopup = $ionicPopup.alert({
       title: 'Fax rules',
       template: 'The fax field may only contain digits numbers'
        });
      }

    $scope.entityPasswordTip = tip5Function;

    function tip5Function() {

       var alertPopup = $ionicPopup.alert({
       title: 'Password rules',
       template: '6–40 characters; at least one uppercase letter and digit'
        });
      }

     $scope.entityNameTip = tip6Function;

    function tip6Function() {

       var alertPopup = $ionicPopup.alert({
       title: 'Entity name rules',
       template: 'FALTA!'
        });
      }

    $scope.entityFoundedOnTip = tip7Function;

    function tip7Function() {

       var alertPopup = $ionicPopup.alert({
       title: 'Founded on date',
       template: 'FALTA!'
        });
      }

    $scope.entityIrsTip = tip8Function;

    function tip8Function() {

       var alertPopup = $ionicPopup.alert({
       title: 'IRS number',
       template: 'FALTA!'
        });
      }

    $scope.entityStreetTip = tip9Function;

    function tip9Function() {

       var alertPopup = $ionicPopup.alert({
       title: 'Street line',
       template: 'FALTA!'
        });
      }

    $scope.entityStateTip = tip10Function;

    function tip10Function() {

       var alertPopup = $ionicPopup.alert({
       title: 'State',
       template: 'FALTA!'
        });
      }

    $scope.entityZipcodeTip = tip11Function;

    function tip11Function() {

       var alertPopup = $ionicPopup.alert({
       title: 'Zip code',
       template: 'FALTA!'
        });
      }

    $scope.submitForm2 = submitForm2Function;

    function submitForm2Function() {

        $http({
            url: 'https://hoyportibppr.com/api/entities/register',
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.entityRegistrationObject),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456'
            }

        }).success(function (data, status, headers, config) {
            $scope.PostDataResponse = data;
            $state.go('RegistrationSuccessful');
              //Go to the state of registration confirmation page of information and not login

        }).error(function (data, status, header, config) {

            $scope.messages = data.message;
            $scope.errorMessages = [];

              for(var m in data.message)
                  {
                      $scope.errorMessages.push(data.message[m]);
                  }

            var alertPopup = $ionicPopup.alert({
                  title: 'Error Description',
                  template: $scope.errorMessages.toString()
              });

          });

    $scope.showMee = false;
    $scope.myFunce1 = function() {
    $scope.showMee = !$scope.showMee;
    };
          }
}

})();

//eventPageCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('eventPageCtrl', eventPageCtrlFunction);

    eventPageCtrlFunction.$inject = ['$scope', '$stateParams'];

    function eventPageCtrlFunction($scope, $stateParams)
    {
        //Empty controller
    }

})();

//EvolunteeringCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('EvolunteeringCtrl', EvolunteeringCtrlFunction);

    EvolunteeringCtrlFunction.$inject =
['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$state', '$ionicPopup','moment', 'volunteeringData'];

    function EvolunteeringCtrlFunction($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state, $ionicPopup,moment, volunteeringData)
    {
           $scope.alterPost = function(val,  $event) {
               
               console.log(val);
          $event.stopPropagation();
         
    var hideSheet = $ionicActionSheet.show({
        
     buttons: [
       { text: 'Edit' }
     ],
        
     destructiveText: 'Delete',
     cancelText: 'Cancel',
        
     cancel: function() {
          // add cancel code..
        },
        
     buttonClicked: function(index) {
         
 $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/volunteering/'+val,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
         console.log($scope.posts);
         volunteeringData.setVoluntPost($scope.posts);
     
            $state.go('editVolunteering');
        })
             
     },
        
    destructiveButtonClicked: function() {
            
        
           
     var confirmPopup = $ionicPopup.confirm({
         title: 'Event post deletion',
         template: "This post will be deleted and you won't be able to find it anymore. You can also edit this post, if you just want to change something."
     });
     
                
     confirmPopup.then(function(res) {
         if(res) {
      $http({
        method: 'DELETE',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/delete_volunteering/'+ val,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456',
                  TOKEN: t1}
    }).success(function (data) {
            $ionicPopup.alert({
     title: 'Volunteering post deleted',
     template: 'The volunteering post was successfuly deleted.'
   });
        $state.go($state.current, $stateParams, {reload: true, inherit: false});
            
            });
             
     } else {
       console.log('You are not sure');
     }
   });

    }
        
   });
  
  };
      $scope.newPost = function() {
        $state.go('postVolunt');
      };

      var t1 = store.get('token');
      var tp = jwtHelper.decodeToken(t1);
      console.log(tp);
      var ent = tp;

      $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/'+ent.role_id ,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'}
      })
        .success(function (data) {
          $scope.info = data.message;
        });
        
          $scope.doRefresh = function() {
        
             $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/volunteerings/'+ent.role_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
        $scope.volunt = data.message;
        console.log($scope.posts)
    }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
            
        };

      $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/volunteerings/'+ent.role_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'}
      })
        .success(function (data) {
          $scope.posts = data.message;
          console.log($scope.posts);
          $scope.volunt = data.message;
        });

      $scope.goToVoluntView = function(voluntPost_id){
        $http({
          method: 'GET',
          url: 'https://hoyportibppr.com/api/entities/volunteering/'+voluntPost_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        })
          .success(function (data) {
            $scope.posts = data.message;

            volunteeringData.individualVoluntPost = $scope.posts;
            $state.go('volunteeringFullView');
          });
      };
    }
})();

//forgotPasswordCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('forgotPasswordCtrl', forgotPasswordCtrlFunction);

    function forgotPasswordCtrlFunction($scope, $stateParams, authFactory,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,$state,$ionicPopup)
{
    //Variable declarations:
    $scope.cancelForgotPasswordButton = function()
    {
        $state.go('login');
    }
    $scope.data = {};
    $scope.showHelpForgotPassword = function ()
    {
        var alertPopup = $ionicPopup.alert(
                    {
                        title: 'Password recovery help',
                        template:'Please enter a valid email and an email with the instructions to recover your password will be available.'
                    });
    }
    
    //function definitions:
    function submitForgotPasswordFormFunction()
    {
        $http({
            url: 'https://hoyportibppr.com/api/auth/forgotpass',
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.data),//
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456'
            }

        }).success(function (data, status, headers, config) {

            $scope.PostDataResponse = data.status;

            if($scope.PostDataResponse == "success")
            {
                var alertPopup = $ionicPopup.alert(
                    {
                        title: 'Email sent!'
                    });
            }
        }).error(function (data, status, header, config) {

            $scope.ResponseDetails = data.status;
            $scope.errorMessage = data.message;

            if($scope.ResponseDetails == "error")
            {
                var alertPopup = $ionicPopup.alert(
                    {
                        title: 'Error!',
                        template: $scope.errorMessage
                    }
                );
            }
        });
    }

    //function variables:
    $scope.submit = submitForgotPasswordFormFunction;

}

    forgotPasswordCtrlFunction.$inject =
    ['$scope', '$stateParams','authFactory','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','$state','$ionicPopup'];

})();

//loginCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('loginCtrl', loginCtrlFunction);

    loginCtrlFunction.$inject = ['$scope', '$stateParams', '$ionicModal', '$ionicPopover', '$timeout','$state','$ionicPopup','$rootScope', 'CONFIG','authFactory', 'jwtHelper', 'store','$ionicLoading', '$window'];

    function loginCtrlFunction($scope, $stateParams, $ionicModal, $ionicPopover, $timeout, $state, $ionicPopup, $rootScope, CONFIG, authFactory, jwtHelper, store,$ionicLoading, $window)
{
    
        if(!window.location.hash) {
       window.location = window.location + '#loaded';
       window.location.reload();
     }
    
    $rootScope.isAuthenticated = false;
    $rootScope.e = false;
    
    $rootScope.l = true;
    $rootScope.s = true;
    $rootScope.u = false;
    $scope.user = { username:"",
                    password:""
                  };
        $scope.buttonEnabled = true;
$rootScope.disableFollowButton = true;

    function loginFunction(user)
    {
        $scope.buttonEnabled = false;

         $timeout(function() {
            $scope.buttonEnabled = true;
         }, 1000);
        
        authFactory.login(user).then(function(res) {

            $ionicLoading.show(
                {
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 100
                });

            var tok = res.data.response.token;

            var tokenPayload = jwtHelper.decodeToken(tok);

            if(tokenPayload.role === 'entity')
            {
                store.set('token', res.data.response.token);
                $rootScope.isAuthenticated = true;
                $state.go('dashboard.Eevents');
                $rootScope.e = !$rootScope.e;
                $rootScope.l = !$rootScope.l;
                $rootScope.s = !$rootScope.s;
                $rootScope.disableFollowButton = !$rootScope.disableFollowButton;  
            }
            
            else if (tokenPayload.role === 'supporter')
            {    
                store.set('token', res.data.response.token);
                $rootScope.isAuthenticated = true;
                $state.go('home.discover');
                $rootScope.u = !$rootScope.u;
                $rootScope.l = !$rootScope.l;
                $rootScope.s = !$rootScope.s;
            }
            
            else
            {
                $scope.showAlert('Invalid username or password.');
            }
            
        });
    }
    $scope.login = loginFunction;
}

})();

//postEventCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('postEventCtrl', postEventCtrlFunction);

    postEventCtrlFunction.$inject = ['$scope', '$stateParams', 'authFactory', '$state', 'jwtHelper', 'store', '$rootScope', '$http', '$httpParamSerializerJQLike', 'moment', '$cordovaDatePicker', '$ionicPopup', 'multipartForm'];

    function postEventCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,$cordovaDatePicker,$ionicPopup, multipartForm)
{
    //Variables:
    var t1 = store.get('token');
    var tp = jwtHelper.decodeToken(t1);
    var ent = tp;
    $scope.cancelEdit = function()
      {
          $state.go('dashboard.Eevents');
      }
    
    $scope.data = {};
    $scope.postEvent = postEventFunction;

          $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton

    //Function declarations:
    function postEventFunction()
    {
        $http({
            url: 'https://hoyportibppr.com/api/entities/newevent',
            method: 'POST',
            data: JSON.stringify({event: $scope.data}),
            headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : t1
            }

        }).success(function (data, status, headers, config) {
            $scope.PostDataResponse = data;
            console.log($scope.data);
            console.log($scope.PostDataResponse.message.event_id);
            
            $scope.picData = {
                'submit' : $scope.submit = 1,
                'userfile' : $scope.userfile
            };
        
            var uploadUrl = 'https://hoyportibppr.com/api/entities/event_uploadpicture/'+$scope.PostDataResponse.message.event_id;
    
            $scope.$watch('data.userfile', function (img) {
                $scope.picData.userfile = img;
                multipartForm.post(uploadUrl, $scope.picData);
            }); 
            
              $ionicPopup.alert(
                    {
                        title: 'Event post creation',
                        template: 'Your event post was successfuly created!'
                    });
            
            $state.go('dashboard.Eevents');

        }).error(function (data, status, header, config) {
            
            $scope.titleError = data.message.title;
            $scope.descriptionError = data.message.description;
            $scope.start_timeError = data.message.start_time;
            $scope.end_timeError = data.message.end_time;
            $scope.addressError = data.message.address;
            $scope.cityError = data.message.city;
            $scope.end_zipError = data.message.zip;
            $scope.supervisor_nameError = data.message.supervisor_name;
            $scope.supervisor_phoneError = data.message.supervisor_phone;
            $scope.supervisor_emailError = data.message.supervisor_email;
        
                 $ionicPopup.alert(
                    {
                        title: 'Error Description',
                        template: $scope.titleError || $scope.descriptionError || $scope.start_timeError || $scope.end_timeError || $scope.addressError || $scope.cityError || 
                $scope.end_zipError || $scope.supervisor_nameError || $scope.supervisor_phoneError || $scope.supervisor_emailError ||  'There was an error creating the event. Please check the required fields and try again.'
                    });
        });
    }
}
})();

//postVoluntCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('postVoluntCtrl', postVoluntCtrlFunction);

    postVoluntCtrlFunction.$inject = ['$scope', '$stateParams','authFactory', '$state', 'jwtHelper', 'store', '$rootScope', '$http', '$ionicPopup', 'multipartForm'];

    function postVoluntCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http,$ionicPopup, multipartForm)
    {
              $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
    
        //Variables:
        var t1 = store.get('token');
        var tp = jwtHelper.decodeToken(t1);
        var ent = tp;
        $scope.cancelEdit = function()
      {
          $state.go('dashboard.Evolunteering');
      }
        $scope.showVolunt = false;
        $scope.showSearch = false;
        $scope.showVolunteeringSkills = false;
        $scope.data = {};
    
        $scope.volunteeringShowSkills = function ()
        {
            $scope.showVolunteeringSkills = !$scope.showVolunteeringSkills;
        };
        
        $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/skills' ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {

            $scope.info = [];

            data.message.skills.forEach(
                function(element){
                    var temp = {text: element.skill_name,
                                checked: false
                               };
                    $scope.info.push(temp);
            });

            console.log($scope.info);
        });

        $scope.volunteeringPostObject =
        {
        "volunteering_job":
        {
            "general_info":
            {
                "title": undefined,
                "description": undefined,
                "app_procedure": undefined,
                "work_hours": undefined,
                "num_of_ppl": undefined,
                "start_time": undefined,
                "end_time": undefined,
                "skills": undefined,
                "web": undefined
            },

            "address_information":
            {
                "address1": undefined,
                "address2": undefined,
                "city": undefined,
                "zip": undefined,
                "location_description": undefined
            },

            "contactinfo_supervisor":
            {
                "supervisor_name": undefined,
                "supervisor_email": undefined,
                "supervisor_phone": undefined
            },

            "geolocation_coordinates":
            {
                "longitude": undefined,
                "latitude": undefined
            }
        }};

    //Function declarations:
    function voluntSectionFunction()
    {
        $scope.showVolunt = !$scope.showVolunt;
    }

    function searchVoluntFunction()
    {
        $scope.showSearch = !$scope.showSeacrh;
    }

    function tip1Function()
    {
        return $ionicPopup.alert(
            {
                title: 'Tip',
                template: 'Give your event an exciting, descriptive name to attract more volunteers!'
            });
    }

    function tip2Function()
    {
        var alertPopup = $ionicPopup.alert(
            {
                title: 'Tip',
                template: ' Describe the opportunity in more detail here — what will the volunteers be expected to do? What will the experience be like?'
            });
    }

    function tip3Function()
    {
        var alertPopup = $ionicPopup.alert(
            {
                title: 'Tip',
                template: 'Is there anything volunteers need to do before signing up for the opportunity? ex. Background check? Application form?'
            });
    }

    function tip4Function()
    {
        var alertPopup = $ionicPopup.alert(
            {
                title: 'Tip',
                template: 'Adding an image ensures that your opportunity stands out and helps to give some context as to what the opportunity is about!'
            });
    }

        $scope.postVolunt = function() {

            $scope.volunteeringPostObject.volunteering_job.general_info.skills = $scope.info;

        $http({
            url: 'https://hoyportibppr.com/api/entities/create_volunteering',
            method: 'POST',
            data: JSON.stringify($scope.volunteeringPostObject),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : t1
            }

      }).success(function (data, status, headers, config) {
            $scope.PostDataResponse = data.message.vol_id;
            console.log($scope.PostDataResponse);

         $scope.picData = {
                'submit' : $scope.submit = 1,
                'userfile' : $scope.userfile
            }
        
            var uploadUrl = 'https://hoyportibppr.com/api/entities/volunteering_job_uploadpicture/'+$scope.PostDataResponse;
            
          $scope.$watch('data.userfile', function (img) {
                $scope.picData.userfile = img;
                multipartForm.post(uploadUrl, $scope.picData);
            }); 
        
        var alertPopup = $ionicPopup.alert({
           title: 'Volunteering posting successful',
           template: 'Your post was successfully posted!'
        });

        $state.go('dashboard.Evolunteering');
            })
            .error(function (data, status, header, config) {
            
            
                       $scope.titleError = data.message.title;
            $scope.descriptionError = data.message.description;
            $scope.start_timeError = data.message.start_time;
            $scope.end_timeError = data.message.end_time;
            $scope.addressError = data.message.address;
            $scope.cityError = data.message.city;
            $scope.end_zipError = data.message.zip;
            $scope.supervisor_nameError = data.message.supervisor_name;
            $scope.supervisor_phoneError = data.message.supervisor_phone;
            $scope.supervisor_emailError = data.message.supervisor_email;
        
                 $ionicPopup.alert(
                    {
                        title: 'Error Description',
                        template: $scope.titleError || $scope.descriptionError || $scope.start_timeError || $scope.end_timeError || $scope.addressError || $scope.cityError || 
                $scope.end_zipError || $scope.supervisor_nameError || $scope.supervisor_phoneError || $scope.supervisor_emailError ||  'There was an error creating the event. Please check the required fields and try again.'
                    });
        });
        
        };

    function submitVolunteeringPostAJAXFunction()
    {

    }

    //Function variables:
    $scope.voluntSection = voluntSectionFunction;
    $scope.searchVolunt = searchVoluntFunction;
    $scope.tip1 = tip1Function;
    $scope.tip2 = tip2Function;
    $scope.tip3 = tip3Function;
    $scope.tip4 = tip4Function;
    $scope.submitVolunteeringPostAJAX= submitVolunteeringPostAJAXFunction;
}

})();

//profileCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('profileCtrl',  profileCtrlFunction);

    profileCtrlFunction.$inject = ['$scope','$stateParams','CONFIG','jwtHelper','store','$rootScope','$http','$window','$state','$httpParamSerializerJQLike'];

    function profileCtrlFunction($scope, $stateParams, CONFIG, jwtHelper, store,  $rootScope,$http,$window,$state,$httpParamSerializerJQLike) {
    
    var token = store.get('token');
    //decodificamos para obtener los datos del user
    var tokenPayload = jwtHelper.decodeToken(token);
    //los mandamos a la vista como user
    $rootScope.supporter = tokenPayload;

    //Function definitions:
    
        function beforeEnterFunction(event, viewData)
    {
        viewData.enableBack = false;
    }
    
        function callFunction()
    {
         $window.open('tel:' + $scope.info.sup_phone, '_system');
    }
        
     function doRefreshFunction()
    {
            $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}

    }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
        console.log($rootScope.supporter_data);
    }).finally(function() {
       // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    }
        
    function editProfileGoFunction()
    {
        $state.go('editSupportersProfile');
    }
        
    function mailFunction()
    {
        $window.open('mailto:' + $scope.info.email, '_system');
    }

    //Function variables:
    $scope.call = callFunction;
    $scope.doRefresh = doRefreshFunction;
    $scope.editProfile = editProfileGoFunction;
    $scope.mail = mailFunction;

    //profileCtrlFunction controller code:
    //------------------------------------
    $scope.$on('$ionicView.beforeEnter', beforeEnterFunction);

    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}

    }).success(function (data) {

        $scope.info = data.message;
        
        $scope.img={};
        $scope.img = data.message.sup_pic;

        $http({
            method: 'POST',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/displaypic/',
            data: "img=" + $scope.img,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456'
            }

        }).success(function (data) {
            $rootScope.info1 = data.message;
        });
    });
}// profileCtrlFunction function end.

})();

//profileCtrlFunction:
(function(){

    'use strict';

    angular
        .module('app')
        .controller('profileCtrl', profileCtrlFunction);

    profileCtrlFunction.$inject =  ['$scope','$stateParams','CONFIG', 'jwtHelper', 'store','$rootScope','$http','$window','$state','$httpParamSerializerJQLike'];

    function profileCtrlFunction($scope, $stateParams, CONFIG, jwtHelper, store,  $rootScope,$http,$window,$state,$httpParamSerializerJQLike) {
    //Local function variables:
    //-------------------------
    //obtenemos el token en localStorage
    var token = store.get('token');
    //decodificamos para obtener los datos del user
    var tokenPayload = jwtHelper.decodeToken(token);
    //los mandamos a la vista como user
    $rootScope.supporter = tokenPayload;
        $scope.showInterests = false;
        $scope.showSkills = false;
        
        $scope.showInterestsFunction = function()
        {
            $scope.showInterests = !$scope.showInterests;  
        };
        
        $scope.showSkillsFunction = function()
        {
            $scope.showSkills = !$scope.showSkills;
        };
        
    //Function definitions:
    function beforeEnterFunction(event, viewData)
    {
        viewData.enableBack = false;
    }
    function callFunction()
    {
         $window.open('tel:' + $scope.info.sup_phone, '_system');
    }
     function doRefreshFunction()
    {
        $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456',
                 'TOKEN': store.get('token')
            }

        }).success(function (data) {
            $scope.info = data.message;

        }).finally(function() {
       // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    }
    function editProfileGoFunction()
    {
        $state.go('editSupportersProfile');
    }
    function mailFunction()
    {
        $window.open('mailto:' + $scope.info.email, '_system');
    }

    //Function variables:
    $scope.call = callFunction;
    $scope.doRefresh = doRefreshFunction;
    $scope.editProfile = editProfileGoFunction;
    $scope.mail = mailFunction;

    //profileCtrlFunction controller code:
    //------------------------------------
    $scope.$on('$ionicView.beforeEnter', beforeEnterFunction);

    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}

    }).success(function (data) {

        $scope.info = data.message;
        $rootScope.supporter_data = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
        console.log($rootScope.supporter_data);
        $scope.img={};
        $scope.img = data.message.sup_pic;

        $http({
            method: 'POST',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/displaypic/',
            data: "img=" + $scope.img,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456'
            }

        }).success(function (data) {
            $rootScope.info1 = data.message;
        });
    });
}// profileCtrlFunction function end.

})();

//roleDecisionCtrl
(function(){
    'use strict';

    angular
        .module('app')
        .controller('roleDecisionCtrl', roleDecisionCtrlFunction);

    roleDecisionCtrlFunction.$inject = ['$scope', '$stateParams','$http', '$rootScope'];

    function roleDecisionCtrlFunction($scope, $stateParams, $http, $rootScope)
    {
       //Empty function controllers. 
    }

})();

//searchSupporters
(function(){

    'use strict';

    angular
        .module('app')
        .controller('searchSupporters', searchSupportersFunction);

    searchSupportersFunction.$inject = ['$scope', '$stateParams', 'authFactory', '$state', 'jwtHelper', 'store', '$rootScope', '$http'];

    function searchSupportersFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http)
    {
    $scope.showVolunt = false;
    $scope.voluntSection = voluntSectionFunction;

    function voluntSectionFunction()
    {
        $scope.showVolunt = !$scope.showVolunt;
    }
    
    }

})();

//settingsCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('settingsCtrl', settingsCtrlFunction);

    settingsCtrlFunction.$inject =
    ['$scope', '$stateParams', 'authFactory', '$state', 'jwtHelper', 'store', '$rootScope', '$http', '$ionicActionSheet', '$window'];

    function settingsCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $ionicActionSheet,$window)
    {
        $scope.editProfile = function ()
        {
        if($rootScope.e === true && $rootScope.u === false)
        {
                $state.go('editEntityProfile');
        }
            
        else if($rootScope.u === true && $rootScope.e === false)
            {
                $state.go('editSupportersProfile');
            }
        }
    }

})();

//supporter Registration controller:
(function(){

    'use strict';

    angular
        .module('app.controllers', ['ngFileUpload',])
        .controller('supporterRegistrationCtrl',  supporterRegistrationCtrlFunction);

    supporterRegistrationCtrlFunction.$inject = ['$scope', '$http', '$stateParams', '$httpParamSerializerJQLike', '$state', '$ionicModal', '$ionicPopover', '$ionicPopup', '$timeout'];

    //Error on the http request. Line 74? JSON PARSE function...
    function supporterRegistrationCtrlFunction($scope, $http, $stateParams, $httpParamSerializerJQLike,$state, $ionicModal, $ionicPopover, $ionicPopup, $timeout)
    {
        $scope.cancelSupporterRegistrationButton = function()
        {
            $state.go('roleDecision')
        }
        
         $scope.data =
             {
         };

        function tip1Function()
        {
            var alertPopup = $ionicPopup.alert(
                  {
                      title: 'Username rules',
                      template: 'The username field may only contain 3–20 characters; A–Z, a–z, 0–9, dash, and underscore only'
                  });
        }

        function tip4Function()
        {
            var alertPopup = $ionicPopup.alert(
                {
                    title: 'Email rules',
                    template: 'The email field may only contain alpha-numeric characters, underscores, dashes and mandatory @'
                });
        }

        function tip7Function() {

            var alertPopup = $ionicPopup.alert(
                   {
                       title: 'Password rules',
                       template: '6–40 characters; at least one uppercase letter and digit'
                   });
        }

        function submitForm1Function()
        {
            console.log($scope.data);

            $http({
                url: 'https://hoyportibppr.com/api/supporters/register',
                method: 'POST',
                data: $httpParamSerializerJQLike($scope.data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-API-KEY' : '123456'
                }
            }).success(function () {

                $state.go('RegistrationSuccessful');//home/newsfeed

            }).error(function (data) {
                console.log(data);

                console.log('ERROR');
                $scope.errorMessage = data.message.username;
                $scope.errorMessage1 = data.message.fname;
                $scope.errorMessage2 = data.message.lname;
                $scope.errorMessage3 = data.message.email;
                $scope.errorMessage4 = data.message.gender;
                $scope.errorMessage5 = data.message.password;
                $scope.errorMessage6 = data.message.passconf;
                $scope.errorMessage7 = data.message.emailconf;


                if($scope.ResponseDetails == "failure")
                {
                    var alertPopup = $ionicPopup.alert(
                        {
                            title: 'Error Description',
                            template: $scope.errorMessage || $scope.errorMessage1 || $scope.errorMessage2 || $scope.errorMessage3 || $scope.errorMessage4 || $scope.errorMessage5 || $scope.errorMessage6 || $scope.errorMessage7
                        }
                    );
                }

                $state.go('supporterRegistration');
            });
        }

        $scope.supporterUsernameTip = tip1Function;
        $scope.supporterEmailTip = tip4Function;
        $scope.supporterPasswordTip = tip7Function;
        $scope.submitForm1 = submitForm1Function;

    } //supporterRegistrationCtrlFunction end.

})();

//voluntPageCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('voluntPageCtrl', voluntPageCtrlFunction);

    voluntPageCtrlFunction.$inject = ['$scope', '$stateParams'];

    function voluntPageCtrlFunction ($scope, $stateParams)
    {
        //Empty controller function...
    }

})();

//introCtrl
(function(){

    'use strict';

    angular
        .module('app')
        .controller('introCtrl', introCtrlFunction);

function introCtrlFunction($scope, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, $rootScope)
    {
        $scope.data = {};
        $scope.data.bgColors = [];
        $scope.data.currentPage = 0;

        for (var i = 0; i < 10; i++)
        {
            $scope.data.bgColors.push("bgColor_" + i);
        }

        var setupSlider = function() {
            //some options to pass to our slider
            $scope.data.sliderOptions = {
                initialSlide: 0,
                direction: 'horizontal', //or vertical
                speed: 300 //0.3s transition
            };

            //create delegate reference to link with slider
            $scope.data.sliderDelegate = null;

            //watch our sliderDelegate reference, and use it when it becomes available
            $scope.$watch('data.sliderDelegate', function(newVal, oldVal) {

                if (newVal !== null) {
                    $scope.data.sliderDelegate.on('slideChangeEnd', function() {

                        $scope.data.currentPage = $scope.data.sliderDelegate.activeIndex;
                        //use $scope.$apply() to refresh any content external to the slider
                        $scope.$apply();
                    });
                }
            });
        };

        setupSlider();


          $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
  $scope.$on('$ionicView.leave', function(){
      $ionicSideMenuDelegate.canDragContent(true);
    });

    }

    introCtrlFunction.$inject =
      ['$scope', '$ionicSlideBoxDelegate', '$ionicSideMenuDelegate', '$rootScope'];

})();

//eventFullViewCtrl
(function(){

  'use strict';

  angular.module('app').controller('eventFullViewCtrl', eventFullViewCtrlFunction);

  function eventFullViewCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment, eventData, $timeout, Events)
  {   
      
       $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
      
      var img =  eventData.individualEventPost.photo;
      var type="event";
      $scope.post = eventData.individualEventPost;
      console.log(eventData.individualEventPost.start_time);
            console.log(moment(eventData.individualEventPost.start_time))

      
      console.log($scope.post);

               $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + eventData.individualEventPost.photo + "&type=" + 'event'),                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.event_photo = data;
//                   console.log("data: " + data);
              }).error(function(data) {
                   $scope.photoExists = false;
               });
      
      $scope.addToCalendar = function (event)
      {
          Events.add($scope.post);
      };
      
      $scope.goToEdit = function()
      {
          $state.go('editEvent');
      };
  
  }

  eventFullViewCtrlFunction.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','eventData', '$timeout', 'Events'];

})();

//volunteeringFullViewCtrl
(function(){

  'use strict';
  angular
    .module('app')
    .controller('volunteeringFullViewCtrl', volunteeringFullViewCtrl);

  volunteeringFullViewCtrl.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','volunteeringData', 'Events'];

  function volunteeringFullViewCtrl($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,volunteeringData, Events)
{
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
    
               $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + volunteeringData.individualVoluntPost.photo + "&type=" + 'post'),                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.volunteering_photo = data;
//                   console.log("data: " + data);
              }).error(function(data)
                       {
            $scope.photoExists = false;
                   
        });
    
     $scope.goToEdit = function()
      {
         volunteeringData.setVoluntPost($scope.post);
         $state.go('editVolunteering');
      };
      
  $scope.post = volunteeringData.individualVoluntPost;
          
      $scope.addToCalendar = function (volunteering)
      {
          Events.add($scope.post);
      };
    
}

})();

//publicAboutCtrl
(function(){
  'use strict';

  function publicAboutCtrlFunction($scope, $stateParams, CONFIG, jwtHelper, store,  $rootScope, $ionicScrollDelegate,$ionicSlideBoxDelegate,$http,$window,$state,$cordovaGeolocation,entityProfiles)
  {
      $scope.info = entityProfiles.individualEntity;
                $scope.img={};
        $scope.img = $scope.info.ent_pic;
         $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + $scope.img + "&type=" + "entity"),               
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.entityPicture = data;
              });
      var options = {timeout: 10000, enableHighAccuracy: true};

      $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        google.maps.event.addListenerOnce($scope.map, 'idle', function(){

          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng
          });

          var infoWindow = new google.maps.InfoWindow({
            content: "Here I am!"
          });

          google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($scope.map, marker);
          });
            
        });

      }, function(error){
        console.log("Could not get location");
      });

      $scope.call = function () {
        $window.open('tel:' + $scope.info.sup_phone, '_system');
      };

      $scope.mail = function () {
        $window.open('mailto:' + $scope.info.email, '_system');
      };

      $ionicSlideBoxDelegate.update();
      $scope.onUserDetailContentScroll = onUserDetailContentScroll;


      function onUserDetailContentScroll(){
        var scrollDelegate = $ionicScrollDelegate.$getByHandle('userDetailContent');
        var scrollView = scrollDelegate.getScrollView();
        $scope.$broadcast('userDetailContent.scroll', scrollView);
      }
      $scope.toggleItem= function(item) {
        if ($scope.isItemShown(item)) {
          $scope.shownItem = null;
        } else {
          $scope.shownItem = item;
        }
      };
      $scope.isItemShown = function(item) {
        return $scope.shownItem === item;
      };
  }

  angular.module('app').controller('publicAboutCtrl', publicAboutCtrlFunction);

  publicAboutCtrlFunction.$inject = ['$scope','$stateParams','CONFIG', 'jwtHelper', 'store','$rootScope','$ionicScrollDelegate','$ionicSlideBoxDelegate','$http','$window','$state','$cordovaGeolocation','entityProfiles'];

})();

//editEventCtrl
(function() {
  'use strict';

  angular
  .module('app')
  .controller('editEventCtrl', editEventCtrlFunction);

  editEventCtrlFunction.$inject =
  ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','editEventPost','eventData', '$ionicPopup', '$log', 'multipartForm'];

  function editEventCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,editEventPost, eventData, $ionicPopup, $log, multipartForm)
  {
      var t1 = store.get('token');
      var tp = jwtHelper.decodeToken(t1);
      var ent = tp;
      
       $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
      
      $scope.data={};   
 
      $scope.cancelEdit = function()
      {
          $state.go('eventFullView');
      }
      
      $scope.eventData = eventData;
      var time=eventData.individualEventPost;
      $scope.eventData.individualEventPost.start_time =new Date(time.start_time);
            $scope.eventData.individualEventPost.end_time =new Date(time.end_time);

      console.log($scope.eventData.individualEventPost.start_time);
      
      
               $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + eventData.individualEventPost.photo + "&type=" + 'event'),                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.event_photo = data;
//                   console.log("data: " + data);
              }).error(function(data) {
                   $scope.photoExists = false;
               });
      
      
      $scope.alterPost = function()
      {
          
      $http({
        url: 'https://hoyportibppr.com/api/entities/editevent/'+$scope.eventData.individualEventPost.id,
        method: 'POST',
        data: JSON.stringify({'event': $scope.eventData.individualEventPost}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456',
          'TOKEN' : t1
          }

        }).success(function (data, status, headers, config)
        {
          
                    $state.go('eventFullView');
                    $scope.PostDataResponse = data;

          $scope.picData = {
                'submit' : $scope.submit = 1,
                'userfile' : $scope.userfile
            }
        
            var uploadUrl = 'https://hoyportibppr.com/api/entities/event_uploadpicture/'+$scope.eventData.individualEventPost.id;
            
          $scope.$watch('data.userfile', function (img) {
                $scope.picData.userfile = img;
                multipartForm.post(uploadUrl, $scope.picData);
            });
          
          var alertPopup = $ionicPopup.alert({
                             title: "Event editted",
                             template: "The event was successfuly edited!"
                         });

              }).error(function (data, status, header, config)
              {
                $scope.ResponseDetails = data;
              });
            };
          }
        })();

//editVolunteering
(function(){

  'use strict';

angular.module('app').controller('editVolunteeringCtrl', editVolunteeringCtrlFunction);

editVolunteeringCtrlFunction.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment', 'volunteeringData', '$ionicPopup','multipartForm'];

function editVolunteeringCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment, volunteeringData, $ionicPopup,multipartForm)
{
    var t1 = store.get('token');
    var tp = jwtHelper.decodeToken(t1);
    var ent = tp;
    $scope.initializing = true;
    
     $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
    
       $scope.cancelEdit = function()
        {
            $state.go('volunteeringFullView')
        }
    
    $scope.showVolunteeringSkills = false;
        
        $scope.volunteeringShowSkills = function ()
        {
            $scope.showVolunteeringSkills = !$scope.showVolunteeringSkills;
        };
    
    $scope.volunteeringPostObject =
        {
        "volunteering_job":
        {
            "general_info":
            {
                "title": undefined,
                "description": undefined,
                "app_procedure": undefined,
                "work_hours": undefined,
                "num_of_ppl": undefined,
                "start_time": undefined,
                "end_time": undefined,
                "skills": undefined,
                "web": undefined
            },

            "address_information":
            {
                "address1": undefined,
                "address2": undefined,
                "city": undefined,
                "zip": undefined,
                "location_description": undefined
            },

            "contactinfo_supervisor":
            {
                "supervisor_name": undefined,
                "supervisor_email": undefined,
                "supervisor_phone": undefined
            },

            "geolocation_coordinates":
            {
                "longitude": undefined,
                "latitude": undefined
            }
        }};
    
    $scope.voluntData=volunteeringData.getVoluntPost();  
    var time=volunteeringData.getVoluntPost();  
    $scope.voluntData.start_time = new Date(time.start_time);
    $scope.voluntData.end_time = new Date(time.end_time);
    console.log($scope.voluntData);
    console.log($scope.voluntData.start_time);

     $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + $scope.voluntData.photo + "&type=" + 'post'),                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.volunteering_photo = data;
              }).error(function(data)
                       {
            $scope.photoExists = false;
        });
    $scope.data={};
    
    
    
    $scope.alterPost = function()
    {
         $scope.picData = {
                'submit' : $scope.submit = 1,
                'userfile' : $scope.userfile
            }
        
            var uploadUrl = 'https://hoyportibppr.com/api/entities/volunteering_job_uploadpicture/'+$scope.voluntData.id;
            
          $scope.$watch('data.userfile', function (newValue, oldValue) {
            
              $scope.picData.userfile = newValue;
                multipartForm.post(uploadUrl, $scope.picData);
                   console.log("Hello!");
            });
        
        $scope.volunteeringPostObject.volunteering_job.general_info.title = $scope.voluntData.title;
        $scope.volunteeringPostObject.volunteering_job.general_info.description = $scope.voluntData.description;
        $scope.volunteeringPostObject.volunteering_job.general_info.app_procedure = $scope.voluntData.app_procedure;
        $scope.volunteeringPostObject.volunteering_job.general_info.work_hours = $scope.voluntData.work_hours;
        $scope.volunteeringPostObject.volunteering_job.general_info.num_of_ppl = $scope.voluntData.num_of_ppl;
        $scope.volunteeringPostObject.volunteering_job.general_info.start_time = $scope.voluntData.start_time;
        $scope.volunteeringPostObject.volunteering_job.general_info.end_time = $scope.voluntData.end_time;
        $scope.volunteeringPostObject.volunteering_job.general_info.skills = $scope.voluntData.skills;
        $scope.volunteeringPostObject.volunteering_job.general_info.web = $scope.voluntData.web;
        $scope.volunteeringPostObject.volunteering_job.address_information.address1 = $scope.voluntData.address1;
        $scope.volunteeringPostObject.volunteering_job.address_information.address2 = $scope.voluntData.address2;
        $scope.volunteeringPostObject.volunteering_job.address_information.city = $scope.voluntData.city;
        $scope.volunteeringPostObject.volunteering_job.address_information.zip = $scope.voluntData.zip;
        $scope.volunteeringPostObject.volunteering_job.address_information.location_description = $scope.voluntData.location_description;
        $scope.volunteeringPostObject.volunteering_job.contactinfo_supervisor.supervisor_name =  $scope.voluntData.supervisor_name;
        $scope.volunteeringPostObject.volunteering_job.contactinfo_supervisor.supervisor_email = $scope.voluntData.supervisor_email;
        $scope.volunteeringPostObject.volunteering_job.contactinfo_supervisor.supervisor_phone =
        $scope.voluntData.supervisor_phone;
        
        $http({
                url: 'https://hoyportibppr.com/api/entities/edit_volunteering/' + $scope.voluntData.id,
                method: 'POST',
                data: JSON.stringify($scope.volunteeringPostObject),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-API-KEY' : '123456',
                    'TOKEN' : t1
                }
        
        }).success(function (data, status, headers, config) {
                
                var alertPopup = $ionicPopup.alert(
                    {
                        title: "Volunteering Job edited",
                        template: "The Volunteering Job was successfuly edited!"
                    }
                );
                
                $state.go('volunteeringFullView');
            
            }).error(function (data, status, header, config) {
                $scope.ResponseDetails = data;
                
                $scope.titleError = data.message.title;
            $scope.descriptionError = data.message.description;
            $scope.start_timeError = data.message.start_time;
            $scope.end_timeError = data.message.end_time;
            $scope.addressError = data.message.address;
            $scope.cityError = data.message.city;
            $scope.end_zipError = data.message.zip;
            $scope.supervisor_nameError = data.message.supervisor_name;
            $scope.supervisor_phoneError = data.message.supervisor_phone;
            $scope.supervisor_emailError = data.message.supervisor_email;
        
                 $ionicPopup.alert(
                    {
                        title: 'Error Description',
                        template: $scope.titleError || $scope.descriptionError || $scope.start_timeError || $scope.end_timeError || $scope.addressError || $scope.cityError || 
                $scope.end_zipError || $scope.supervisor_nameError || $scope.supervisor_phoneError || $scope.supervisor_emailError ||  'There was an error creating the event. Please check the required fields and try again.'
                    });
            
            
            
            });   
                }
}
    
})();

//editTextPostCtrl
(function() {
    'use strict';

    angular
    .module('app')
    .controller('editTextPostCtrl', editTextPostCtrlFunction);

    editTextPostCtrlFunction.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','editTextPost'];

    function editTextPostCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,editTextPost)
    {
      $rootScope.previousState;
        
      $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams)
      {
        $rootScope.previousState = from.name;
      });

      var t1 = store.get('token');
      var tp = jwtHelper.decodeToken(t1);
      var ent = tp;
      $scope.data={};
      var val = editTextPost.editTextPostVar;

      $scope.alterPost = function()
      {
        $http({
          url: 'https://hoyportibppr.com/api/entities/post/'+val,
          method: 'PUT',
          data: $httpParamSerializerJQLike($scope.data),//
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
            'TOKEN' : t1
          }

        }).success(function (data, status, headers, config)
        {
          $scope.PostDataResponse = data;
          $state.go($state.previous);

        }).error(function (data, status, header, config)
        {
          $scope.ResponseDetails = data;
        });
      }
    }

  })();

//ActivityFeedCtrl
(function(){
    'use strict';
    
    function activityFeedCtrlFunction ($scope, $stateParams, $timeout, $http, store, jwtHelper, $httpParamSerializerJQLike, $ionicActionSheet, $state, $ionicPopup, moment, editTextPost) {
        
        $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_posts',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        
        }).success(function(data) {
            $scope.posts = data.message;
            console.log($scope.posts);
        });
        
        
         $scope.doRefresh = function() {
       $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_posts',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        
        }).success(function(data) {
            $scope.posts = data.message;
            console.log($scope.posts);
        })
    .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    
    };
    
    }
    
    activityFeedCtrlFunction.$inject =['$scope', '$stateParams', '$timeout', '$http', 'store', 'jwtHelper', '$httpParamSerializerJQLike', '$ionicActionSheet', 'moment', '$ionicActionSheet', '$state', 'editTextPost'];
    
    angular
        .module('app')
        .controller('activityFeedCtrl',activityFeedCtrlFunction);
    
})();

//volunteeringCtrl
(function(){
    'use strict';
    
    angular
        .module('app')
        .controller('volunteeringCtrl', volunteeringCtrlFunction);
    
    volunteeringCtrlFunction.$inject = ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$state', '$ionicPopup','moment','volunteeringData','editVolunteeringPost', 'Events']; //'Upload',

    function volunteeringCtrlFunction($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state, $ionicPopup,moment,volunteeringData,editVolunteeringPost, Events) 
    {  
             $scope.goToVoluntView = function(voluntPost_id){

        $http({
          method: 'GET',
          url: 'https://hoyportibppr.com/api/entities/volunteering/'+voluntPost_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        }).success(function (data) {
            $scope.posts = data.message;
            console.log($scope.posts);
            volunteeringData.individualVoluntPost = $scope.posts;
            $state.go('publicVolunteeringFullView');
          });
      };
        
        $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_volunteerings/',
             headers: {'Content-Type': 'application/x-www-form-urlencoded',
                       'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        }).success(function (data) {
            $scope.posts = data.message;
            
            console.log(Events);
            
        });
        
         $scope.doRefresh = function() {
        
       $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_volunteerings/',
             headers: {'Content-Type': 'application/x-www-form-urlencoded',
                       'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        }).success(function (data) {
            $scope.posts = data.message;
            
            console.log(Events);
            
        })
    .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    
    };
    
        $scope.addEventToCalendar = function(event)
        {
            console.log(Events.addEvent(event));
            console.log(Events.s);
            if(Events.s === true)
                {
                    $ionicPopup.alert(
                  {
                      title: 'Volunteering event scheduled!',
                      template: 'You have scheduled the volunteering event successfully to your native calendar!'
                  });
                }
            
            else
            {
                $ionicPopup.alert(
                  {
                      title: 'Volunteering not scheduled!',
                      template: 'There was an error scheduling the volunteering event to your native calendar.'
                  });
            }
        }
    }
    
})();

//eventCtrl
(function(){
    'use strict';
    
    angular
        .module('app')
        .controller('eventsCtrl', eventsCtrlFunction);
    
    eventsCtrlFunction.$inject = ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$state', '$ionicPopup','moment','$ionicActionSheet','eventData','editEventPost','$ionicPopover']; //'Upload',

    function eventsCtrlFunction($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$state, $ionicPopup,moment, $ionicActionSheet, eventData,editEventPost, $ionicPopover) {

    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/all_events/',
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
    });
        
                 $scope.goToEventView = function(eventPost_id){
        
        $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event/'+eventPost_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
        $scope.event = data.message.event;
            
        eventData.individualEventPost = $scope.event;
        
        $state.go('publicEventFullView');
    });
        
    };
        
          //Function definitions:
    $scope.doRefresh = function() {
        
        $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/all_events/',
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
    })
    .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    };
}
    
})();

//publicVolunteeringFullViewCtrl
(function(){

  'use strict';
  angular
    .module('app')
    .controller('publicVolunteeringFullViewCtrl', publicVolunteeringFullViewCtrl);

  publicVolunteeringFullViewCtrl.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','volunteeringData','$ionicPopup','$ionicActionSheet', 'Events'];

  function publicVolunteeringFullViewCtrl($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,volunteeringData,$ionicPopup,$ionicActionSheet, Events)
{
    $scope.goingg = true;
    $scope.notGoing = false;
    $scope.post = volunteeringData.individualVoluntPost;
    
                $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}

    }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
        console.log($rootScope.supporter_data);
                     if($rootScope.u)
        {
            $rootScope.supporter_data.participation.forEach(function(element){

                if(element.id === $scope.post.id){
                    console.log("Equal");
                    $scope.goingg = false;
                    $scope.notGoing = true;
                    console.log($scope.goingg, $scope.notGoing);
                }

            });
        }
    });
    
     $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + volunteeringData.individualVoluntPost.photo + "&type=" + 'post'),                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.volunteering_photo = data;
              }).error(function(data)
                       {
            $scope.photoExists = false;
        });
    
    $scope.going = function(id){

        $http({
            method: 'POST',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/going_volunteering/'+id,
             headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
        }).success(function (data) {
            
            console.log($rootScope.supporter_data.vol_going);
            $scope.info1 = data.message;
            $state.go($state.current, $stateParams, {reload: true, inherit: false});
                  var alertPopup = $ionicPopup.alert({
                  title: 'Thanks for your awareness!'
                  });        

        }).error(function (data) {
            $scope.error = data.message;
            console.log($scope.error);
            $scope.data = {};
        });
    };
      
      $scope.ungoing = function(id){
          
        $http({
            method: 'DELETE',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/going_volunteering/'+id,
             headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
        }).success(function (data) {
            $scope.info1 = data.message;
            console.log($rootScope.supporter_data.vol_going);
                    $state.go($state.current, $stateParams, {reload: true, inherit: false});

            var alertPopup = $ionicPopup.alert({
                  title: 'No problem!'
                  });
        });
    };
    
     $scope.addToCalendar = function (volunteering)
     {
         Events.add(volunteering);
         //Events.get(volunteering);
         console.log(volunteering);
     };
}
})();

//publicEventFullViewCtrl
(function(){

  'use strict';
  angular.module('app').controller('publicEventFullViewCtrl', publicEventFullViewCtrlFunction);

  function publicEventFullViewCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment, eventData, $timeout,$ionicPopup,$ionicActionSheet, Events)
  {  
      $scope.goingg = false;
      $scope.notgoingg = true;
      $scope.post = eventData.individualEventPost;
      
     
      
      if($rootScope.u === true){
      if($rootScope.supporter_data.participation !== null)   
      {
              $rootScope.supporter_data.participation.forEach(function(element){
                  
                  if(element.id === $scope.post.id)
                      {
                          console.log('hello');
                          $scope.goingg = true;
                          $scope.notgoingg = false;
                      }
                  
              })
          }
      }
      
      var img =  eventData.individualEventPost.photo;
      var id = eventData.individualEventPost.id;
      
       
      var type="event";
               $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + eventData.individualEventPost.photo + "&type=" + 'event'),                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.event_photo = data;
//                   console.log(data);
              }).error(function(data)
                       {
            $scope.photoExists = false;
                   
        });
      
      $scope.going = function(id){
          
          $scope.goingEvent = 
          {
          "event_decision": { 
            "event_id":  id, 
            "decision": "going"}
          };
          
        $http({
            method: 'POST',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/participate_event/',
            data: JSON.stringify($scope.goingEvent),
             headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
        }).success(function (data) {
             $scope.goingg = true;
      $scope.notgoingg = false;
            $scope.info1 = data.message;
            
                  var alertPopup = $ionicPopup.alert({
                  title: 'Thanks for your awareness!'
                  });
            
            $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}
    
            }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
        console.log($rootScope.supporter_data);
    });            
            
        }).error(function (data) {
            $scope.error = data.message;
            console.log($scope.error);
        });
    };
      
       $scope.interested = function(id){
           
            $scope.interestedEvent = 
          {
          "event_decision": { 
            "event_id":  id, 
            "decision": "interested"}
          };
      
        $http({
            method: 'POST',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/participate_event/',
            data: JSON.stringify($scope.interestedEvent),
             headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
        }).success(function (data) {
                  
            $scope.goingg = true;
      $scope.notgoingg = false;
            
            $scope.info1 = data.message;
            
            $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}
    }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
        console.log($rootScope.supporter_data);
    });
                  var alertPopup = $ionicPopup.alert({
                  title: 'Thanks for your awareness!'
        });
            
        }).error(function (data) {
            $scope.error = data.message;
            console.log($scope.error);
            
        });
    };
      
      $scope.ungoing = function(id){
            
            $scope.ungoingEvent = 
          {
          "event_decision": { 
            "event_id":  id}
            };

        $http({
            method: 'DELETE',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/participate_event/'+id,
             headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
        }).success(function (data) {
            
             $scope.goingg = false;
      $scope.notgoingg = true;
            
            $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}
    }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
    });
            $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}
    }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
    });
            $scope.info1 = data.message;

            var alertPopup = $ionicPopup.alert({
                  title: 'No problem!'
                  });
        });
    };
    
       $scope.addToCalendar = function (volunteering)
      {
          console.log(Events.add($scope.post));
      };
      
  }

  publicEventFullViewCtrlFunction.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','eventData', '$timeout','$ionicPopup','$ionicActionSheet', 'Events'];

})();

//myEntityEventsCtrl
(function(){

  'use strict';
  angular
    .module('app')
    .controller('myEntityEventsCtrl', myEntityEventsCtrl);

  myEntityEventsCtrl.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','volunteeringData', 'eventData'];

  function myEntityEventsCtrl($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,volunteeringData, eventData)
{
    //obtenemos el token en localStorage
    var token = store.get('token');
    //decodificamos para obtener los datos del user
    var tokenPayload = jwtHelper.decodeToken(token);
    //los mandamos a la vista como user
    $rootScope.supporter = tokenPayload;
    
    $scope.goToEventView = function(eventPost_id){
        
        $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event/'+eventPost_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
        $scope.event = data.message.event;
            
        eventData.individualEventPost = $scope.event;
        
        $state.go('publicEventFullView');
    });
        
    };
    
    $scope.goToVoluntView = function(voluntPost_id){

        $http({
          method: 'GET',
          url: 'https://hoyportibppr.com/api/entities/volunteering/'+voluntPost_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        }).success(function (data) {
            $scope.posts = data.message;
            console.log($scope.posts);
            volunteeringData.individualVoluntPost = $scope.posts;
            $state.go('publicVolunteeringFullView');
          });
      };
    
      $scope.doRefresh = function() {
       $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/my_newsfeed/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
            'TOKEN' : store.get('token')
        }
    }).success(function (data) {
        $scope.posts = data.message;
         console.log( $scope.posts);
    })
    .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    
    };
    
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/my_newsfeed/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
            'TOKEN' : store.get('token')
        }
    }).success(function (data) {
        $scope.posts = data.message;
         console.log( $scope.posts);
    });

}

})();

//registeredEventsCtrl
(function(){

  'use strict';
  angular
    .module('app')
    .controller('registeredEventsCtrl', registeredEventsCtrl);

  registeredEventsCtrl.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','volunteeringData', 'eventData', 'Events'];

  function registeredEventsCtrl($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,volunteeringData, eventData, Events)
{
$http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}
    }).success(function(data) {
            console.log(data);
         $scope.my_activities = [];

        data.message.participation.forEach(function(element){
            
                var temp = {
                                category: element.category,
                                city_name: element.city_name,
                                description: element.description,
                                ent_name: element.ent_name,
                                needed: element.needed,
                                title: element.title,
                                id: element.id,
                                start_time: element.start_time
                            };
                 $scope.my_activities.push(temp);            
        })
        
        console.log($scope.my_activitiestit);
    });
    
    $scope.goToEventView = function(eventPost_id){
        
        $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event/'+eventPost_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
        $scope.event = data.message.event;
            
        eventData.individualEventPost = $scope.event;
        
        $state.go('publicEventFullView');
    });
        
    };
    
     $scope.goToVoluntView = function(voluntPost_id){

        $http({
          method: 'GET',
          url: 'https://hoyportibppr.com/api/entities/volunteering/'+voluntPost_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        }).success(function (data) {
            $scope.posts = data.message;
            console.log($scope.posts);
            volunteeringData.individualVoluntPost = $scope.posts;
            $state.go('publicVolunteeringFullView');
          });
      };
    
    $scope.addEventToCalendar = function(event, $event)
    {
        $event.stopPropagation();
        Events.addEvent(event);
    };
}

})();

//myEntitiesCtrl
(function(){

  'use strict';
  angular
    .module('app')
    .controller('myEntitiesCtrl', myEntitiesCtrl);

  myEntitiesCtrl.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','entityProfiles'];

  function myEntitiesCtrl($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,entityProfiles)
{    
            $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}

    }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
        console.log($rootScope.supporter_data);
    });
    
      $scope.selectEnt = function(val) {

        $http({
          method: 'GET',
          skipAuthorization: true,//es necesario enviar el token
          url: 'https://hoyportibppr.com/api/entities/' + val,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        })
          .success(function (data) {
            $scope.info = data.message;
            entityProfiles.individualEntity = $scope.info;

            $state.go('followedEntities');
          });
      };
    
     $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/my_entities',
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456',
                  'TOKEN' : store.get('token')}
    })
    .success(function (data) {
        $scope.entity = data.message;
         console.log($scope.entity);
    });
}
})();

//discoverCtrl
(function(){

  'use strict';
  angular
    .module('app')
    .controller('discoverCtrl', discoverCtrl);

  discoverCtrl.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','volunteeringData'];

  function discoverCtrl($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,volunteeringData)
{
    var token = store.get('token');
    //decodificamos para obtener los datos del user
    var tokenPayload = jwtHelper.decodeToken(token);
    //los mandamos a la vista como user
    $rootScope.supporter = tokenPayload;
    
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}

    }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
    });
    
        $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}

    }).success(function (data) {

        $scope.info = data.message;
        
        $scope.img={};
        $scope.img = data.message.sup_pic;

        $http({
            method: 'POST',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/displaypic/',
            data: "img=" + $scope.img,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456'
            }

        }).success(function (data) {
            $rootScope.info1 = data.message;
        });
    });

}

})();

//allEventsCtrl
(function(){
    'use strict';
     
    angular
        .module('app')
        .controller('allEventsCtrl', allEventsCtrl);
    
    allEventsCtrl.$inject = ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$state', '$ionicPopup','moment','$ionicActionSheet','eventData','editEventPost','$ionicPopover', '$rootScope']; //'Upload',

    function allEventsCtrl($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$state, $ionicPopup,moment, $ionicActionSheet, eventData,editEventPost, $ionicPopover, $rootScope) {
        
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton

         $scope.doRefresh = function() {
       $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/all_events/',
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
    })
    .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    
    };
        
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/all_events/',
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
    });
        
                 $scope.goToEventView = function(eventPost_id){
        
        $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event/'+eventPost_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message;
        $scope.event = data.message.event;
            
        eventData.individualEventPost = $scope.event;
        
        $state.go('publicEventFullView');
    });
        
    };
}
    
})();

//volunteeringCtrl
(function(){
    'use strict';
    
    angular
        .module('app')
        .controller('allVolunteeringsCtrl', allVolunteeringsCtrl);
    
    allVolunteeringsCtrl.$inject = ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$state', '$ionicPopup','moment','volunteeringData','editVolunteeringPost', 'Events', '$rootScope']; //'Upload',

    function allVolunteeringsCtrl($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state, $ionicPopup,moment,volunteeringData,editVolunteeringPost, Events,$rootScope) 
    {  

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
        
             $scope.goToVoluntView = function(voluntPost_id){

        $http({
          method: 'GET',
          url: 'https://hoyportibppr.com/api/entities/volunteering/'+voluntPost_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        }).success(function (data) {
            $scope.posts = data.message;
            console.log($scope.posts);
            volunteeringData.individualVoluntPost = $scope.posts;
            $state.go('publicVolunteeringFullView');
          });
      };
        
        $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_volunteerings/',
             headers: {'Content-Type': 'application/x-www-form-urlencoded',
                       'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        }).success(function (data) {
            $scope.posts = data.message;
            
            console.log(Events);
            
        });
        
        $scope.addEventToCalendar = function(event)
        {
            console.log(Events.addEvent(event));
            console.log(Events.s);
            if(Events.s === true)
                {
                    $ionicPopup.alert(
                  {
                      title: 'Volunteering event scheduled!',
                      template: 'You have scheduled the volunteering event successfully to your native calendar!'
                  });
                }
            
            else
            {
                $ionicPopup.alert(
                  {
                      title: 'Volunteering not scheduled!',
                      template: 'There was an error scheduling the volunteering event to your native calendar.'
                  });
            }
        }
        
         $scope.doRefresh = function() {
        
       $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_volunteerings/',
             headers: {'Content-Type': 'application/x-www-form-urlencoded',
                       'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        }).success(function (data) {
            $scope.posts = data.message;
            
            console.log(Events);
            
        })
    .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    
    };
        
    }
    
})();

//allPostsCtrl
(function(){
    'use strict';
    
    function allPostsCtrl($scope, $stateParams, $timeout, $http, store, jwtHelper, $httpParamSerializerJQLike, $ionicActionSheet, $state, $ionicPopup, moment, editTextPost) {
        
        $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_posts',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        
        }).success(function(data) {
            $scope.posts = data.message;
            console.log($scope.posts);
        });

         $scope.doRefresh = function() {
       $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_posts',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        
        }).success(function(data) {
            $scope.posts = data.message;
            console.log($scope.posts);
        })
    .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    
    };  
        
    }
    
    allPostsCtrl.$inject =['$scope', '$stateParams', '$timeout', '$http', 'store', 'jwtHelper', '$httpParamSerializerJQLike', '$ionicActionSheet', 'moment', '$ionicActionSheet', '$state', 'editTextPost'];
    
    angular
        .module('app')
        .controller('allPostsCtrl',allPostsCtrl);
})();

//publicVolunteeringFullViewCtrl
(function(){

  'use strict';
  angular
    .module('app')
    .controller('guestVolunteeringFullViewCtrl', publicVolunteeringFullViewCtrl);

  publicVolunteeringFullViewCtrl.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','volunteeringData','$ionicPopup','$ionicActionSheet', 'Events'];

  function publicVolunteeringFullViewCtrl($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,volunteeringData,$ionicPopup,$ionicActionSheet, Events)
{
    
    $scope.goingg = true;
    $scope.notGoing = false;
    $scope.post = volunteeringData.individualVoluntPost;
    
                $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}

    }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
        console.log($rootScope.supporter_data);
                     if($rootScope.u)
        {
            $rootScope.supporter_data.participation.forEach(function(element){

                if(element.id === $scope.post.id){
                    console.log("Equal");
                    $scope.goingg = false;
                    $scope.notGoing = true;
                    console.log($scope.goingg, $scope.notGoing);
                }

            });
        }
    });
    
     $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + volunteeringData.individualVoluntPost.photo + "&type=" + 'post'),                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.volunteering_photo = data;
              }).error(function(data)
                       {
            $scope.photoExists = false;
        });
    
    $scope.going = function(id){

        $http({
            method: 'POST',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/going_volunteering/'+id,
             headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
        }).success(function (data) {
            
            console.log($rootScope.supporter_data.vol_going);
            $scope.info1 = data.message;
            $state.go($state.current, $stateParams, {reload: true, inherit: false});
                  var alertPopup = $ionicPopup.alert({
                  title: 'Thanks for your awareness!'
                  });         

        }).error(function (data) {
            $scope.error = data.message;
            $scope.data = {};            
        });
    };
      
      $scope.ungoing = function(id){
          
        $http({
            method: 'DELETE',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/going_volunteering/'+id,
             headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
        }).success(function (data) {
            $scope.info1 = data.message;
            console.log($rootScope.supporter_data.vol_going);
                    $state.go($state.current, $stateParams, {reload: true, inherit: false});

            var alertPopup = $ionicPopup.alert({
                  title: 'No problem!'
                  });                         
        });
    };
    
     $scope.addToCalendar = function (volunteering)
      {
        console.log(Events.add($scope.post));
      };
    
}

})();

//publicEventFullViewCtrl
(function(){

  'use strict';
  angular.module('app').controller('guestEventFullViewCtrl', publicEventFullViewCtrlFunction);

  function publicEventFullViewCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment, eventData, $timeout,$ionicPopup,$ionicActionSheet, Events)
  {  
      $scope.goingg = false;
      $scope.notgoingg = true;
      
      $scope.post = eventData.individualEventPost;
            
      if($rootScope.u === true){
          
      if($rootScope.supporter_data.participation !== null)   
      {
              $rootScope.supporter_data.participation.forEach(function(element){
                  
                  if(element.id === $scope.post.id)
                      {
                          console.log('hello');
                          $scope.goingg = true;
                          $scope.notgoingg = false;
                      }
              })
          }
      }
      
      var img =  eventData.individualEventPost.photo;
      var id = eventData.individualEventPost.id;
       
      var type="event";
               $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + eventData.individualEventPost.photo + "&type=" + 'event'),                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.event_photo = data;
                   console.log(data);
              }).error(function(data)
                       {
            $scope.photoExists = false;
                   
        });
      
      $scope.going = function(id){

          $scope.goingEvent = 
          {
          "event_decision": { 
            "event_id":  id, 
            "decision": "going"}
          };
          
        $http({
            method: 'POST',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/participate_event/',
            data: JSON.stringify($scope.goingEvent),
             headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
        }).success(function (data) {
             $scope.goingg = true;
      $scope.notgoingg = false;
//            console.log($rootScope.supporter_data.vol_going);
            $scope.info1 = data.message;
            
                  var alertPopup = $ionicPopup.alert({
                  title: 'Thanks for your awareness!'
                  });
            
            $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}
    
            }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
        console.log($rootScope.supporter_data);
    });            
            
        }).error(function (data) {
            $scope.error = data.message;
            console.log($scope.error);
        });
    };
      
       $scope.interested = function(id){
           
            $scope.interestedEvent = 
          {
          "event_decision": { 
            "event_id":  id, 
            "decision": "interested"}
          };
      
        $http({
            method: 'POST',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/participate_event/',
            data: JSON.stringify($scope.interestedEvent),
             headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
        }).success(function (data) {
            
            $scope.goingg = true;
      $scope.notgoingg = false;
            
            $scope.info1 = data.message;
            
            $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}
    }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
        console.log($rootScope.supporter_data);
    });
            
                  var alertPopup = $ionicPopup.alert({
                  title: 'Thanks for your awareness!'
        });
            
        }).error(function (data) {
            $scope.error = data.message;
            console.log($scope.error);
            
        });
    };
      
      $scope.ungoing = function(id){
          
            $scope.ungoingEvent = 
          {
          "event_decision": { 
            "event_id":  id}
            };
          
          console.log($scope.ungoingEvent);

        $http({
            method: 'DELETE',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/participate_event/'+id,
             headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
        }).success(function (data) {
            
             $scope.goingg = false;
      $scope.notgoingg = true;
            
            $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}
    }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
        console.log($rootScope.supporter_data);
    });$http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}
    }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
        console.log($rootScope.supporter_data);
    });
            $scope.info1 = data.message;

            var alertPopup = $ionicPopup.alert({
                  title: 'No problem!'
                  });
        });
    };
    
       $scope.addToCalendar = function (volunteering)
      {
          Events.add($scope.post);
      };
      
  }

  publicEventFullViewCtrlFunction.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','eventData', '$timeout','$ionicPopup','$ionicActionSheet', 'Events'];

})();

//termsAndConditionsCtrl
(function(){
    'use strict';
    
    function termsAndConditionsCtrlFunction($scope, $rootScope, $http, store, jwtHelper) {

        var token = store.get('token');
    //decodificamos para obtener los datos del user
    var tokenPayload = jwtHelper.decodeToken(token);
    //los mandamos a la vista como user
    $rootScope.supporter = tokenPayload;
        
            $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/supporters/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
         'TOKEN': store.get('token')}

    }).success(function(data) {

        $scope.info = data.message;
            if($scope.info.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
            
        $rootScope.supporter_data = data.message;
    });
    }
    
    termsAndConditionsCtrlFunction.$inject =['$scope', '$rootScope', '$http','store', 'jwtHelper'];
    
    angular
        .module('app')
        .controller('termsAndConditionsCtrl',termsAndConditionsCtrlFunction);
})();