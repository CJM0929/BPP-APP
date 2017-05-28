(function() {

        "use strict";

    angular
     .module('app')
     .run(function ($rootScope, $state, $http, $ionicActionSheet, $ionicPopup, store,$window,jwtHelper)
    {
    
    // default flags that are in charge of hiding and showing options depending on the login status
        
    // when not loggedin the authentication is set to false
    $rootScope.isAuthenticated = false;
        
    // when not logged in as entity admin this flag deactivates all the entity buttons
    $rootScope.entity = false;
        
    // when not loggedin the login button will show up
    $rootScope.login = true;
        
    // when not logged in the signin button will show up
    $rootScope.signin = true;
        
    // when not logged in as supporter this flag deactivates all the supporter buttons
    $rootScope.supporter = false;
    $rootScope.disableFollowButton = true;
        
    // this if condition is in charge of verifying if the token exist
    // the token is generated when the user logins
    // the token contains the role credentials of the user
    if(store.get('token') != null){
    var tokenEncoded = store.get('token');// get the encoded token
    var tokenDecoded = jwtHelper.decodeToken(tokenEncoded);// decode the encoded token
                
    // in this if condition the role of the user is verified and depending
    // of what role the user is, it will activate and deactivate some flags
    if(tokenDecoded.role == 'supporter'){
        
        // set authentication to true
        $rootScope.isAuthenticated = true;
        
        // this flag activate all the supporter buttons
        $rootScope.supporter = !$rootScope.supporter;
        
        // this flag hide the login option
        $rootScope.login = !$rootScope.login;
        
        // this flag hide the sign in option
        $rootScope.signin = !$rootScope.signin;
        
    }  else if (tokenDecoded.role == 'entity') {
        
        // set authentication to true
        $rootScope.isAuthenticated = true;
        
        // this flag activate all the entity buttons
        $rootScope.entity = !$rootScope.entity;
        
        // this flag hide the login option
        $rootScope.login = !$rootScope.login;
        
        // this flag hide the sign in option
        $rootScope.signin = !$rootScope.signin;
        
        $rootScope.disableFollowButton = !$rootScope.disableFollowButton;
      }
    }
        
        //this function is for logout button in the side menu
        $rootScope.logoutFunction = function (){

            // when logout authToken will be set to undefined
            $rootScope.authToken = undefined; 
            // when logout isAuthenticated will be set to false
            $rootScope.isAuthenticated = false; 
            // when logout the token containing the credentials of the user will be deleted
            store.remove('token'); 
            // when logout the user will automatically go to the login page
            $state.go('login'); 
            // when user logout the profile page of user button will dissapear from the html DOM
            $rootScope.supporter = false; 
            // when user logout the profile page of entity button will dissapear from the html DOM
            $rootScope.entity = false; 
            // when user logout the login button will dissapear from the html DOM
            $rootScope.login = true;  
            // when user logout the signup button will dissapear from the html DOM
            $rootScope.signin = true;  
            // when logout everything will be set to undefined and default.
            $http.defaults.headers.common.Authorization = undefined; 

           // Popup notifying that the user log out from his account
                var alertPopup = $ionicPopup.alert({
                     title: "Logout",
                     template: "You've been logged out!"
                 });
        };          
            // this function is for the edit entity profile button in the side menu
            // when the user click's the button it will go to the editSupportersProfile.html
            $rootScope.editSupporterProfile = function() {
            $state.go('editSupportersProfile');
            };

            // this function is for the edit supporter profile button in the side menu
            // when the user click's the button it will go to the editEntityProfile.html
            $rootScope.editEntityProfile = function() {
            $state.go('editEntityProfile');
            };
    });
    
})();

//categoriesCtrl
(function(){

    "use strict";

    angular
        .module('app')
        .controller('categoriesCtrl', categoriesCtrlFunction);

    categoriesCtrlFunction.$inject = ['$scope', '$stateParams','$http', '$state','entityProfiles','$ionicPopup', '$rootScope'];

    function categoriesCtrlFunction($scope, $stateParams, $http, $state,entityProfiles,$ionicPopup, $rootScope) {
        
      $scope.categories = undefined;
      // this $http service give us all the existing categories
      $http({
        url: 'https://hoyportibppr.com/api/entities/categories',
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'
        }
      }).then( function(response) {
        // the categories variable will contain a json of all existing categories
        $scope.categories = response.data.message.categories;
        });// end of http (https://hoyportibppr.com/api/entities/categories)
        
      // this function is attached to a button and is in charge of 
      // selecting a specific category and retrieve all the available 
      // entities for such category
      $scope.categorySelection = function(val) {

        // this $http service give us all the existing entities for a specific category
        $http({
          url: 'https://hoyportibppr.com/api/entities/category/'+val,
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'
          }
        }) // if entities exist for the selected category the successCallback will run
          .then( function successCallback(response) {
            entityProfiles.entList = response.data.message;
            $state.go('entities');
        // if entities does not exist for the selected category the errorCallback will run
          }, function errorCallback(response){
            
            // popup occur when an there are 0 entities in the selected category, the error message is from the backend
            if(response.data.status == "failure"){

              var alertPopup = $ionicPopup.alert({
                title: 'No entities registered in this category.'
              });

            }

          });

      };// end of categorySelection function

    }// categoriesCtrlFunction function definition end.

})();

//changePasswordCtrl
(function(){

    "use strict";

    function changePasswordCtrlFunction($scope, $stateParams, authFactory, jwtHelper, store, $rootScope, $http, $httpParamSerializerJQLike, $state, $ionicPopup)
{
    //Variables:
    $scope.data = {};
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
                'TOKEN' : store.get('token')
            }

        }).success(function (data, status, headers, config) {

            if(data.status == "success")
            { // this if condition verify the response was an error and display the error to the user

                var alertPopup = $ionicPopup.alert(
                    {   // Pop up which shows the errors to the user
                        title: 'Password Changed!',
                        template: 'Password has been change succesfully. Please sign in again with the new password.'
                    });

                $rootScope.authToken = undefined; // when logout authToken will be set to undefined
                $rootScope.isAuthenticated = false; // when logout isAuthenticated will be set to false
                store.remove('token'); // when logout the token containing the credentials of the user will be deleted
                $state.go('login'); // when logout the user will automatically go to the login page
                $rootScope.supporter = false; // when user logout the profile page of user button will dissapear from the html DOM
                $rootScope.entity = false; // when user logout the profile page of entity button will dissapear from the html DOM
                $rootScope.login = true;  // when user logout the login button will dissapear from the html DOM
                $rootScope.signin = true;  // when user logout the signup button will dissapear from the html DOM
                $http.defaults.headers.common.Authorization = undefined; // when logout everything will be set to undefined and default
                $state.transitionTo($state.current, $state.params, { reload: true, inherit: true, notify: true });//reload pg when transition to login page
            }// end of if

        }).error(function (data, status, header, config) {

            // error response from the backend
            $scope.ResponseDetails = data.status;
            $scope.error1 = data.message.current_password; 
            $scope.error2 = data.message.new_password;
            $scope.error3 = data.message.new_passconf;

            // if an error is detected a  popup is triggered that is in charge of displaying all the errors from the backend
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

//textPostFeedCtrl
(function(){

    "use strict";

    angular
        .module('app')
        .controller('textPostFeedCtrl', textPostFeedCtrlFunction);

    textPostFeedCtrlFunction.$inject = ['$scope', '$rootScope','$stateParams', '$timeout', '$http', 'store', 'jwtHelper', '$httpParamSerializerJQLike', '$ionicActionSheet', '$state', '$ionicPopup', 'moment'];

    function textPostFeedCtrlFunction($scope, $rootScope,$stateParams, $timeout,$http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state,$ionicPopup,moment)
{
    //Variables:
    var tokenEncoded = store.get('token');
    var tokenDecoded = jwtHelper.decodeToken(tokenEncoded);
    var ent = tokenDecoded;
    
    //function variables
    $scope.alterPost = alterPostFunction;
    $scope.doRefresh = doRefreshFunction;
    $scope.newPost = newPostGoFunction;
    
    // this variable is used to post the data 
    // and bind the data to the popup
    $scope.data={};

    //Function definitons:
    function alterPostFunction(selectedPost)
    {
        $scope.selectedPost = selectedPost;
        
        // this function is triggered, it will open
        // an action sheet with the existing text post
        // the user has three options edit, delete or cancel
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
                    //  here the slected existing text post is binded to the view
                    //  so the user can modify its selected existing post 
                    // without typing everything again
                    $scope.data.message = $scope.selectedPost.post_message;
                    
                    // when the edit button is clicked the (more) icon a
                    // popup will be released showing the current text post
                    var optionsPopup = $ionicPopup.show(
                        {
                            // here is the layout and information of the edit popup
                            template: "<textarea rows='10' type='text' ng-model='data.message'></textarea>",
                            title: 'Edit Post',
                            scope: $scope,
                            buttons: [{ text: 'Cancel' },
                                      {text: '<b>Save</b>', type: 'button-royal',
                                       onTap: function(e)
                                       {
                                           // this http service is in charge of updating the data of the existing text post
                                           $http({
                                               url: 'https://hoyportibppr.com/api/entities/post/'+selectedPost.id,
                                               method: 'PUT',
                                               data: $httpParamSerializerJQLike($scope.data),
                                               headers: {
                                                   'Content-Type': 'application/x-www-form-urlencoded',
                                                   'X-API-KEY' : '123456',
                                                   'TOKEN' : store.get('token')
                                               }
                                               
                                        // when success it will display popup notifying the user that the post was edited
                                           }).success(function (data) {

                                               $ionicPopup.alert(
                    {
                        title: 'Edit post successful',
                        template: 'Your activity post was successfuly edited!'
                    });
                
                    // this is to reload the current view and show the updated data
                    $state.go($state.current, $stateParams, {reload: true, inherit: false});

                                           }).error(function (data) {
                                                // this is used to display errors from backend
                                           });
                                       }
                                       
                                      }
                                     ]
                        });
                },// end of buttonClicked function
                
                // this is activated when the user click the delete button
                // it will delete the selected post
                destructiveButtonClicked: function() {
                    
                // confirmation popup to make sure the user did not 
                // accidentally click the delete button
                    
                // popup message
                    var confirmPopup = $ionicPopup.confirm({
                         title: 'Text post deletion',
                         template: " This post will be deleted and you won't be able to find it anymore. You can also edit this post, if you just want to change something."
                     });

    // this is when the user click the confirmation button to delete the 
    // text post
     confirmPopup.then(function(res) {
         
         if(res) {
             
                // $http service that is in charge of deleting the selected text post
                   $http({
                        method: 'DELETE',
                        skipAuthorization: true,//es necesario enviar el token
                        url: 'https://hoyportibppr.com/api/entities/post/'+ selectedPost.id,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/x-www-form-urlencoded',
                            'X-API-KEY' : '123456',
                            TOKEN: store.get('token')
                        }
                       
                       // if the post was successfully deleted, the following function will run
                    }).success(function (data) {
                       // alert popup notifying that the selected post is deleted
                         var alertPopup = $ionicPopup.alert({
                             title: 'Post deleted',
                             template: 'The post was successfuly deleted!'
                           });
                        
                       // this is to reload the current view and show the updated data
                        $state.go($state.current, $stateParams, {reload: true, inherit: false});
                    });    
                } // end of if 
        });
                } // end of destructiveButtonClicked function
            });// end of $ionicActionSheet
    } // end of alterPostFunction function
    
    // this function is activated when the user do the pull down refresh
    // it will refresh all the data obtaining any changes
    function doRefreshFunction()
    {
        
        // $http service in charge of retrieving all the text posts
        $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/posts/'+tokenDecoded.role_id ,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456'
            }
        }).success(function (data) {
            
            // content
            $scope.text_posts = data.message.posts;
                
        }).error(function (error) {
            
            // reload the current view
            $state.go($state.current, $stateParams, {reload: true, inherit: false});
            
        }).finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    }// end of doRefreshFunction function.

    // this funcion is in charge of going to the text post view
    // is activated when the user click the ( + post ) button
    function newPostGoFunction()
    {
        $state.go('entityTextPost');
    }

//    $http({
//        method: 'GET',
//        skipAuthorization: true,//es necesario enviar el token
//        url: 'https://hoyportibppr.com/api/entities/'+tokenDecoded.role_id,
//        headers: {
//            'Content-Type': 'application/x-www-form-urlencoded',
//            'Accept': 'application/x-www-form-urlencoded',
//            'X-API-KEY' : '123456'
//        }
//    }).success(function (data) {
//        $rootScope.entity = true;
//        $scope.info = data.message;
//    });

    // $http service in charge of retrieving all the text posts for a specific entity
    // $http service returns an array of objects
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/posts/'+tokenDecoded.role_id,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'
        }
    }).success(function (data) {
        $scope.text_posts = data.message.posts;
    }).error(function (error) {
        $scope.error = error.status;
    })
}
    
})();

//editEntityProfileCtrl
(function(){
    
    "use strict";

    function editentityProfileCtrlFunction($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$ionicPopup,$ionicLoading,$state,  multipartForm, $rootScope, eventData)
{
     // Token retrieval
    var tokenEncoded = store.get('token');
    // Function to decode token
    var tokenDecoded = jwtHelper.decodeToken(tokenEncoded);
    var ent = tokenDecoded;
    
      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
    
    // this function is triggered when the user clicks the cancel button
    // it will send the user back to the profile page
    $scope.cancelEdit = function()
    {
        $state.go('entityProfile')
    }
    
    // this is an object that contains all the variables that 
    // the user can change
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
  
    // this function is triggered when the user click the save button
    // in order to edit de profile
    $scope.UpdateData = function() {
        
    // this $http service is in charge overwriting the new data in the DB
    $http({
        url: 'https://hoyportibppr.com/api/entities/edit',
        method: 'POST', 
        data: $scope.data,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
            'TOKEN' : tokenEncoded 
        }// end of header
      }) 
         .success(function (data) {
        
        // if the $http service was successful and data was successfully updated it will go back to the main profile
        $state.go('entityProfile');
        
        // this is a popup notification to let the user know that everything was successful
        var alertPopup = $ionicPopup.alert({
                             title: "Profile information edited",
                             template: "Your profile information was successfuly edited!"
                         });
            })
         .error(function (data) {

                // here we will get backend response errors
        
                $scope.ResponseDetails = data.status;
        
                // backend response error for each field in the edit page
                $scope.errorMessage = data.message.ent_name;
                $scope.errorMessage0 = data.message.about;
                $scope.errorMessage1 = data.message.fax;
                $scope.errorMessage2 = data.message.phone;
                $scope.errorMessage3 = data.message.web;
                $scope.errorMessage4 = data.message.web_email;
                $scope.errorMessage5 = data.message.zip;
                $scope.errorMessage6 = data.message.address1;
                $scope.errorMessage7 = data.message.address2;
                $scope.errorMessage8 = data.message;
        
        
                // popup that is in charge of displaying all the errors from the backend
              if($scope.ResponseDetails === "failure"){ 
                   var alertPopup = $ionicPopup.alert({
                       title: 'Warning',
                       template: $scope.errorMessage || $scope.errorMessage1 || $scope.errorMessage2 || $scope.errorMessage3
                       || $scope.errorMessage4 || $scope.errorMessage5 ||  $scope.errorMessage6 ||  $scope.errorMessage7 || $scope.errorMessage8 ||  $scope.errorMessage0
                   });     
                }// end of if       
            });// end of .error 
        };// end of UpdateData function
    
    //This $http service gets the current data that will be displayed in the placeholder of the edit profile fields
     $http({
        method: 'GET',
        skipAuthorization: true,//it's necessary to send the token
        url: 'https://hoyportibppr.com/api/entities/'+tokenDecoded.role_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
                 
        // this is all the data that will be binded to the model of the placeholder fields, so the user can see its existing information
        $scope.data.entity.about=data.message.ent_about;
        $scope.data.entity.ent_name= "";
        $scope.data.entity.phone=data.message.ent_phone;
        $scope.data.entity.founded=data.message.ent_found;
        $scope.data.entity.web=data.message.ent_web;
        $scope.data.entity.country=data.message.country_name;
        $scope.data.entity.address1=data.message.ent_address1;
        $scope.data.entity.address2=data.message.ent_address2;
        $scope.data.entity.city= data.message.city_name;
        $scope.data.entity.zip=data.message.ent_zip;
        $scope.data.entity.fax= data.message.ent_fax;
        $scope.info = data.message;
         
         // image path in order to display the picture
         var img = data.message.ent_pic;
         
         // here we specify from what type of user we are getting the picture
         var type = "entity";
        
         // this $http service is in charge of retrieving the entity picture raw data in order to display it
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
             // variable containing the raw data of the image
             $scope.entity_picture = data;

             // if there is an error the page will reload
             if($scope.info === null){
                $state.go($state.current, $stateParams, {reload: true, inherit: false});
                    }
              })
         
        // in order to upload a picture, the following data need to be sended via parameters
        $scope.picData = {
            // the type of picture uploaded
        'submit' : $scope.submit = "entity",
        'userfile' : $scope.userfile // userfile contains the encoded data of the image
        }

   // uploadUrl variable is the direction where the picture is going to be uploaded
   var uploadUrl = 'https://hoyportibppr.com/api/entities/uploadpicture';
         
    // here AngularJS watches any changes in the data.userfile variable
    // when it detect a change, it will automatically upload the picture
    // and update the view
    $scope.$watch('data.userfile', function (img) {
    $scope.picData.userfile = img;
        
        // multipartForm is a service in charge of uploading the image
        multipartForm.post(uploadUrl, $scope.picData);
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

    "use strict";

    function editSupportersProfileCtrlFunction($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet, $ionicPopup,multipartForm,$ionicLoading,Upload,$state)
    {
        
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
        });// disable backbutton

        ////////////////////////////////////
        // TOKEN RETRIEVAL
        var tokenEncoded = store.get('token');// get the encoded token
        var tokenDecoded = jwtHelper.decodeToken(tokenEncoded);// decode the encoded token
        var sup = tokenDecoded;

        // this function is triggered by the cancel button, it will redirect the user to the profile page
        $scope.cancelEdit = function()
        {
            $state.go('supporterProfile')
        }

        // this function is invoked when the user click the save button in the edit profile html
        $scope.UpdateData = function() { 

        // this object was created in order to bind the existing data to the placeholder
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
                "city": $scope.info.message.city
            }
        };

            // loading, it is activated when the UpdateData function is invoked
             $ionicLoading.show({
                      template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                      duration: 300
                    });

            // this $http service is in charge of updating the profile by overwriting the current data in the database
              $http({
            url: 'https://hoyportibppr.com/api/supporters/edit',
            method: 'POST',
            data: JSON.stringify($scope.supporterObject),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456',
                'TOKEN' : tokenEncoded
            }
          }).success(function (data) {

                  // popup notifying the user that the profile is updated
                  $ionicPopup.alert({
                       title: 'Profile edit successful',
                       template: 'Your profile information was successfuly edited.'
                  });     

                  // after the user update its information it will be redirected to
                  $state.go('supporterProfile');

              }).error(function (data) {

                    // this variables contains the error reply from the backend
                    $scope.ResponseDetails = data.status;
                    $scope.errorMessage = data.message.fname;
                    $scope.errorMessage1 = data.message.lname;
                    $scope.errorMessage2 = data.message.phone;
                    $scope.errorMessage3 = data.message.age;
                    $scope.errorMessage4 = data.message.gender;
                    $scope.errorMessage5 = data.message.zip;
                    $scope.errorMessage6 = data.message;


                  // if an error is  detected from the backend the following if will be triggered
                  if($scope.ResponseDetails == "failure"){

                      //popup displaying errors from the backend
                       var alertPopup = $ionicPopup.alert({
                           title: 'Warning',
                           template: $scope.errorMessage || $scope.errorMessage1 || $scope.errorMessage2 || $scope.errorMessage3
                           || $scope.errorMessage4 || $scope.errorMessage5 || $scope.errorMessage6 
                       });     
                }       

                });
            };

        //Here we get all the data from a specific user 
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

           // this variabe contains all the data that is binded to the edit fields
           $scope.info = data;

            // this variable is to bind the existing data in the city selection field
           $scope.info.message.sup_age = Number($scope.info.message.sup_age);

            // this variable is to bind the existing data in the city selection field
           $scope.info.message.city = $scope.info.message.city_name;

            // image path in order to display the picture
            $scope.img = data.message.sup_pic;
            console.log($scope.img);
            // this $Http service is in charge of obtaining the raw data of the picture 
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

                // this variable is in charge to hold the raw data of the picture
                $scope.edit_profile_picture = data.message;

                // if there's an error the page will refresh
                if($scope.info == null){
                    $state.go($state.current, $stateParams, {reload: true, inherit: false});
                }
                    })
        })

        // this object variable contains the necessary data to upload a picture
        $scope.picture_data = {
            'submit' : $scope.submit = 1, // a number 1 need to be submited
            'userfile' : $scope.userfile // this variable hold the raw data of the picture
        }

        // this variable contains the location where the picture will be uploaded
        var uploadUrl = 'https://hoyportibppr.com/api/supporters/uploadpicture';

        // here AngularJS watches any changes in the data.userfile variable
        // when it detect a change, it will automatically upload the picture
        // and update the view
        $scope.$watch('picture_data.userfile', function (img) {
            console.log(img);
            $scope.picture_data.userfile = img;
            multipartForm.post(uploadUrl, $scope.picture_data);
        });

        // this is in charge of activating and deactivating the skills dropdown 
        $scope.showSkill = false;
        $scope.skillFunct = function() {
            $scope.showSkill = !$scope.showSkill;
        };

        // this is in charge of activating and deactivating the interests dropdown 
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
    "use strict";

    function EeventsCtrlFunction($scope, $rootScope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state, $ionicPopup,moment, eventData, Events,$cordovaFileOpener2,$sce,$window)
{
        //Variables
        var tokenEncoded = store.get('token');
        var tokenDecoded = jwtHelper.decodeToken(tokenEncoded);
        var ent = tokenDecoded;   
    
        $rootScope.entityAdmin = tokenDecoded;
    
/////////////////////////////////////////////////////////////////////////////
//EVENT REPORT FUNCTION
//
//        $scope.event_report = function(eventPost_id, $event){
//            
//            $event.stopPropagation(); // Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
//            
//            // $http service in charge of retrieving the pdf data of the generated reports
//            $http({
//                method: 'GET',
//                url: 'https://hoyportibppr.com/api/entities/event_report/'+eventPost_id,
//                headers: {
//                    'Content-Type': 'text/html',
//                    'Accept': 'application/x-www-form-urlencoded',
//                    'X-API-KEY' : '123456',
//                    'TOKEN': store.get('token')},
//                responseType: 'arraybuffer' 
//            })
//                .success(function (response) {
//                var file = new Blob([response], {type: 'application/pdf'});
//                var fileURL = URL.createObjectURL(file);
//                $window.open(fileURL, '_blank', 'location=no');
//            });
//        }; // end of event_report function
//////////////////////////////////////////////////////////////////////////////

        
            // we are using this $http service here in order to retrieve the file path of the picture
            $http({
                method: 'GET',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/' + $rootScope.entityAdmin.role_id,
                 headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
            })
            .success(function (data) {                
              
        // we send the image path via this http service in order to retrieve the raw data of the image to display it
         $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + data.message.ent_pic + "&type=" + "entity"),               
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
             // we are using $rootScope in order to display the image in the side menu
             $rootScope.entity_profile_picture = data; // contains picture raw data
              });
            });

    $scope.goToEventView = function(eventPost_id){
        
        // this $http service is in charge of of retrieving all the data of a identified event
        $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event/'+eventPost_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
                    
        // here we are using the service eventData 
        // from the service we are using the variable 'individualEventPost'
        // the purpose here is to trasfer all the data of the selected event to the 
        // event full view which is in charge of displaying all the data of the event
        eventData.individualEventPost =  data.message.event;
        
        // redirect the user to the view containing all the event information
        $state.go('eventFullView');
    });
};
    

    // this function is invoked when the user refresh the page with the pulldown refresh
    // this function is in charge of retrieving all the existing events
    $scope.doRefresh = function() {
        
    // this $http service returns an array of objects
    // each object contains an event information for a specific event
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/events/'+tokenDecoded.role_id ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        // this variable contains all the array of objects containing all the events
        $scope.event_data = data.message.events;
    })
    .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    
    };// end of doRefresh function
    
    
    // this function is invoked when the user click the creat event button
    function newPostFunction()
    {
        // redirect the user to the event creation view
        $state.go('postEvent');
    } // end of newPostFunction

    // this function is invoked when the user click the vertical more icon 
    // it will give the user two options, edit or delete the event post
    function alterPost(event, $index, $event)
    {
        $event.stopPropagation();// Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
            
        // this $http service is in charge of of retrieving all the data of a identified event
        $http({
            method: 'GET',
            url: 'https://hoyportibppr.com/api/entities/event/'+event.id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'
                     }
        }).success(function(data) {
                        
             // here we are using the service eventData 
            // from the service we are using the variable 'individualEventPost'
            // the purpose here is to trasfer all the data of the selected event to the 
            // edit event view which is in charge of displaying all the data of the event as placeholders
            eventData.individualEventPost = data.message.event;
        });
 
        // Show the action sheet
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
                        }
                },

                destructiveButtonClicked: function()
                {
                    // popup 
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Event post deletion',
                        template: "This post will be deleted and you won't be able to find it anymore. You can also edit this post, if you just want to change something."
                    });
                    
                    confirmPopup.then(function(res) {
                        if(res) {
                    
                    // this $http service is in charge of deleting a selected event post
                    $http({
                        method: 'DELETE',
                        skipAuthorization: true,//es necesario enviar el token
                        url: 'https://hoyportibppr.com/api/entities/event/'+ event.id,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/x-www-form-urlencoded',
                            'X-API-KEY' : '123456',
                            TOKEN: tokenEncoded
                        }
            }).success(function (data) {
                                
                        // the view will be reloaded after the selected event is deleted
                        $state.go($state.current, $stateParams, {reload: true, inherit: false});
                        
                        // popup
                        var alertPopup = $ionicPopup.alert({
                       title: 'Event post deleted',
                       template: 'Your event post was successfuly deleted.'
                        });
                                
                    }); // end of success
            } // end of if condition
                }); // end of confirmPopup
                } // end of destructiveButtonClicked
            });// end of $ionicActionSheet
    }// end of alterPost function

    //Function variables:
    $scope.newPost = newPostFunction;
    $scope.alterPost = alterPost;

    // this $http service returns an array of objects
    // each object contains an event information for a specific entity
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/events/'+tokenDecoded.role_id,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'
        }
    }).success(function (data) {
        $scope.event_data = data.message.events;
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
    "use strict";
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

    "use strict";

    function entitiesCtrlFunction($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$state, $ionicPopup,moment, $ionicActionSheet, eventData,editEventPost, $ionicPopover, $rootScope,entityProfiles) {

    // this $http service give us all the information about the logged in user
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

        // variable containing all the data about the user
        $scope.follow_verification = data.message;
        $rootScope.supporter_data = data.message;

        // this is to verify if the user isn't following any entity
        // this is done to prevent an empty array error 
        if($scope.follow_verification.followed_entities === null)
        {
            $scope.follow_verification.followed_entities = [];
        }
    });

     // the variable entity_profiles contains an array of objects of all the existing entity profiles for the selected category and is used to display it in the view as a list
        
    // it utilize the service entityProfiles with the service variable entList which  contains all the existing entity profiles and the containing data was transferred here from the categories controller invoking the entityProfiles service
      $scope.entity_profiles = entityProfiles.entList;
        
     // this function is invoked with a button click 
    // it takes as a parameter the id of the selected entity
      $scope.selectEnt = function(val) {

        // this $http service returns an object containing all the information about the entity
        $http({
          method: 'GET',
          skipAuthorization: true,//es necesario enviar el token
          url: 'https://hoyportibppr.com/api/entities/' + val,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        })
          .success(function (data) {
            
            // here we are using the service entityProfiles 
            // from the service we are using the variable 'individualEntity'
            // the purpose here is to trasfer all the data of the selected entity to the 
            // entityProfile view which is in charge of displaying all the data of entity
            entityProfiles.individualEntity = data.message;
            
            // this redirect the user to the entity profile view
            $state.go('entityProfiles');
          });
      }; // end of selectEnt function
        
    }// entitiesCtrlFunction function definition end.

    entitiesCtrlFunction.$inject = ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$state', '$ionicPopup','moment','$ionicActionSheet','eventData','editEventPost','$ionicPopover', '$rootScope','entityProfiles'];

    angular
        .module('app')
        .controller('entitiesCtrl', entitiesCtrlFunction);
})();

//entityTextPostCtrl
(function(){

    "use strict";

    angular
        .module('app')
        .controller('entityTextPostCtrl', entityTextPostCtrlFunction);

      entityTextPostCtrlFunction.$inject =
    ['$scope', '$stateParams', 'authFactory', '$state', 'jwtHelper', 'store','$rootScope', '$http', '$httpParamSerializerJQLike', 'moment', '$ionicPopup'];

     function entityTextPostCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment, $ionicPopup)
{
    // object variable
    $scope.data = {};
    
    $scope.postData = postDataFunction;

    //this function is triggered when the user click the
    function postDataFunction()
    {
        //this $http service is in charge of posting the entered data into the database
        $http({
            url: 'https://hoyportibppr.com/api/entities/post',
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.data),
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
        }).success(function (data) {
            
            // redirect the user to the textPostFeed
            $state.go("dashboard.textPostFeed");
            
            // popup
            $ionicPopup.alert(
                    {
                        title: 'Activity post creted!',
                        template: 'Your post was successfuly created.'
                    });
            
        }).error(function (data) {  
            
            // popup
             $ionicPopup.alert(
                    {
                        title: 'These post appears to be blank. Please write something to post.'
                    });
        });
    }
}
})();

//entityProfilesCtrl
(function(){

  "use strict";

angular
    .module('app')
    .controller('entityProfilesCtrl', entityProfilesCtrlFunction);

     function entityProfilesCtrlFunction($scope, $stateParams, CONFIG, jwtHelper, store,$rootScope,$ionicScrollDelegate,$ionicSlideBoxDelegate,$http,$window,$state,$ionicActionSheet,$ionicPopup,$httpParamSerializerJQLike,entityProfiles, eventData, volunteeringData)
  {
    // the variable info contains an object of all the data of the selected entity profile is used to display it in the view
    // it utilize the service entityProfiles with the service variable individualEntity which  contains the data of the selected entity profile and the containing data was transferred here from the entities controller invoking the entityProfiles service
      $scope.entity_information = entityProfiles.individualEntity;
      $scope.scrollToTheTopButton;
      $scope.postsQuantity = 0;
      $scope.following;
      
      // image path in order to display the picture
      var img = $scope.entity_information.ent_pic;
      
      // the reason of this if condition is to avoid a black screen glitch in the entity profile picture logos
      if(img !== null){
         // $http service is in charge of retrieving the entity profile picture
         $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + img + "&type=" + "entity"),               
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    // this variable contain the raw data of the image
                    $scope.entityPicture = data;
              });
      }// end of if condition
      
      // function is triggered when the user click the volunteering post card
      $scope.goToVoluntView = function(voluntPost_id){

        // $http service is in charge of retrieving all the data of the selected volunteering post
        $http({
          method: 'GET',
          url: 'https://hoyportibppr.com/api/entities/volunteering/'+voluntPost_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        }).success(function (data) {
            
             // here we are using the service volunteeringData 
            // from the service we are using the variable 'individualVoluntPost'
            // the purpose here is to trasfer all the data of the selected volunteering to the 
            // volunteering full view which is in charge of displaying all the data of the volunteering
            volunteeringData.individualVoluntPost = data.message;
            
            // redirect the user to guestVolunteeringFullView.html
            $state.go('discoverVolunteeringFullView');
          });
      };// end of goToVoluntView function
      
      // function is triggered when the user click the event post card
      $scope.goToEventView = function(eventPost_id){
          
        // $http service is in charge of retrieving all the data of an espefic event
        $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event/'+eventPost_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
       
        // here we are using the service eventData 
        // from the service we are using the variable 'individualEventPost'
        // the purpose here is to trasfer all the data of the selected event to the 
        // event full view which is in charge of displaying all the data of the event
        eventData.individualEventPost = data.message.event;
        
        // redirect the user to guestEventFullView.html
        $state.go('discoverEventFullView');
    });
    };// end of goToEventView function
      
      // this if condition verify if the user is signed in
      // if the user is sign in the follow button will dissapear 
      if($rootScope.supporter === true)
          {
        // here is to verify if the entity is followed or not
        $rootScope.supporter_data.followed_entities.forEach(function(element){
                if(element.ent_id === $scope.entity_information.ent_id)
              {
                  $scope.following = true;
              }
            });
          }
      
        $scope.scrollTop = function() {
          $ionicScrollDelegate.scrollTop();
        };//scroll to top

        // $http service returns an array of objects (every post), each object contain whether the data of an event, volunteering post or text post 
        $http({
          method: 'GET',
          skipAuthorization: true,//es necesario enviar el token
          url: 'https://hoyportibppr.com/api/entities/newsfeed/'+$scope.entity_information.ent_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        })
          .success(function (data) {
            
            $scope.posts = data.message;
            
            // this if else condition is in charge of showing and hiding the 
            // scroll to top button
            if(data.message.length > 1)
                {
                    $scope.scrollToTheTopButton = true;
                }
            else
                {
                    $scope.scrollToTheTopButton = false;
                }
          })
          .finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
          });

        // this function is invoked when the user refresh the page with the pulldown refresh
        // this function is in charge of retrieving all the existing posts
        $scope.doRefresh = function() {
            // $http service returns an array of objects (every post), each object contain whether the data of an event, volunteering post or text post 
          $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/newsfeed/'+ $scope.info.ent_id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/x-www-form-urlencoded',
              'X-API-KEY' : '123456'}
          })
            .success(function (data) {
                $scope.posts = data.message;
            })
            .finally(function() {
              // Stop the ion-refresher from spinning
              $scope.$broadcast('scroll.refreshComplete');
            });
        };

        // this function is triggered by the follow button click
        $scope.follow = function(e_id){
            // this contains an array object with all the entities that the user is following
            $rootScope.supporter_data.followed_entities.push({ent_id: e_id});
            // $http service in charge of storing the entity in the my entities database
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
                
                $scope.following = true;
                
                // popup
                 var alertPopup = $ionicPopup.alert({
                      title: 'You are now following '+ entityProfiles.individualEntity.ent_name + '!'
                      });
            });
        };

          // this function is triggered by the unfollow button click
          $scope.unfollow = function(ent_id){
            // $http service in charge of deleting the entity in the my entities database
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
                // popup
                var alertPopup = $ionicPopup.alert({
                      title: 'You have unfollowed '+ entityProfiles.individualEntity.ent_name
                      });                
            });
        };
  }
      entityProfilesCtrlFunction.$inject = ['$scope','$stateParams','CONFIG', 'jwtHelper', 'store','$rootScope',
      '$ionicScrollDelegate','$ionicSlideBoxDelegate','$http','$window','$state','$ionicActionSheet',
      '$ionicPopup','$httpParamSerializerJQLike','entityProfiles', 'eventData','volunteeringData'];
})();

//followedEntitiesCtrl
(function(){

  "use strict";

angular
    .module('app')
    .controller('followedEntitiesCtrl', followedEntitiesCtrl);

     function followedEntitiesCtrl($scope, $stateParams, CONFIG, jwtHelper, store,  $rootScope,$ionicScrollDelegate,$ionicSlideBoxDelegate,$http,$window,$state,$ionicActionSheet,$ionicPopup,$httpParamSerializerJQLike,entityProfiles,eventData,volunteeringData)
  {
    $scope.info = entityProfiles.individualEntity;

    $scope.scrollTop = function() {
      $ionicScrollDelegate.scrollTop();
    };//scroll to top
      
    // $http service returns an array of objects (every post), each object contain whether the data of an event, volunteering post or text post 
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
    
             // this if else condition is in charge of showing and hiding the 
            // scroll to top button
            if(data.message.length > 1)
                {
                    $scope.scrollToTheTopButton = true;
                }
            else
                {
                    $scope.scrollToTheTopButton = false;
                }
          
        
      })

    
      // we are using this $http service here in order to retrieve the file path of the picture
      $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/' +$scope.info.ent_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'}
      
      }).success(function (data) {
          
          $scope.info = data.message;
             
        var img = data.message.ent_pic;
       
                // the reason of this if condition is to avoid a black screen glitch in the entity profile picture logos
                if(img !== null){

         // $http service is in charge of retrieving the entity profile picture
         $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + img + "&type=" + "entity"),               
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
             
                    // this variable contain the raw data of the image
                    $scope.entity_profile_picture = data;
              });
                }
        });
                

    // this function is invoked when the user refresh the page with the pulldown refresh
        // this function is in charge of retrieving all the existing posts
    $scope.doRefresh = function() {

     // $http service returns an array of objects (every post), each object contain whether the data of an event, volunteering post or text post 
      $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/newsfeed/'+ $scope.info.ent_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'}
      })
        .success(function (data) {
          $scope.posts = data.message;
        })
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
    };
      
      // this function is triggered by the unfollow button click
      $scope.unfollow = function(ent_id){
          $rootScope.supporter_data.followed_entities = $rootScope.supporter_data.followed_entities.filter(function(element){
              if(element.ent_id !== ent_id || Number(element.ent_id) !== ent_id)
                  {
                      return element;
                  }
          });
          
        // $http service in charge of deleting the entity in the my entities database   
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
            
            // redirect the user to home.myEntities.html
            $state.go('home.myEntities');
            
            // popup
             var alertPopup = $ionicPopup.alert({
                  title: 'You have unfollowed '+ entityProfiles.individualEntity.ent_name
                  });
            
        });
    };
      
      // function is triggered when the user click the volunteering post card
      $scope.goToVoluntView = function(voluntPost_id){
        // $http service is in charge of retrieving all the data of the selected volunteering post
        $http({
          method: 'GET',
          url: 'https://hoyportibppr.com/api/entities/volunteering/'+voluntPost_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        }).success(function (data) {
            
             // here we are using the service volunteeringData 
            // from the service we are using the variable 'individualVoluntPost'
            // the purpose here is to trasfer all the data of the selected volunteering to the 
            // volunteering full view which is in charge of displaying all the data of the volunteering
            volunteeringData.individualVoluntPost = data.message;
            
            // redirect the user to guestVolunteeringFullView.html
            $state.go('discoverVolunteeringFullView');
          });
      };// end of goToVoluntView function
      
      // function is triggered when the user click the event post card
      $scope.goToEventView = function(eventPost_id){
          
        // $http service is in charge of retrieving the entity profile picture
        $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event/'+eventPost_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
       
        // here we are using the service volunteeringData 
        // from the service we are using the variable 'individualVoluntPost'
        // the purpose here is to trasfer all the data of the selected volunteering to the 
        // volunteering full view which is in charge of displaying all the data of the volunteering
        eventData.individualEventPost = data.message.event;
        
        // redirect the user to guestEventFullView.html
        $state.go('discoverEventFullView');
    });
    };// end of goToEventView function
      
  }
      followedEntitiesCtrl.$inject = ['$scope','$stateParams','CONFIG', 'jwtHelper','store','$rootScope','$ionicScrollDelegate','$ionicSlideBoxDelegate','$http','$window','$state','$ionicActionSheet','$ionicPopup','$httpParamSerializerJQLike','entityProfiles','eventData','volunteeringData'];

})();

//entityProfileCtrl
(function(){

    "use strict";

    angular
        .module('app')
        .controller('entityProfileCtrl', entityProfileCtrlFunction);

    entityProfileCtrlFunction.$inject = ['$scope','$stateParams','CONFIG', 'jwtHelper', 'store','$rootScope','$ionicScrollDelegate','$ionicSlideBoxDelegate','$http','$window','$state','$ionicActionSheet','$ionicPopup','$httpParamSerializerJQLike', 'eventData', 'volunteeringData'];

    function entityProfileCtrlFunction ($scope, $stateParams, CONFIG, jwtHelper, store,  $rootScope, $ionicScrollDelegate,$ionicSlideBoxDelegate,$http,$window,$state,$ionicActionSheet,$ionicPopup,$httpParamSerializerJQLike, eventData, volunteeringData)
{

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton

  // function is trigerred by a button click (pencil icon)
  $scope.editProfile = function() {
      
      // redirect the user to the editEntityProfile.html
    $state.go('editEntityProfile');
  };// edit profile button

  //obtenemos el token en localStorage
  //decodificamos para obtener los datos del user
  var tokenPayload = jwtHelper.decodeToken(store.get('token'));
  //los mandamos a la vista como user
  $rootScope.entityAdmin = tokenPayload;

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

            var img = data.message.ent_pic;
                
        // the reason of this if condition is to avoid a black screen glitch in the entity profile picture logos
       if(img !== null){
         // $http service is in charge of retrieving the entity profile picture
         $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + img + "&type=" + "entity"),               
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
             
                    // this vriable holds the raw data of the image
                    // we are using $rootScope to update the avatar picture in the side menu
                    $rootScope.entity_profile_picture = data;
             
                    // if there's an error the page will refresh
                         if($scope.info == null){
                $state.go($state.current, $stateParams, {reload: true, inherit: false});
            };             
              });
       };//end of if condition
});     
    
    }
})();

//entityRegistrationCtrl
(function(){

    "use strict";

    angular
        .module('app')
        .controller('entityRegistrationCtrl', entityRegistrationCtrlFunction);

     entityRegistrationCtrlFunction.$inject = ['$scope', '$http', '$stateParams','$httpParamSerializerJQLike','$state','$ionicPopup'];

     function entityRegistrationCtrlFunction($scope, $http, $stateParams, $httpParamSerializerJQLike, $state, $ionicPopup)
{
    // function is triggere with the cancel button click
    $scope.cancelEntityRegistrationButton = function()
        {
            // redirect the user to the role decision view
            $state.go('roleDecision')
        }

    // object representing all the fields in the registration of an entity
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

    
    // all of the followin "tip functions" are activated by an icon click new to the text entry field
    // when the function is activated it will release a popup prroviding a guide to the user
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

    // function declaration
    $scope.entitySubmitForm = entitySubmitFormFunction;

    // the following function is triggered with the submit button click
    function entitySubmitFormFunction() {

        // $http service in charge of storing the data and credentials of the created entity profile 
        $http({
            url: 'https://hoyportibppr.com/api/entities/register',
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.entityRegistrationObject),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456'
            }

        }).success(function (data, status, headers, config) {
                        
            $state.go('RegistrationSuccessful');
              //Go to the state of registration confirmation page of information and not login

        }).error(function (data) {
    
                // here we are storing all the errors received from the backend
                $scope.ResponseDetails = data.status;
                $scope.errorMessage = data.message.username;
                $scope.errorMessage1 = data.message.fname;
                $scope.errorMessage2 = data.message.lname;
                $scope.errorMessage3 = data.message.email;
                $scope.errorMessage4 = data.message.gender;
                $scope.errorMessage5 = data.message.password;
                $scope.errorMessage6 = data.message.passconf;
                $scope.errorMessage7 = data.message.emailconf;

    // when the backend respond with a failure message
    // the front end will demonstrate all the errors to the user
    if($scope.ResponseDetails == "failure")
    { 
        // popup showing the triggered errors
       var alertPopup = $ionicPopup.alert(
           {
           title: 'Error Description',
           template: $scope.errorMessage || $scope.errorMessage1 || $scope.errorMessage2 || $scope.errorMessage3 || $scope.errorMessage4 || $scope.errorMessage5 || $scope.errorMessage6 || $scope.errorMessage7 || 'There was an error creating the account. Either the password or email confirmation fields does not match.'
            }
        );     
    } 
            

// With this code all the errors can be implemented at the same time
//            $scope.messages = data.message;
//            $scope.errorMessages = [];
//
//              for(var m in data.message)
//                  {
//                      $scope.errorMessages.push(data.message[m]+"<br><br>");
//                  }
//
//            var alertPopup = $ionicPopup.alert({
//                  title: 'Please fix the following errors',
//                  template: $scope.errorMessages.toString()
//              });

          });
        }// end of entitySubmitFormFunction
}

})();

//EvolunteeringCtrl
(function(){

    "use strict";

    angular
        .module('app')
        .controller('EvolunteeringCtrl', EvolunteeringCtrlFunction);

    EvolunteeringCtrlFunction.$inject =['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$state', '$ionicPopup','moment', 'volunteeringData'];

    function EvolunteeringCtrlFunction($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state, $ionicPopup,moment, volunteeringData)
    {
        
      var tokenEncoded = store.get('token');
      var tokenDecoded = jwtHelper.decodeToken(tokenEncoded);
      var ent = tokenDecoded;
        
           $scope.alterPost = function(val,  $event) {
               
          $event.stopPropagation();// Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
         
         // this function is triggered, it will open
        // an action sheet with the existing text post
        // the user has three options edit, delete or cancel
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

    // this $http service returns an object containing all the information about the selected volunteering
    $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/volunteering/'+val,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        
        // here we are using the service volunteeringData 
        // from the service we are using the function 'setVoluntPost'
        // the purpose here is to trasfer all the data of the selected volunteering post to the 
        // edit volunteering view 
        volunteeringData.setVoluntPost(data.message);
        
            //redirect the user to the editVolunteering.html
            $state.go('editVolunteering');
        })
     },
        
    destructiveButtonClicked: function() {
                       
        // popup
     var confirmPopup = $ionicPopup.confirm({
         title: 'Volunteering post deletion',
         template: "This post will be deleted and you won't be able to find it anymore. You can also edit this post, if you just want to change something."
     });
     
     confirmPopup.then(function(res) {
         
         if(res) {
             
      // $http service that is in charge of deleting the selected text volunteering post
      $http({
        method: 'DELETE',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/delete_volunteering/'+ val,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456',
                  TOKEN: tokenEncoded}
    }).success(function (data) {
          
        // the view will be reloaded after the selected volunteering post is deleted
        $state.go($state.current, $stateParams, {reload: true, inherit: false});

    // popup
    $ionicPopup.alert({
     title: 'Volunteering post deleted',
     template: 'The volunteering post was successfuly deleted.'
   });
        
      });//end of success
     } //end of condition
   });//end of confirmPopup
    }//end of destructiveButtonClicked
   });// end of $ionicActionSheet
  };// alterPost end of alterPost function
        
    // this function is invoked when the user click the creat event button
      $scope.newPost = function() {
        // redirect the user to the volunteering creation view
        $state.go('postVolunt');
      };

        // this function is invoked when the user refresh the page with the pulldown refresh
        // this function is in charge of retrieving all the existing volunteering posts
        $scope.doRefresh = function() {
            
        // this $http service returns an array of objects
        // each object contains an event information for a specific volunteering
             $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/volunteerings/'+tokenDecoded.role_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        // this variable contains all the array of objects containing all the volunteerings
        $scope.volunteering_data = data.message;
    }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
            
        };

        // this $http service returns an array of objects
       // each object contains an volunteering information for a specific entity
      $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/volunteerings/'+tokenDecoded.role_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456'}
      })
        .success(function (data) {
          
           // here we are using the service volunteeringData 
            // from the service we are using the variable 'individualVoluntPost'
            // the purpose here is to trasfer all the data of the selected volunteering to the 
            // volunteering full view which is in charge of displaying all the data of the volunteering
          $scope.volunteering_data = data.message;
        }).error(function (error) {
       $scope.error = error.status;
        });

    // function is triggered when the user click the volunteering post card
      $scope.goToVoluntView = function(voluntPost_id){
          
    // $http service is in charge of retrieving all the data of an espefic volunteering post
        $http({
          method: 'GET',
          url: 'https://hoyportibppr.com/api/entities/volunteering/'+voluntPost_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        })
          .success(function (data) {
            
            $scope.posts = data.message;
            
            // here we are using the service volunteeringData 
            // from the service we are using the variable 'individualVoluntPost'
            // the purpose here is to trasfer all the data of the selected volunteering to the 
            // volunteering full view which is in charge of displaying all the data of the volunteering
            volunteeringData.individualVoluntPost = $scope.posts;
            
            // redirect the user to volunteeringFullView.html
            $state.go('volunteeringFullView');
          });
      };//end of goToVoluntView function
    }
})();

//forgotPasswordCtrl
(function(){

    "use strict";

    angular
        .module('app')
        .controller('forgotPasswordCtrl', forgotPasswordCtrlFunction);

    function forgotPasswordCtrlFunction($scope, $stateParams, authFactory,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,$state,$ionicPopup)
{
    //Variable declarations:
    $scope.data = {};

    // function triggered by the cancel button click
    $scope.cancelForgotPasswordButton = function()
    {
        // redirect the user to the login view
        $state.go('login');
    }
    
    // button triggered by the "help" button click
    $scope.showHelpForgotPassword = function ()
    {
        // popup
        var alertPopup = $ionicPopup.alert(
                    {
                        title: 'Password recovery help',
                        template:'Please enter a valid email and an email with the instructions to recover your password will be available.'
                    });
    }
    
    // function triggered by clicking the recover password button
    function submitForgotPasswordFormFunction()
    {
        // $http service used for requesting a change of password
        $http({
            url: 'https://hoyportibppr.com/api/auth/forgotpass',
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.data),//
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456'
            }

        }).success(function (data) {
            
            if(data.status !== "error")
            {
                // popup
                var alertPopup = $ionicPopup.alert(
                    {
                        title: 'Email sent!'
                    });
                
                // redirect userto the emailSent view
                $state.go('emailSent');
            }
            
        }).error(function (data) {

            $scope.errorMessage = data.message;

            if(data.status == "error")
            {
                // popup
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

    "use strict";

    angular
        .module('app')
        .controller('loginCtrl', loginCtrlFunction);

    loginCtrlFunction.$inject = ['$scope', '$stateParams', '$ionicModal', '$ionicPopover', '$timeout','$state','$ionicPopup','$rootScope', 'CONFIG','authFactory', 'jwtHelper', 'store','$ionicLoading', '$window'];

    function loginCtrlFunction($scope, $stateParams, $ionicModal, $ionicPopover, $timeout, $state, $ionicPopup, $rootScope, CONFIG, authFactory, jwtHelper, store,$ionicLoading, $window)
{
       
    //variable declarations and flags
    // default flags that are in charge of hiding and showing options depending on the login status
    
    // when not loggedin the authentication is set to false
    $rootScope.isAuthenticated = false;

    // when not logged in as entity admin this flag deactivates all the entity buttons
    $rootScope.entity = false;
    
    // when not loggedin the login button will show up
    $rootScope.login = true;
    
    // when not logged in the signin button will show up
    $rootScope.signin = true;
    
    // when not logged in as supporter this flag deactivates all the supporter buttons
    $rootScope.supporter = false;
    
    // object for sign in fields
    $scope.user = { username:"", password:""};
    
    // flag used to disable sign in button 
    $scope.buttonEnabled = true;
    
    //
    $rootScope.disableFollowButton = true;
    
    if(store.get('token') != null){
    
    ////////////////////////////////////
    //    TOKEN RETRIEVAL
    var tokenEncoded = store.get('token');// get the encoded token
    var tokenDecoded = jwtHelper.decodeToken(tokenEncoded);// decode the encoded token
                    console.log(tokenEncoded);
    
    if(tokenDecoded.role == 'supporter'){
        
        $rootScope.isAuthenticated = true;
        $state.go('home.discover');
        
        // when not logged in as supporter this flag activates all the supporter buttons
        $rootScope.supporter = !$rootScope.supporter;
        
        // when logged in the login button will hide
        $rootScope.login = !$rootScope.login;
        
        // when logged in the signin button will hide
        $rootScope.signin = !$rootScope.signin;
        
    }  else if (tokenDecoded.role == 'entity') {
        
        $rootScope.isAuthenticated = true;
        $state.go('dashboard.Eevents');
        
        // when not logged in as supporter this flag activates all the entity admin buttons
        $rootScope.entity = !$rootScope.entity;
        
        // when logged in the login button will hide
        $rootScope.login = !$rootScope.login;
    
        // when logged in the signin button will hide
        $rootScope.signin = !$rootScope.signin;
        
        // when logged in as supporter this flag activates all the supporter buttons
        $rootScope.disableFollowButton = !$rootScope.disableFollowButton;
      }
    }
        
        if(!window.location.hash) {
       window.location = window.location + '#loaded';
       window.location.reload();
     }

    // function is triggered when the user click the log in button click
    function loginFunction(user)
    {
        
        // the following variable and $timeout service is in charge of disabling the login button for one second to avoid multiple clicks 
        $scope.buttonEnabled = false;
         $timeout(function() {
            $scope.buttonEnabled = true;
         }, 1000);
        
        // here we are using the factory authFactory 
        // from the factory we are using the function 'login'
        /*        
        A login form to login.
        Once logged in if the credentials are correct we will create a token with JWT.
        The token will be returned to the client (angularjs) and using the angular-jwt module we will be able to decode its payload.
        Once in the client and using the angular-storage module we will store in localStorage the token provided by the server to send it in future requests.
        Through the provider jwtInterceptorProvider we will automatically have our token sent to each request through the headers with a name and a prefix to capture it on the server, we can do this dynamically as we will see later.
        Thanks to the run method and the $ routeChangeStart event we can check if our token has expired, and if so, we will send the user out of the application.
        Once the user is inside the application we will have a button to make a request to the server, pick the token there, check if the user exists.
        */
        authFactory.login(user).then(function(res) {

            // spinner/loading
            $ionicLoading.show(
                {
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 100
                });

            var encodedToken = res.data.response.token;
            var tokenPayload = jwtHelper.decodeToken(encodedToken);

            // from the decoded token we verify what is the role of user
            // in this if condition the role of the user is verified and depending
            // of what role the user is, it will activate and deactivate some flags
            if(tokenPayload.role === 'entity')
            {
                store.set('token', res.data.response.token);
                
                //redirect the user to dashboard.Eevents.html
                $state.go('dashboard.Eevents');
                
                // if the user has an entity admin role the following flags will be set
                $rootScope.isAuthenticated = true;
                
                // this flag activate all the entity buttons
                $rootScope.entity = !$rootScope.entity;
                
                // this flag hide the login option
                $rootScope.login = !$rootScope.login;
                
                // this flag hide the sign in option
                $rootScope.signin = !$rootScope.signin;
                
                $rootScope.disableFollowButton = !$rootScope.disableFollowButton;  
            }
            
            else if (tokenPayload.role === 'supporter')
            {    
                store.set('token', res.data.response.token);
                
                // redirect the user to home.discover.html
                $state.go('home.discover');
                
                // if the user has an supporter role the following flags will be set
                $rootScope.isAuthenticated = true;
                
                // this flag activate all the supporter buttons
                $rootScope.supporter = !$rootScope.supporter;
                
                // this flag hide the login option
                $rootScope.login = !$rootScope.login;
        
                // this flag hide the sign in option
                $rootScope.signin = !$rootScope.signin;
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

    "use strict";

    angular
        .module('app')
        .controller('postEventCtrl', postEventCtrlFunction);

    postEventCtrlFunction.$inject = ['$scope', '$stateParams', 'authFactory', '$state', 'jwtHelper', 'store', '$rootScope', '$http', '$httpParamSerializerJQLike', 'moment', '$cordovaDatePicker', '$ionicPopup', 'multipartForm'];

    function postEventCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,$cordovaDatePicker,$ionicPopup, multipartForm)
{
    //Variables:
    var tokenEncoded = store.get('token');
    var tokenDecoded = jwtHelper.decodeToken(tokenEncoded);
    var ent = tokenDecoded;
    
    // funtion triggered by the cancel button click
    $scope.cancelEdit = function()
      {
          // redirect the user to the dashboard.Eevent.html
          $state.go('dashboard.Eevents');
      }
    
    // variable decalration for the event input fields
    $scope.data = {};
    
    // function declaration
    $scope.postEvent = postEventFunction;

          $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton

    //Function declarations:
    function postEventFunction()
    {
        //this $http service is in charge of posting the entered event data into the database
        $http({
            url: 'https://hoyportibppr.com/api/entities/newevent',
            method: 'POST',
            data: JSON.stringify({event: $scope.data}),
            headers:
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : tokenEncoded
            }

        }).success(function (data, status, headers, config) {
            
            $scope.PostDataResponse = data;
          
            // in order to upload a picture, the following data need to be sended via parameters
            $scope.picData = {
                // here an integer 1 need to be submitted
                'submit' : $scope.submit = 1,
                // this is where the raw data of the picture taked will be stored
                'userfile' : $scope.userfile
            };
            
            // uploadUrl variable is the direction where the picture is going to be uploaded
            var uploadUrl = 'https://hoyportibppr.com/api/entities/event_uploadpicture/'+$scope.PostDataResponse.message.event_id;
    
            // here AngularJS watches any changes in the data.userfile variable
            // when it detect a change, it will automatically upload the picture
            // and update the view
            $scope.$watch('data.userfile', function (img) {
                $scope.picData.userfile = img;
                multipartForm.post(uploadUrl, $scope.picData);
            }); 
            
             // popup
              $ionicPopup.alert(
                    {
                        title: 'Event post creation',
                        template: 'Your event post was successfuly created!'
                    });
            
            //redirect the user to dashboard.Eevents.html
            $state.go('dashboard.Eevents');

        }).error(function (data, status, header, config) {
            
            // this variables contains the error reply from the backend
            $scope.titleError = data.message.title;
            $scope.webError = data.message.web;
            $scope.descriptionError = data.message.description;
            $scope.start_timeError = data.message.start_time;
            $scope.end_timeError = data.message.end_time;
            $scope.addressError = data.message.address;
            $scope.cityError = data.message.city;
            $scope.end_zipError = data.message.zip;
            $scope.supervisor_nameError = data.message.supervisor_name;
            $scope.supervisor_phoneError = data.message.supervisor_phone;
            $scope.supervisor_emailError = data.message.supervisor_email;
        
                      //popup displaying errors from the backend
                 $ionicPopup.alert(
                    {
                        title: 'Error Description',
                        template: $scope.titleError || $scope.descriptionError || $scope.start_timeError || $scope.end_timeError || $scope.addressError || $scope.cityError || 
                $scope.end_zipError || $scope.supervisor_nameError || $scope.supervisor_phoneError || $scope.supervisor_emailError ||  $scope.webError || 'There was an error creating the event. Please check the required fields and try again.'
                    });
        });
    }
}
})();

//postVoluntCtrl
(function(){

    "use strict";

    angular
        .module('app')
        .controller('postVoluntCtrl', postVoluntCtrlFunction);

    postVoluntCtrlFunction.$inject = ['$scope', '$stateParams','authFactory', '$state', 'jwtHelper', 'store', '$rootScope', '$http', '$ionicPopup', 'multipartForm'];

    function postVoluntCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http,$ionicPopup, multipartForm)
    {
              $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
    
        // funtion triggered by the cancel button click
        $scope.cancelEdit = function()
        {
          $state.go('dashboard.Evolunteering');
        }

        // object where the raw data of the taked image will be stored
        $scope.data = {};
    
        // this is in charge of activating and deactivating the skills dropdown 
        $scope.showVolunteeringSkills = false;
        $scope.volunteeringShowSkills = function ()
        {
            $scope.showVolunteeringSkills = !$scope.showVolunteeringSkills;
        };
        
        // $http service in charge of getting the existing skills in the database 
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
            });// end of for each
        });

        // this object contains the json form for the create volunteering entry fields
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

    // when the function is activated it will release a popup prroviding a guide to the user
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

        //this $http service is in charge of posting the entered volunteering data into the database
        $http({
            url: 'https://hoyportibppr.com/api/entities/create_volunteering',
            method: 'POST',
            data: JSON.stringify($scope.volunteeringPostObject),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY' : '123456',
                'TOKEN' : store.get('token')
            }
      }).success(function (data, status, headers, config) {
            $scope.PostDataResponse = data.message.vol_id;

        // in order to upload a picture, the following data need to be sended via parameters
         $scope.picData = {
                // here an integer 1 need to be submitted
                'submit' : $scope.submit = 1,
                // this is where the raw data of the picture taked will be stored
                'userfile' : $scope.userfile
            }
    
            // uploadUrl variable is the direction where the picture is going to be uploaded
            var uploadUrl = 'https://hoyportibppr.com/api/entities/volunteering_job_uploadpicture/'+$scope.PostDataResponse;
            
        // here AngularJS watches any changes in the data.userfile variable
        // when it detect a change, it will automatically upload the picture
        // and update the view
          $scope.$watch('data.userfile', function (img) {
                $scope.picData.userfile = img;
                multipartForm.post(uploadUrl, $scope.picData);
            }); 
        
       // popup
        var alertPopup = $ionicPopup.alert({
           title: 'Volunteering posting successful',
           template: 'Your post was successfully posted!'
        });
        
        //redirect the user to dashboard.Evolunteering.html
        $state.go('dashboard.Evolunteering');
            })
            .error(function (data, status, header, config) {
            
            // this variables contains the error reply from the backend
            $scope.titleError = data.message.title;
            $scope.descriptionError = data.message.description;
            $scope.start_timeError = data.message.start_time;
            $scope.end_timeError = data.message.end_time;
            $scope.addressError = data.message.address1;
            $scope.address2Error = data.message.address1;
            $scope.cityError = data.message.city;
            $scope.end_zipError = data.message.zip;
            $scope.supervisor_nameError = data.message.supervisor_name;
            $scope.supervisor_phoneError = data.message.supervisor_phone;
            $scope.supervisor_emailError = data.message.supervisor_email;
            $scope.volunteersQuantityError = data.message.num_of_ppl;
            $scope.volunteersWorkHours = data.message.work_hours;
            $scope.location_descriptionError = data.message.location_description;
            $scope.app_procedureError = data.message.app_procedure;
            $scope.webError = data.message.app_procedure;



                //popup displaying errors from the backend
                 $ionicPopup.alert(
                    {
                        title: 'Error Description',
                        template: $scope.titleError || $scope.descriptionError || $scope.start_timeError || $scope.end_timeError || $scope.addressError || $scope.cityError || 
                $scope.end_zipError || $scope.supervisor_nameError || $scope.supervisor_phoneError || $scope.supervisor_emailError || $scope.volunteersQuantityError || $scope.volunteersWorkHours || $scope.location_descriptionError || $scope.address2Error || app_procedureError || $scope.webError || 'There was an error creating the event. Please check the required fields and try again.'
                    });
            });
        };

    $scope.tip1 = tip1Function;
    $scope.tip2 = tip2Function;
    $scope.tip3 = tip3Function;
    $scope.tip4 = tip4Function;
}

})();

//supporterProfileCtrlFunction:
(function(){

    "use strict";

    angular
        .module('app')
        .controller('supporterProfileCtrl', supporterProfileCtrlFunction);

    supporterProfileCtrlFunction.$inject =  ['$scope','$stateParams','CONFIG', 'jwtHelper', 'store','$rootScope','$http','$window','$state','$httpParamSerializerJQLike'];

    function supporterProfileCtrlFunction($scope, $stateParams, CONFIG, jwtHelper, store,  $rootScope,$http,$window,$state,$httpParamSerializerJQLike) {
    //Local function variables:
    //-------------------------
    //obtenemos el token en localStorage
    var token = store.get('token');
    //decodificamos para obtener los datos del user
    var tokenPayload = jwtHelper.decodeToken(token);
    //los mandamos a la vista como user
    $rootScope.supporter_token = tokenPayload;
    // default interests and skills flags
    $scope.showInterests = false;
    $scope.showSkills = false;

    // this is in charge of activating and deactivating the interests dropdown 
    $scope.showInterestsFunction = function()
    {
        $scope.showInterests = !$scope.showInterests;  
    };

    // this is in charge of activating and deactivating the skills dropdown 
    $scope.showSkillsFunction = function()
    {
        $scope.showSkills = !$scope.showSkills;
    };
        
    //Function definitions:
    function beforeEnterFunction(event, viewData)
    {
        viewData.enableBack = false;
    }
        
    // function is triggered by phone button click
    function callFunction()
    {
        // open native phone dialer
         $window.open('tel:' + $scope.info.sup_phone, '_system');
    }
        
      // function triggered by (icon (edit) pencil) button click
    function editProfileGoFunction()
    {
        // redirect the user to editSupportersProfile.html
        $state.go('editSupportersProfile');
    }
        
    // function is triggered by email button click
    function mailFunction()
    {
        // open native mail application in the phone
        $window.open('mailto:' + $scope.info.email, '_system');
    }

        
    // this function is invoked when the user refresh the page with the pulldown refresh
    // this function is in charge of retrieving all the data of the signed in supporter profile
     function doRefreshFunction()
    {
        // $http service returns all the data of the signed in supporter
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
    //Function variables:
    $scope.call = callFunction;
    $scope.doRefresh = doRefreshFunction;
    $scope.editProfile = editProfileGoFunction;
    $scope.mail = mailFunction;

    //The view is about to enter and become the active view.
    $scope.$on('$ionicView.beforeEnter', beforeEnterFunction);

    // here we obtain all the data of the signed in supporter
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
        
        // this binded to the supporter profile view
        $rootScope.supporter_data = data.message;
        
        // verify the followed entities
            if(data.message.followed_entities === null)
                {
                    $scope.info.followed_entities = [];
                }
       
         // image path in order to display the picture
        $scope.img = data.message.sup_pic;

        // this $http service is in charge of retrieving the entity picture raw data in order to display it
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
            $rootScope.supporter_profile_picture = data.message;
        });
    });
}// supporterProfileCtrlFunction function end.
})();

//roleDecisionCtrl
(function(){
    "use strict";

    angular
        .module('app')
        .controller('roleDecisionCtrl', roleDecisionCtrlFunction);

    roleDecisionCtrlFunction.$inject = ['$scope', '$stateParams','$http', '$rootScope'];

    function roleDecisionCtrlFunction($scope, $stateParams, $http, $rootScope)
    {
       //Empty function controllers. 
    }
})();

//settingsCtrl
(function(){

    "use strict";

    angular
        .module('app')
        .controller('settingsCtrl', settingsCtrlFunction);

    settingsCtrlFunction.$inject =
    ['$scope', '$stateParams', 'authFactory', '$state', 'jwtHelper', 'store', '$rootScope', '$http', '$ionicActionSheet', '$window'];

    function settingsCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $ionicActionSheet,$window)
    {
        //Empty function controllers. 
    }
})();

//supporter Registration controller:
(function(){

    "use strict";

    angular
        .module('app.controllers', ['ngFileUpload',])
        .controller('supporterRegistrationCtrl',  supporterRegistrationCtrlFunction);

    supporterRegistrationCtrlFunction.$inject = ['$scope', '$http', '$stateParams', '$httpParamSerializerJQLike', '$state', '$ionicModal', '$ionicPopover', '$ionicPopup', '$timeout'];

    //Error on the $http service. Line 74? JSON PARSE function...
    function supporterRegistrationCtrlFunction($scope, $http, $stateParams, $httpParamSerializerJQLike,$state, $ionicModal, $ionicPopover, $ionicPopup, $timeout)
    {
        // function is triggere with the cancel button click
        $scope.cancelSupporterRegistrationButton = function()
        {
            // redirect the user to the role decision view
            $state.go('roleDecision')
        }
        
        // object that represents all the fields in the registration of a supporter
         $scope.data ={};

        // all of the followin "tip functions" are activated by an icon click new to the text entry field
        // when the function is activated it will release a popup prroviding a guide to the user
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

        function supporterSubmitFormFunction()
        {
                // $http service in charge of storing the data and credentials of the created supporter profile 
            $http({
                url: 'https://hoyportibppr.com/api/supporters/register',
                method: 'POST',
                data: $httpParamSerializerJQLike($scope.data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-API-KEY' : '123456'
                }
            }).success(function () {

                $state.go('RegistrationSuccessful');
                //Go to the state of registration confirmation page of information and not login

            }).error(function (data) {

                // here we are storing all the errors received from the backend
                $scope.errorMessage = data.message.username;
                $scope.errorMessage1 = data.message.fname;
                $scope.errorMessage2 = data.message.lname;
                $scope.errorMessage3 = data.message.email;
                $scope.errorMessage4 = data.message.gender;
                $scope.errorMessage5 = data.message.password;
                $scope.errorMessage6 = data.message.passconf;
                $scope.errorMessage7 = data.message.emailconf;

                // when the backend respond with a failure message
                // the front end will demonstrate all the errors to the user
                if($scope.ResponseDetails == "failure")
                {
                    // popup showing the triggered errors
                    var alertPopup = $ionicPopup.alert(
                        {
                            title: 'Error Description',
                            template: $scope.errorMessage || $scope.errorMessage1 || $scope.errorMessage2 || $scope.errorMessage3 || $scope.errorMessage4 || $scope.errorMessage5 || $scope.errorMessage6 || $scope.errorMessage7
                        }
                    );
                }
            });
        }
        // function declaration
        $scope.supporterUsernameTip = tip1Function;
        $scope.supporterEmailTip = tip4Function;
        $scope.supporterPasswordTip = tip7Function;
        $scope.supporterSubmitForm = supporterSubmitFormFunction;
    } //supporterRegistrationCtrlFunction end.

})();

//introCtrl
(function(){

    "use strict";

    angular
        .module('app')
        .controller('introCtrl', introCtrlFunction);

function introCtrlFunction($scope, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, $rootScope)
    {
        //Empty function controllers. 
    }

    introCtrlFunction.$inject =
      ['$scope', '$ionicSlideBoxDelegate', '$ionicSideMenuDelegate', '$rootScope'];

})();

//eventFullViewCtrl
(function(){

  "use strict";

  angular.module('app').controller('eventFullViewCtrl', eventFullViewCtrlFunction);

  function eventFullViewCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment, eventData, $timeout, Events)
  {   
       $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
      

       // the variable event contains an object of all the data of the selected event
       // it utilize the service eventData with the service variable individualEventPost which  contains the data of the selected event and the containing data was transferred here from the entity event selection controller invoking the eventData service
      $scope.event = eventData.individualEventPost;
      
      // here we specify from what type of picture we are getting
         var type = "event";
      
        // we send the image path via this http service in order to retrieve the raw data of the image to display it
               $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + eventData.individualEventPost.photo + "&type=" + type),                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.event_photo = data;
              }).error(function(data) {
                   $scope.photoExists = false;
               });
      
      // function is triggered by the add to calendar button click
      $scope.addToCalendar = function (event)
      {
          // invokes Event service with the function add // the service use the cordova calendar plugin
          // the vairable post coontains the data that will be stored in the native calendar of the phone
          Events.add($scope.post);
      };
      
      // function triggered by (icon (edit) pencil) button click
      $scope.goToEdit = function()
      {
          // redirect user to editEvent.html
          $state.go('editEvent');
      };
  
  }

  eventFullViewCtrlFunction.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','eventData', '$timeout', 'Events'];

})();

//volunteeringFullViewCtrl
(function(){

  "use strict";
  angular
    .module('app')
    .controller('volunteeringFullViewCtrl', volunteeringFullViewCtrl);

  volunteeringFullViewCtrl.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','volunteeringData', 'Events'];

  function volunteeringFullViewCtrl($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,volunteeringData, Events)
{
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
    
    // the variable volunteering contains an object of all the data of the selected volunteering
       // it utilize the service volunteeringData with the service variable individualVoluntPost which  contains the data of the selected volunteering and the containing data was transferred here from the entity volunteering selection controller invoking the volunteeringData service
      $scope.volunteering = volunteeringData.individualVoluntPost;
    
     // here we specify from what type of picture we are getting
         var type = "post";

            // we send the image path via this http service in order to retrieve the raw data of the image to display it
               $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + volunteeringData.individualVoluntPost.photo + "&type=" + type),                
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
    
     $scope.goToEdit = function()
      {
         volunteeringData.setVoluntPost($scope.volunteering);
         $state.go('editVolunteering');
      };
                
        // function is triggered by the add to calendar button click
      $scope.addToCalendar = function (volunteering)
      {
          // invokes Event service with the function add // the service use the cordova calendar plugin
          // the vairable post coontains the data that will be stored in the native calendar of the phone
          Events.add($scope.post);
      };
}
})();

//publicAboutCtrl
(function(){
  "use strict";

  function publicAboutCtrlFunction($scope, $stateParams, CONFIG, jwtHelper, store,  $rootScope, $ionicScrollDelegate,$ionicSlideBoxDelegate,$http,$window,$state,$cordovaGeolocation,entityProfiles)
  {
      
      
      // the variable info contains an object of all the data of the selected entity profile is used to display it in the view
    // it utilize the service entityProfiles with the service variable individualEntity which  contains the data of the selected entity profile and the containing data was transferred here from the entities controller invoking the entityProfiles service
      $scope.entity_information = entityProfiles.individualEntity;        
      // image path in order to display the picture
      var img =  entityProfiles.individualEntity.ent_pic;
           
      // here we specify from what type of user we are getting the picture
      var type = "entity";
      
      // the reason of this if condition is to avoid a black screen glitch in the entity profile picture logos
      if(img !== null){
      
      // we send the image path via this http service in order to retrieve the raw data of the image to display it
      $http({
            method: 'POST',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/displaypic/',
            data: ("img=" + img + "&type=" + type),               
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                       'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
            })
            .success(function (data) {
                $scope.entityPicture = data;
          });
        };// end of if condition
      
      
      
      // google maps settings

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
      });

          // function is triggered by phone button click
      $scope.call = function () {
            // redirect the user to editSupportersProfile.html
        $window.open('tel:' + $scope.info.sup_phone, '_system');
      };

          // function is triggered by email button click
      $scope.mail = function () {
        // open native mail application in the phone
        $window.open('mailto:' + $scope.info.email, '_system');
      };
      
  }

  angular.module('app').controller('publicAboutCtrl', publicAboutCtrlFunction);

  publicAboutCtrlFunction.$inject = ['$scope','$stateParams','CONFIG', 'jwtHelper', 'store','$rootScope','$ionicScrollDelegate','$ionicSlideBoxDelegate','$http','$window','$state','$cordovaGeolocation','entityProfiles'];

})();

//editEventCtrl
(function() {
  "use strict";

  angular
  .module('app')
  .controller('editEventCtrl', editEventCtrlFunction);

  editEventCtrlFunction.$inject =
  ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','editEventPost','eventData', '$ionicPopup', '$log', 'multipartForm'];

  function editEventCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,editEventPost, eventData, $ionicPopup, $log, multipartForm)
  {
      
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
      });// disable backbutton
      
 
      //function triggered by the cancel button click
      $scope.cancelEdit = function()
      {
          // redirect the user back to the eventFullViewCtrl
          $state.go('eventFullView');
      }
      
       // the variable eventData contains an object of all the data of the selected event
       // it utilize the service eventData with the service function individualEventPost which  contains the data of the selected event and the containing data was transferred here from the entity event list selection controller invoking the eventData service      
      $scope.eventData = eventData;
                  
      // here we convert the starting date returened from the backend in order to bind it in the native date picker
      
       var start_time = new Date(eventData.individualEventPost.start_time);
    start_time.setHours(start_time.getHours() - 5)
      
      $scope.eventData.individualEventPost.start_time = start_time;
      
      // here we convert the end date returened from the backend in order  to bind it in the native date picker
      var end_time = new Date(eventData.individualEventPost.end_time); 
    end_time.setHours(end_time.getHours() - 5)
      
      $scope.eventData.individualEventPost.end_time = end_time;
      
      // image path in order to display the picture
      var img = eventData.individualEventPost.photo;

      // here we specify from what type of user we are getting the picture
      var type = "event";
      
      // variable that holds the picture raw data 
      $scope.data={};   // data.userfile
      
           // this $http service is in charge of retrieving the entity picture raw data in order to display it
           $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + img + "&type=" + type),                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.event_photo = data;
              }).error(function(data) {
                   $scope.photoExists = false;
            });
      
      // function triggered by the save event button click
      $scope.alterPost = function()
      {
      // this $http service is in charge overwriting the new data in the DB
      $http({
        url: 'https://hoyportibppr.com/api/entities/editevent/'+$scope.eventData.individualEventPost.id,
        method: 'POST',
        data: JSON.stringify({'event': $scope.eventData.individualEventPost}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-API-KEY' : '123456',
          'TOKEN' : store.get('token')
          }
        }).success(function (data, status, headers, config)
        {
                    $state.go('eventFullView');
                    $scope.PostDataResponse = data;

            // in order to upload a picture, the following data need to be sended via parameters
          $scope.picData = {
                // here an integer 1 need to be submitted
                'submit' : $scope.submit = 1,
                // this is where the raw data of the picture taked will be stored
                'userfile' : $scope.userfile
            };

    // uploadUrl variable is the direction where the picture is going to be uploaded
    var uploadUrl = 'https://hoyportibppr.com/api/entities/event_uploadpicture/'+$scope.eventData.individualEventPost.id;
            
           // here AngularJS watches any changes in the data.userfile variable
           // when it detect a change, it will automatically upload the picture
           // and update the view
          $scope.$watch('data.userfile', function (img) {
                $scope.picData.userfile = img;
                multipartForm.post(uploadUrl, $scope.picData);
            });
          
          // popup
          var alertPopup = $ionicPopup.alert({
                             title: "Event editted",
                             template: "The event was successfuly edited!"
                         });

              }).error(function (data, status, header, config)
              {
          
            // this variables contains the error reply from the backend
            $scope.titleError = data.message.title;
            $scope.webError = data.message.web;
            $scope.descriptionError = data.message.description;
            $scope.start_timeError = data.message.start_time;
            $scope.end_timeError = data.message.end_time;
            $scope.addressError = data.message.address;
            $scope.cityError = data.message.city;
            $scope.end_zipError = data.message.zip;
            $scope.supervisor_nameError = data.message.supervisor_name;
            $scope.supervisor_phoneError = data.message.supervisor_phone;
            $scope.supervisor_emailError = data.message.supervisor_email;
          
                  //popup displaying errors from the backend
                 $ionicPopup.alert(
                    {
                        title: 'Error Description',
                        template: $scope.titleError || $scope.descriptionError || $scope.start_timeError || $scope.end_timeError || $scope.addressError || $scope.cityError || 
                $scope.end_zipError || $scope.supervisor_nameError || $scope.supervisor_phoneError || $scope.supervisor_emailError ||  $scope.webError || 'There was an error creating the event. Please check the required fields and try again.'
                    });              });
            };// end of alterPost function
          }
        })();

//editVolunteering
(function(){

  "use strict";

angular.module('app').controller('editVolunteeringCtrl', editVolunteeringCtrlFunction);

editVolunteeringCtrlFunction.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment', 'volunteeringData', '$ionicPopup','multipartForm'];
    
function editVolunteeringCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment, volunteeringData, $ionicPopup,multipartForm)
{
    var tokenEncoded = store.get('token');
    var tokenDecoded = jwtHelper.decodeToken(tokenEncoded);
    var ent = tokenDecoded;
    $scope.initializing = true;
    
     $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
    
    // function triggered by clicking the cancel button
       $scope.cancelEdit = function()
        {
            $state.go('volunteeringFullView')
        }
        
       // this is in charge of activating and deactivating the skills dropdown 
        $scope.showVolunteeringSkills = false;
        $scope.volunteeringShowSkills = function ()
        {
            $scope.showVolunteeringSkills = !$scope.showVolunteeringSkills;
        };
    
    //JSON Form for the edit volunteering fields
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
    
    
    // the variable voluntData contains an object of all the data of the selected volunteering
    // it utilize the service volunteeringData with the service function getVoluntPost which  contains the data of the selected volunteering and the containing data was transferred here from the entity volunteering selection controller invoking the volunteeringData service
    $scope.voluntData=volunteeringData.getVoluntPost(); 
    
    var time=volunteeringData.getVoluntPost();  
    
    // here we convert the starting date returened from the backend in order to bind it in the native date picker
    
    var start_time = new Date(time.start_time);
    start_time.setHours(start_time.getHours() - 5)
    $scope.voluntData.start_time = start_time;
    
    // here we convert the end date returened from the backend in order  to bind it in the native date picker
    var end_time = new Date(time.end_time);
    end_time.setHours(end_time.getHours() - 5)
    $scope.voluntData.end_time = end_time;
    

    // this $http service is in charge of retrieving the volunteering post picture raw data in order to display it
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
    
    // variable that holds the picture raw data 
    $scope.data={}; // data.userfile

          // function triggered by the save volunteering  button click
    $scope.alterPost = function()
    {
            // in order to upload a picture, the following data need to be sended via parameters
         $scope.picData = {
                // here an integer 1 need to be submitted
                'submit' : $scope.submit = 1,
                // this is where the raw data of the picture taked will be stored
                'userfile' : $scope.userfile
            }
        
            // uploadUrl variable is the direction where the picture is going to be uploaded
            var uploadUrl = 'https://hoyportibppr.com/api/entities/volunteering_job_uploadpicture/'+$scope.voluntData.id;
            
           // here AngularJS watches any changes in the data.userfile variable
           // when it detect a change, it will automatically upload the picture
           // and update the view
          $scope.$watch('data.userfile', function (newValue, oldValue) {
              $scope.picData.userfile = newValue;
                multipartForm.post(uploadUrl, $scope.picData);
            });
        
        // here we are binding the object created with the current data retrieved from the database
        // this was done in order to display the current data in the edit volunteering fields
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
        
        
              // this $http service is in charge overwriting the new data in the DB
        $http({
                url: 'https://hoyportibppr.com/api/entities/edit_volunteering/' + $scope.voluntData.id,
                method: 'POST',
                data: JSON.stringify($scope.volunteeringPostObject),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-API-KEY' : '123456',
                    'TOKEN' : tokenEncoded
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
                
                        // this variables contains the error reply from the backend

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

//ActivityFeedCtrl
(function(){
    "use strict";
    
    function activityFeedCtrlFunction ($scope, $stateParams, $timeout, $http, store, jwtHelper, $httpParamSerializerJQLike, $ionicActionSheet, $state, $ionicPopup, moment, editTextPost) 
    {
        // $http service in charge of retrieving all the text posts 
        $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_posts',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        }).success(function(data) {
            $scope.posts = data.message;
        });
        
         // this function is activated when the user do the pull down refresh
         // it will refresh all the data obtaining any changes
         $scope.doRefresh = function() {
             
        // $http service in charge of retrieving all the text posts
       $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_posts',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        
        }).success(function(data) {
            $scope.posts = data.message;
        })
    .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    
    };// end of doRefresh function
    
    }
    
    activityFeedCtrlFunction.$inject =['$scope', '$stateParams', '$timeout', '$http', 'store', 'jwtHelper', '$httpParamSerializerJQLike', '$ionicActionSheet', 'moment', '$ionicActionSheet', '$state', 'editTextPost'];
    
    angular
        .module('app')
        .controller('activityFeedCtrl',activityFeedCtrlFunction);
})();

//volunteeringCtrl
(function(){
    
    "use strict";
    
    angular
        .module('app')
        .controller('volunteeringCtrl', volunteeringCtrlFunction);
    
    volunteeringCtrlFunction.$inject = ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$state', '$ionicPopup','moment','volunteeringData','editVolunteeringPost', 'Events'];

    function volunteeringCtrlFunction($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state, $ionicPopup,moment,volunteeringData,editVolunteeringPost, Events) 
    {  
        // function is triggered when the user click the volunteering post card
        $scope.goToVoluntView = function(voluntPost_id){
        // $http service is in charge of retrieving all the data of an espefic volunteering post
        $http({
          method: 'GET',
          url: 'https://hoyportibppr.com/api/entities/volunteering/'+voluntPost_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        }).success(function (data) {
            
            // here we are using the service volunteeringData 
            // from the service we are using the variable 'individualVoluntPost'
            // the purpose here is to trasfer all the data of the selected volunteering to the 
            // volunteering full view which is in charge of displaying all the data of the volunteering
            volunteeringData.individualVoluntPost = data.message;
            
            // redirect the user to publicVolunteeringFullView.html
            $state.go('publicVolunteeringFullView');
          });
      };
        
        // this $http service is in charge of retrieving all the existing volunteering posts from all the entitties
        $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_volunteerings/',
             headers: {'Content-Type': 'application/x-www-form-urlencoded',
                       'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        }).success(function (data) {
            $scope.posts = data.message;
        });
        
        // this function is invoked when the user refresh the page with the pulldown refresh
        // this function is in charge of retrieving all the existing volunteering posts
         $scope.doRefresh = function() {
             
        // this $http service returns an array of objects
        // each object contains an event information for a specific volunteering
        $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_volunteerings/',
             headers: {'Content-Type': 'application/x-www-form-urlencoded',
                       'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        }).success(function (data) {
            $scope.posts = data.message;
        })
    .finally(function() {
        // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    
    };
    
    // this function is in charge adding an event to the native calendar using the Events service and the plugin cordova-plugin-calendar
    $scope.addEventToCalendar = function(event)
        {
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
        }//end of addEventToCalendar
    }
    
})();

//eventCtrl
(function(){
    "use strict";
    
    angular
        .module('app')
        .controller('eventsCtrl', eventsCtrlFunction);
    
    eventsCtrlFunction.$inject = ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$state', '$ionicPopup','moment','$ionicActionSheet','eventData','editEventPost','$ionicPopover'];

    function eventsCtrlFunction($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$state, $ionicPopup,moment, $ionicActionSheet, eventData,editEventPost, $ionicPopover) {

    // this $http service is in charge of retrieving all the existing event posts from all the entitties
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
        // $http service is in charge of retrieving all the data of an espefic event post
        $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event/'+eventPost_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
            
        // here we are using the service eventData 
        // from the service we are using the variable 'individualEventPost'
        // the purpose here is to trasfer all the data of the selected event to the 
        // event full view which is in charge of displaying all the data of the volunteering
        eventData.individualEventPost = data.message.event;
        
        // redirect the user to publicEventFullView.html
        $state.go('publicEventFullView');
    });
        
    };
        
    // this function is invoked when the user refresh the page with the pulldown refresh
    // this function is in charge of retrieving all the existing event posts    
    $scope.doRefresh = function() {

    // this $http service returns an array of objects
    // each object contains an event information for a specific event
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


//publicEventFullViewCtrl
(function(){

  "use strict";
  angular.module('app').controller('publicEventFullViewCtrl', publicEventFullViewCtrlFunction);

  function publicEventFullViewCtrlFunction($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment, eventData, $timeout,$ionicPopup,$ionicActionSheet, Events)
  {  
      
      // default flags
      $scope.goingg = false;
      $scope.notgoingg = true;
      
      
      // the variable event contains an object of all the data of the selected event
       // it utilize the service eventData with the service function individualEventPost which  contains the data of the selected event and the containing data was transferred here from the entity event list selection controller invoking the eventData service  
      $scope.event = eventData.individualEventPost;
      
     
      // here we verify the list of going or interested events and volunteerings of the signed in user
      if($rootScope.supporter === true){
      if($rootScope.supporter_data.participation !== null)   
      {
              $rootScope.supporter_data.participation.forEach(function(element){
                  
                  if(element.id === $scope.event.id)
                      {
                          $scope.goingg = true;
                          $scope.notgoingg = false;
                      }
                  
              })
          }
      }
      
      // image path in order to display the picture
      var img =  eventData.individualEventPost.photo;
      var id = eventData.individualEventPost.id;
      
      // here we specify from what type of picture we are getting
      var type="event";
      
      // this $http service is in charge of retrieving the volunteering picture raw data in order to display it
               $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/displaypic/',
                data: ("img=" + img + "&type=" + type),                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.event_photo = data;
              }).error(function(data)
                       {
            $scope.photoExists = false;
        });
      
        // function triggered by the "going" button click
      $scope.going = function(id){
          
          // json object that must be sent in order to properly add the event to the ongoing activities
          $scope.goingEvent = 
          {
          "event_decision": { 
            "event_id":  id, // id of the selected event
            "decision": "going"} // type of decision
          };
          
        // $http service in charge of storing the information of the event thats being follow
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
            
            // flags changed
             $scope.goingg = true;
            $scope.notgoingg = false;
            
                // popup
                  var alertPopup = $ionicPopup.alert({
                  title: 'Thanks for your awareness!'
                  });        
        })
    };
      
       $scope.interested = function(id){
           
            // json object that must be sent in order to properly add the event to the interested activities
            $scope.interestedEvent = 
          {
          "event_decision": { 
            "event_id":  id, // id of the selected event
            "decision": "interested"} // type of decision
          };
      
        // $http service in charge of storing the information of the event thats being follow
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
                  
            // changed flags
            $scope.goingg = true;
            $scope.notgoingg = false;
              // popup  
             var alertPopup = $ionicPopup.alert({
                  title: 'Thanks for your awareness!'
        });
            
        }).error(function (data) {
            $scope.error = data.message;
            
        });
    };
      
            // function triggered by "not going" button click
      $scope.ungoing = function(id){
            
            // json object that must be sent in order to properly add the event to the interested activities
            $scope.ungoingEvent = 
          {
          "event_decision": { 
            "event_id":  id} // id of the event thats going to be deleted
            };

                  // $http service in charge of deleting the information of the event thats being follow
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
            
            // flags changes
             $scope.goingg = false;
            $scope.notgoingg = true;
    
            // popup
            var alertPopup = $ionicPopup.alert({
                  title: 'No problem!'
                  });
        });
    };
      
         // function is triggered by the add to calendar button click
       $scope.addToCalendar = function (volunteering)
      {
           // invokes Event service with the function add // the service use the cordova calendar plugin
         // the vairable post coontains the data that will be stored in the native calendar of the phone
          Events.add($scope.event);
      };
  }

  publicEventFullViewCtrlFunction.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','eventData', '$timeout','$ionicPopup','$ionicActionSheet', 'Events'];

})();

//myEntityEventsCtrl
(function(){

  "use strict";
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
    $rootScope.supporter_token= tokenPayload;
    
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
    }).error(function (error) {
      $state.go($state.current, $stateParams, {reload: true, inherit: false});

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
    }).error(function (error) {
        $scope.error = error.status;
    })

}

})();

//registeredEventsCtrl
(function(){

  "use strict";
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
    $scope.error=data.message.participation;
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
                                start_time: element.start_time,
                                decision: element.decision
                            };
                 $scope.my_activities.push(temp);            
        })
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
            volunteeringData.individualVoluntPost = $scope.posts;
            $state.go('publicVolunteeringFullView');
          });
      };
    
    // this function is in charge adding an event to the native calendar using the Events service and the plugin cordova-plugin-calendar
    $scope.addEventToCalendar = function(event, $event)
    {
        $event.stopPropagation();// Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
        Events.addEvent(event);
    };
}

})();

//myEntitiesCtrl
(function(){

  "use strict";
  angular
    .module('app')
    .controller('myEntitiesCtrl', myEntitiesCtrl);

  myEntitiesCtrl.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','entityProfiles'];

  function myEntitiesCtrl($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,entityProfiles)
{    
//            $http({
//        method: 'GET',
//        skipAuthorization: true,//es necesario enviar el token
//        url: 'https://hoyportibppr.com/api/supporters/',
//        headers: {
//            'Content-Type': 'application/x-www-form-urlencoded',
//            'Accept': 'application/x-www-form-urlencoded',
//            'X-API-KEY' : '123456',
//         'TOKEN': store.get('token')}
//
//    }).success(function(data) {
//
//        $scope.info = data.message;
//            if($scope.info.followed_entities === null)
//                {
//                    $scope.info.followed_entities = [];
//                }
//            
//        $rootScope.supporter_data = data.message;
//    });
    
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
    });
}
})();

//discoverCtrl
(function(){

  "use strict";
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
    $rootScope.supporter_token= tokenPayload;
    
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
        console.log(data.message)
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
            skipAuthorization: true,//es nec.................................................................................................................................0esario enviar el token
            url: 'https://hoyportibppr.com/api/supporters/displaypic/',
            data: "img=" + $scope.img,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/x-www-form-urlencoded',
                'X-API-KEY' : '123456'
            }
        }).success(function (data) {
            $rootScope.supporter_profile_picture = data.message;
        });
    });

}

})();

//allEventsCtrl
(function(){
    "use strict";
     
    angular
        .module('app')
        .controller('allEventsCtrl', allEventsCtrl);
    
    allEventsCtrl.$inject = ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$state', '$ionicPopup','moment','$ionicActionSheet','eventData','editEventPost','$ionicPopover', '$rootScope']; //'Upload',

    function allEventsCtrl($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$state, $ionicPopup,moment, $ionicActionSheet, eventData,editEventPost, $ionicPopover, $rootScope) {
        
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton

            // this function is attached to the pull down refresh
         $scope.doRefresh = function() {
             
        // $http service in charge of retrieving all the existing event posts  
       $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/all_events/',
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
           
        // variable containing all the event posts   
        $scope.events = data.message;
    })
    .finally(function() { // this is trigger after the pull down
       $scope.$broadcast('scroll.refreshComplete');
     }); // end of doRefresh
    
    };
        
        
            // $http service in charge of retrieving all the existing event posts  
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'https://hoyportibppr.com/api/entities/all_events/',
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.events = data.message;
    });
        
        // this functions is triggered when the user click a specific event post
        // it will provide all the information of the selected event posts
                 $scope.goToEventView = function(eventPost_id){
        
        $http({
        method: 'GET',
        url: 'https://hoyportibppr.com/api/entities/event/'+eventPost_id,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.events = data.message;
            
        eventData.individualEventPost = data.message.event;
        
        $state.go('discoverEventFullView');
    });
        
    };
}
    
})();

//volunteeringCtrl
(function(){
    "use strict";
    
    angular
        .module('app')
        .controller('allVolunteeringsCtrl', allVolunteeringsCtrl);
    
    allVolunteeringsCtrl.$inject = ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$state', '$ionicPopup','moment','volunteeringData','editVolunteeringPost', 'Events', '$rootScope']; //'Upload',

    function allVolunteeringsCtrl($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state, $ionicPopup,moment,volunteeringData,editVolunteeringPost, Events,$rootScope) 
    {  

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });// disable backbutton
        
        // this functions is triggered when the user click a specific volunteering post
        // it will provide all the information of the selected volunteering posts
    $scope.goToVoluntView = function(voluntPost_id){
        
        // $http service in charge of retrieving all the information of the selected volunteering post
        $http({
          method: 'GET',
          url: 'https://hoyportibppr.com/api/entities/volunteering/'+voluntPost_id,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'}
        }).success(function (data) {
            // all the data of the selected volunteering post will be transferred to the volunteeringData service in order to display the information in other html page
            volunteeringData.individualVoluntPost = data.message;
            
            // when success it will redirect the user to the html page containing all the information about the volunteering post
            $state.go('discoverVolunteeringFullView');
          });
      };// end of goToVoluntView
        
        // $http service in charge of retrieving all the existing volunteering posts
        $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_volunteerings/',
             headers: {'Content-Type': 'application/x-www-form-urlencoded',
                       'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        }).success(function (data) {
            // variable containing all the text  posts
            $scope.posts = data.message;
        });
        
        // this function is in charge adding an event to the native calendar using the Events service and the plugin cordova-plugin-calendar
        $scope.addEventToCalendar = function(event)
        {
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
        }//end of addEventToCalendar
        
        // this function is triggered after the user perform the pulldown refresh
         $scope.doRefresh = function() {
           // $http service in charge of retrieving all the existing volunteering posts
           $http({
                method: 'GET',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/all_volunteerings/',
                 headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
            }).success(function (data) {
               //this variable contain all the volunteering preview posts
                $scope.posts = data.message;
            })
            .finally(function() { // this is trigger after the pull down
               $scope.$broadcast('scroll.refreshComplete');
             });
        };// end of doRefresh
        
    }
    
})();

//allPostsCtrl
(function(){
    "use strict";
    
    function allPostsCtrl($scope, $stateParams, $timeout, $http, store, jwtHelper, $httpParamSerializerJQLike, $ionicActionSheet, $state, $ionicPopup, moment, editTextPost) {
        
        // this $http service is in charge of retrieving all the existing text posts
        $http({
            method: 'GET',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/all_posts',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        
        }).success(function(data) {
            // variable containing all the text posts
            $scope.posts = data.message;
        });

        // this function is attached to the pull down refresh
         $scope.doRefresh = function() {
             
           // $http service in charge of retrieving all existing the text posts
           $http({
                method: 'GET',
                skipAuthorization: true,//es necesario enviar el token
                url: 'https://hoyportibppr.com/api/entities/all_posts',
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                          'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
            }).success(function(data) {
                // variable containing all the text posts
                $scope.posts = data.message;
            })
            .finally(function() { // this is trigger after the pull down
               $scope.$broadcast('scroll.refreshComplete');
                 });
        };  // end of doRefresh
    };
    
    allPostsCtrl.$inject =['$scope', '$stateParams', '$timeout', '$http', 'store', 'jwtHelper', '$httpParamSerializerJQLike', '$ionicActionSheet', 'moment', '$ionicActionSheet', '$state', 'editTextPost'];
    
    angular
        .module('app')
        .controller('allPostsCtrl',allPostsCtrl);
})();

//publicVolunteeringFullViewCtrl
(function(){

  "use strict";
  angular
    .module('app')
    .controller('publicVolunteeringFullViewCtrl', publicVolunteeringFullViewCtrl);

  publicVolunteeringFullViewCtrl.$inject = ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment','volunteeringData','$ionicPopup','$ionicActionSheet', 'Events'];

  function publicVolunteeringFullViewCtrl($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment,volunteeringData,$ionicPopup,$ionicActionSheet, Events)
{
     // default flags
    $scope.going_flag = true;
    $scope.notGoing_flag = false;
    
    // the variable volunteering contains an object of all the data of the selected volunteering
    // it utilize the service volunteeringData with the service variable individualVoluntPost which  contains the data of the selected volunteering and the containing data was transferred here from the entity volunteering selection controller invoking the volunteeringData service
    $scope.volunteering = volunteeringData.individualVoluntPost;    
    
    // here we obtain all the data of the signed in supporter
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

        // here we verify the list of going or interested events and volunteerings of the signed in user
        if($rootScope.supporter)
        {
            $rootScope.supporter_data.participation.forEach(function(element){

                if(element.id === $scope.volunteering.id){
                    $scope.going_flag = false;
                    $scope.notGoing_flag = true;
                }

            });
        }
    });
    
          // image path in order to display the picture
    var img = volunteeringData.individualVoluntPost.photo;
    
          // here we specify from what type of picture we are getting
    var type = 'post';
    
     // this $http service is in charge of retrieving the volunteering picture raw data in order to display it
     $http({
            method: 'POST',
            skipAuthorization: true,//es necesario enviar el token
            url: 'https://hoyportibppr.com/api/entities/displaypic/',
            data: ("img=" + img + "&type=" + type),                
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
    
     // function triggered by the "going" button click
    $scope.going = function(id){

        // $http service in charge of storing the information of the volunteering thats being follow
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
            
        // the view will be reloaded after the entity clicking the going button to reflect the change
        $state.go($state.current, $stateParams, {reload: true, inherit: false});
       
            // popop
            var alertPopup = $ionicPopup.alert({
        title: 'Thanks for your awareness!'
        });        

        })
    };
    
      // function triggered by "not going" button click
       $scope.ungoing = function(id){
          
        // $http service in charge of deleting the information of the volunteering thats being follow
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
            
            

        // the view will be reloaded after the entity clicking the going button to reflect the change
        $state.go($state.current, $stateParams, {reload: true, inherit: false});

            //popup
        var alertPopup = $ionicPopup.alert({
          title: 'No problem!'
          });
    });
    };
    
     // function is triggered by the add to calendar button click
     $scope.addToCalendar = function (volunteering)
     {
         // invokes Event service with the function add // the service use the cordova calendar plugin
         // the vairable post coontains the data that will be stored in the native calendar of the phone
         Events.add(volunteering);
     };
}
})();


//termsAndConditionsCtrl
(function(){
    "use strict";
    function termsAndConditionsCtrlFunction($scope) {}
    termsAndConditionsCtrlFunction.$inject =['$scope'];
    angular
        .module('app')
        .controller('termsAndConditionsCtrl',termsAndConditionsCtrlFunction);
})();
