/*
* This file contains all the controllers 
* for all the html pages
*/

angular.module('app.controllers', ['ngFileUpload',])
        
.controller('supporterRegistrationCtrl', ['$scope', '$http', '$stateParams','$httpParamSerializerJQLike','$state',"$ionicModal", "$ionicPopover", "$ionicPopup","$timeout",  // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $httpParamSerializerJQLike,$state, $ionicModal, $ionicPopover, $ionicPopup, $timeout) {//JQLike
    //httP://hoyportibppr.com/index.php/api/supporters/register

$scope.data = {
        'username' : $scope.username,
        'password' : $scope.password,
        'email' : $scope.email,
        'fname' : $scope.fname,
        'lname' : $scope.lanme,
        'gender' : $scope.gender
    }

      $scope.tip1 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Username rules',
       template: 'The username field may only contain 3–20 characters; A–Z, a–z, 0–9, dash, and underscore only'
        });   
          
      };
    
    $scope.tip2 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'First Name rules',
       template: 'The First Name can only contain letters and spaces'
        });   
          
      };
    
    $scope.tip3 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Last Name rules',
       template: 'The Last Name can only contain letters and spaces.'
        });   
          
      };

    $scope.tip4 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Email rules',
       template: 'The email field may only contain alpha-numeric characters, underscores, dashes and mandatory @'
        });   
          
      };
    
    $scope.tip5 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Rule for Username',
       template: 'The Confirm Email field must match the previous field with the corresponding rules'
        });   
          
      };
    
    $scope.tip6 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Rule for Username',
       template: 'There was an error creating the account. Please check the required fields and try again.'
        });   
          
      };

       $scope.tip7 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Password rules',
       template: '6–40 characters; at least one uppercase letter and digit'
        });   
          
      };
    
       $scope.tip8 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Confirm Password rules',
       template: 'The Confirm Password field must match the previous field with the corresponding rules'
        });   
          
      };
//    $scope.confirmPassword = '';
      // calling our submit function.
        $scope.submitForm1 = function() {
            
        // Posting data to php file
           // use $.param jQuery function to serialize data from JSON 
          $http({
        url: 'http://hoyportibppr.com/api/supporters/register',
        method: 'POST',
        data: $httpParamSerializerJQLike($scope.data),//
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'
        }
      }) .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data.message;
              console.log($scope.PostDataResponse)
            
              $state.go('login');//home/newsfeed

            })
         .error(function (data, status, header, config) {
                $scope.ResponseDetails = data.status;
                $scope.errorMessage = data.message.password;
                $scope.errorMessage1 = data.message.username;
                $scope.errorMessage2 = data.message.email;
                $scope.errorMessage3 = data.message.fname;
                $scope.errorMessage4 = data.message.lname;
                $scope.errorMessage5 = data.message.gender;


                console.log($scope.ResponseDetails)
                
    if($scope.ResponseDetails == "failure"){ 
        
   var alertPopup = $ionicPopup.alert({
       title: 'Error Description',
       template: $scope.errorMessage || $scope.errorMessage1 || $scope.errorMessage2 || $scope.errorMessage3 || $scope.errorMessage4 || $scope.errorMessage5 || 'There was an error creating the account. Either the password or email confirmation fields does not match.'
       
//       'There was an error creating the account. Please check the required fields and try again.'
       
       
   });     
            
    }       
            $state.go('supporterRegistration');//home/newsfeed
              
            });
              
          
            
        };//end of function
}])

.controller('entityRegistrationCtrl', ['$scope', '$http', '$stateParams','$httpParamSerializerJQLike','$state','$ionicPopup', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $httpParamSerializerJQLike, $state, $ionicPopup) {

    $scope.tip1 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Username rules',
       template: 'The username field may only contain 3–20 characters; A–Z, a–z, 0–9, dash, and underscore only'
        });   
          
      };
    
    $scope.tip2 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Email rules',
       template: 'The email field may only contain alpha-numeric characters, underscores, dashes and mandatory @'
        });   
          
      };
    
    $scope.tip3 = function() {

       var alertPopup = $ionicPopup.alert({
       title: 'Phone rules',
       template: 'The phone field may only contain digits numbers'
        });   
          
      };
    
    $scope.tip4 = function() {

       var alertPopup = $ionicPopup.alert({
       title: 'Fax rules',
       template: 'The fax field may only contain digits numbers'
        });   
          
      };
    
    $scope.tip5 = function() {

       var alertPopup = $ionicPopup.alert({
       title: 'Password rules',
       template: '6–40 characters; at least one uppercase letter and digit'
        });   
          
      };
    
     $scope.data = {}
      // calling our submit function.
        $scope.submitForm2 = function() {
        // Posting data to php file
           // use $.param jQuery function to serialize data from JSON 
            
          $http({
        url: 'http://hoyportibppr.com/api/entities/register',
        method: 'POST',
        data: $httpParamSerializerJQLike($scope.data),//
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'
        }
      }) .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
              $state.go('login');
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = data.status;
                $scope.errorMessage = data.message.password;
                $scope.errorMessage1 = data.message.username;
                $scope.errorMessage2 = data.message.email;
                $scope.errorMessage3 = data.message.fax;
                $scope.errorMessage4 = data.message.phone;
                $scope.errorMessage5 = data.message.web;
                $scope.errorMessage6 = data.message.zip;
                $scope.errorMessage7 = data.message.ent_name;
                $scope.errorMessage8 = data.message.founded_on;
                $scope.errorMessage9 = data.message.address1;
                $scope.errorMessage10 = data.message.category;
                $scope.errorMessage11 = data.message.country;
                $scope.errorMessage12 = data.message.city;


          if($scope.ResponseDetails == "failure"){ 

        var alertPopup = $ionicPopup.alert({
           title: 'Error Description',
           template: $scope.errorMessage || $scope.errorMessage1 || $scope.errorMessage2 || $scope.errorMessage3 || $scope.errorMessage4 || $scope.errorMessage5 || $scope.errorMessage6 ||  $scope.errorMessage7 ||  $scope.errorMessage8 ||  $scope.errorMessage9 || $scope.errorMessage10 || $scope.errorMessage11 || $scope.errorMessage12 || 'There was an error creating the account. Please check the required fields and try again.'
        });  
    
    }
              
              $state.go('entityRegistration');
          })
        
    $scope.showMee = false;
    $scope.myFunce1 = function() {
    $scope.showMee = !$scope.showMee; 
    };
    
          }
                   
        
}])

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



.controller('eventPageCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

    
}])



.controller('voluntPageCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

    
}])


.controller('entityProfileCtrl', ['$scope','$stateParams','CONFIG', 'jwtHelper', 'store','userData','$rootScope','$ionicScrollDelegate','$ionicSlideBoxDelegate','$http','$window','$state','$ionicActionSheet', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, CONFIG, jwtHelper, store, userData, $rootScope, $ionicScrollDelegate,$ionicSlideBoxDelegate,$http,$window,$state,$ionicActionSheet) {

//    $scope.profiless = uProfiles.all();
    
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
    //decodificamos para obtener los datos del user
    var tokenPayload = jwtHelper.decodeToken(token);
    console.log(tokenPayload);
    //los mandamos a la vista como user
    $rootScope.entityAdmin = tokenPayload;
    
     $http({
                method: 'GET',
                skipAuthorization: true,//es necesario enviar el token
                url: 'http://hoyportibppr.com/api/entities/' + $rootScope.entityAdmin.role_id,
                 headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
            })
            .success(function (data) {
                $scope.info = data.message;
//               $scope.skills = data.message.skills;
//               console.log($scope.skills)
                console.log($scope.info)
            })
            
             $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'http://hoyportibppr.com/api/entities/posts/'+ $rootScope.entityAdmin.role_id ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message.posts;
        console.log($scope.posts)
    })
    .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
     
     
     
    
    
    
    
    
    
    $scope.doRefresh = function() {

          
        $http({
                method: 'GET',
                skipAuthorization: true,//es necesario enviar el token
                url: 'http://hoyportibppr.com/api/entities/' + $rootScope.entityAdmin.role_id,
                 headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
            })
            .success(function (data) {
                $scope.info = data.message;
//                $scope.skills = data.message.skills;
//                console.log($scope.skills)
                console.log($scope.info)
            
            })
         .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');

     });
          
         // end of loadMore
//   $http({
//        method: 'GET',
//        skipAuthorization: true,//es necesario enviar el token
//        url: 'http://hoyportibppr.com/api/entities/posts/'+ $rootScope.entityAdmin.role_id ,
//         headers: {'Content-Type': 'application/x-www-form-urlencoded',
//                   'Accept': 'application/x-www-form-urlencoded',
//                  'X-API-KEY' : '123456'}
//    })
//    .success(function (data) {
//        $scope.posts = data.message.posts;
//        console.log($scope.posts)
//    })
//    .finally(function() {
//       // Stop the ion-refresher from spinning
//       $scope.$broadcast('scroll.refreshComplete');
//     });
//          
         
  };
    
     $scope.call = function () {
        $window.open('tel:' + $scope.info.sup_phone, '_system');
      };

      $scope.mail = function () {
        $window.open('mailto:' + $scope.info.email, '_system');
      };
    
    
    
//     userData.get().then(function(res)
//        {
//         
//        var test = res.data.response;
//        console.log(test.data)
//        var test2 = jwtHelper.decodeToken(test);
//         console.log(test2.data)
//         
//         
//         
//            if(res.data && res.data.code !== 0)
//            {
//                store.set('token', res.data.response.token);
//                $scope.info = res.data.response.supporters;
//            }
//        });  
    
    
    
    
    
//    
//    $ionicSlideBoxDelegate.update();
//  $scope.onUserDetailContentScroll = onUserDetailContentScroll

    
//    function onUserDetailContentScroll(){
//    var scrollDelegate = $ionicScrollDelegate.$getByHandle('userDetailContent');
//    var scrollView = scrollDelegate.getScrollView();
//    $scope.$broadcast('userDetailContent.scroll', scrollView);
//  }
    
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
    
    
    
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'http://hoyportibppr.com/api/entities/posts/'+ $rootScope.entityAdmin.role_id ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message.posts;
        console.log($scope.posts[0].id)
    })
    
    
     $scope.deletePost = function(val) {
         
         
    var hideSheet = $ionicActionSheet.show({
        
     buttons: [
       { text: 'Edit' }
     ],
        
     destructiveText: 'Delete',
     titleText: "This post will be deleted and you won't be able to find it anymore. You can also edit this post, if you just want to change something.",
     cancelText: 'Cancel',
        
     cancel: function() {
          // add cancel code..
        },
        
     buttonClicked: function(index) {
       return true;
     },
        
    destructiveButtonClicked: function() {
            
        $http({
        method: 'DELETE',
        skipAuthorization: true,//es necesario enviar el token
        url: 'http://hoyportibppr.com/api/entities/post/'+ val ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456',
                  TOKEN: token}
    })
    .success(function (data) {
        $scope.delete = data;
        $state.go($state.current, $stateParams, {reload: true, inherit: false});

        console.log($scope.posts)
            }     
        );         
    }
        
   });

         
         
  };
    
    
    
    
    
    
    
    
    
    
    
    
}])

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


   

// Login Page Controller
.controller('loginCtrl', ['$scope', '$stateParams', '$ionicModal', '$ionicPopover', '$timeout','$state','$ionicPopup','$rootScope', 'CONFIG','authFactory', 'jwtHelper', 'store','$ionicLoading', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $ionicPopover, $timeout,  $state, $ionicPopup, $rootScope, CONFIG, authFactory, jwtHelper, store,$ionicLoading) {


$rootScope.authToken;
$rootScope.isAuthenticated = false;
$rootScope.e = false;
$rootScope.u = false; 
$rootScope.l = true;
$rootScope.s = true;  
$scope.user = {}
    
    $scope.login = function(user)
    {
        authFactory.login(user).then(function(res)
        {
            
                  $ionicLoading.show({
                  template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                  duration: 100
                })

             //////////////////////////////////////////////////    
            var tok = res.data.response.token;
            console.log(tok);

            var tokenPayload = jwtHelper.decodeToken(tok);
            console.log(tokenPayload);
            if(tokenPayload.role == 'entity'){
                
            store.set('token', res.data.response.token);
            $rootScope.isAuthenticated = true;
			$state.go('entityProfile');//home/newsfeed
            $rootScope.e = !$rootScope.e;
            $rootScope.l = !$rootScope.l;
            $rootScope.s = !$rootScope.s;  
//          $rootScope.u = $rootScope.u;  
            
		}else if (tokenPayload.role == 'supporter'){
           
            store.set('token', res.data.response.token);
            $rootScope.isAuthenticated = true;
            $state.go('profile');
            $rootScope.u = !$rootScope.u;
            $rootScope.l = !$rootScope.l;
            $rootScope.s = !$rootScope.s; 
        }else{
        
			$scope.showAlert('Invalid username or password.');	
		}
      /////////////////////////////////////////////////////////////
	}                                                       
)}
    
//--------------------------------------------
//--------------------------------------------
//   $rootScope.login = function(data) {
//			
//		if(typeof(data)=='undefined'){
//			$scope.showAlert('Please fill username and password to proceed.');	
//            return false;
//		}
//
//		if(data.username == 'entity@gmail.com' & data.password == 'demo' ){
//			$location.path('/animal/0');//home/newsfeed
//            $rootScope.e = !$rootScope.e;
////            $rootScope.u = $rootScope.u;  
//            
//             
//
//		}else if (data.username == 'user@gmail.com' & data.password == 'demo'){
//            
//            $location.path('/profile');
//            $rootScope.u = !$rootScope.u;
////            $rootScope.e =  $rootScope.e;
//            
//             
//
//        }else{
//        
//			$scope.showAlert('Invalid username or password.');	
//		}
//		
//	};
//--------------------------------------------
//--------------------------------------------

    
//--------------------------------------------
//  $scope.logout = function() {   $location.path('/home/login');   };
  //--------------------------------------------
}])
///////////////////////////////////////////////////////////////////////////


//About Page Controller
.controller('aboutAddressContactInformationCtrl', ['$scope','$stateParams','CONFIG', 'jwtHelper', 'store','userData','$rootScope','$ionicScrollDelegate','$ionicSlideBoxDelegate','$http','$window','$state','$cordovaGeolocation', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, CONFIG, jwtHelper, store, userData, $rootScope, $ionicScrollDelegate,$ionicSlideBoxDelegate,$http,$window,$state,$cordovaGeolocation) {

    
    
    
    
    
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
    
    
    
    
    
    
    
    
    
    
//  
//  $scope.toggleItem= function(item) {
//    if ($scope.isItemShown(item)) {
//      $scope.shownItem = null;
//    } else {
//      $scope.shownItem = item;
//    }
//  };
//  $scope.isItemShown = function(item) {
//    return $scope.shownItem === item;
//  };

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
            url: 'http://hoyportibppr.com/api/entities/' + $rootScope.entityAdmin.role_id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                       'Accept': 'application/x-www-form-urlencoded',
                      'X-API-KEY' : '123456'}
        })
        .success(function (data) {
            $scope.info = data.message;
            console.log($scope.info)
        })
            
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'http://hoyportibppr.com/api/entities/posts/'+ $rootScope.entityAdmin.role_id ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message.posts;
        console.log($scope.posts)
    })
    .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
     
     
      $scope.doRefresh = function() {
        $http({
                method: 'GET',
                skipAuthorization: true,//es necesario enviar el token
                url: 'http://hoyportibppr.com/api/entities/' + $rootScope.entityAdmin.role_id,
                 headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
            })
            .success(function (data) {
                $scope.info = data.message;
                $scope.skills = data.message.skills;
                console.log($scope.skills)
                console.log($scope.info)
            })
         .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
          
   $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'http://hoyportibppr.com/api/entities/posts/'+ $rootScope.entityAdmin.role_id ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message.posts;
        console.log($scope.posts)
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
    
    
    
//     userData.get().then(function(res)
//        {
//         
//        var test = res.data.response;
//        console.log(test.data)
//        var test2 = jwtHelper.decodeToken(test);
//         console.log(test2.data)
//         
//         
//         
//            if(res.data && res.data.code !== 0)
//            {
//                store.set('token', res.data.response.token);
//                $scope.info = res.data.response.supporters;
//            }
//        });  
    
    
    
    
    
    
    $ionicSlideBoxDelegate.update();
  $scope.onUserDetailContentScroll = onUserDetailContentScroll

    
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

    
//     $scope.showMe2 = false;
//    $scope.myFunc2 = function() {
//        $scope.showMe2 = !$scope.showMe2;
//    };
//    
//     $scope.showMe3 = false;
//    $scope.myFunc3 = function() {
//        $scope.showMe3 = !$scope.showMe3;
//    };
//    
//     $scope.showMe4 = false;
//    $scope.myFunc4 = function() {
//        $scope.showMe4 = !$scope.showMe4;
//    };
    
}])
    

.controller('profileCtrl', ['$scope','$stateParams','CONFIG', 'jwtHelper', 'store','userData','$rootScope','$http','$window','$state','$httpParamSerializerJQLike', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, CONFIG, jwtHelper, store, userData, $rootScope,$http,$window,$state,$httpParamSerializerJQLike) {

//    $scope.profiless = uProfiles.all();
    
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
  viewData.enableBack = false;
});

    $scope.editProfile = function() {
    $state.go('editSupportersProfile');
    };
    
    //obtenemos el token en localStorage
    var token = store.get('token');
    //decodificamos para obtener los datos del user
    var tokenPayload = jwtHelper.decodeToken(token);
    console.log(tokenPayload);
    //los mandamos a la vista como user
    $rootScope.supporter = tokenPayload;
    
    
    $http({
                method: 'GET',
                skipAuthorization: true,//es necesario enviar el token
                url: 'http://hoyportibppr.com/api/supporters/' + $rootScope.supporter.role_id,
                 headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
            })
            .success(function (data) {
                $scope.info = data.message;
                $scope.img={}
                $scope.img = data.message.sup_pic;
                console.log($scope.img);
//                $scope.skills = data.message.skills;
//                console.log($scope.skills)
                console.log($scope.info)
                
    $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'http://hoyportibppr.com/api/supporters/displaypic/',
                data: "img=" + $scope.img,                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $rootScope.info1 = data.message;
                    console.log($rootScope.info1);
                })
            })

    
////////////////////////////////////////////////////////////////////////////////////////////////    
////    
//    $http({
//                method: 'POST',
//                skipAuthorization: true,//es necesario enviar el token
//                url: 'http://hoyportibppr.com/api/supporters/displaypic/',
//                data: $httpParamSerializerJQLike($scope.image),                
//                headers: {'Content-Type': 'application/x-www-form-urlencoded',
//                           'Accept': 'application/x-www-form-urlencoded',
//                          'X-API-KEY' : '123456'}
//            })
//            .success(function (data) {
//                $scope.info = data.message;
//                console.log($scope.info);
//
////                $scope.skills = data.message.skills;
////                console.log($scope.skills)
//            })
////    
/////////////////////////////////////////////////////////////////////////////////////////////////    
    
    
    
      $scope.doRefresh = function() {

            $http({
                method: 'GET',
                skipAuthorization: true,//es necesario enviar el token
                url: 'http://hoyportibppr.com/api/supporters/' + $rootScope.supporter.role_id,
                 headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
            })
            .success(function (data) {
                $scope.info = data.message;
//                $scope.skills = data.message.skills;
//                console.log($scope.skills)
                console.log($scope.info)
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
    
}])
//////////////////////////////////////////////////////////////////////////////
    
    

   .controller('entitiesCtrl', ['$scope', '$stateParams', 'eProfiles', 
function ($scope, $stateParams, eProfiles) {
    $scope.profiles = eProfiles.all();
    

    
}])


.controller('categoriesCtrl', ['$scope', '$stateParams','$http', 
function ($scope, $stateParams, $http /*categories*/) {

    $http({
        url: 'http://hoyportibppr.com/api/entities/categories',
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', 
            'X-API-KEY' : '123456'
        }
        })
        .then( function(response) {
        $scope.cate = response.data.message.categories;     
       // $scope.cate1 = response.data.message.categories[0];
      console.log($scope.cate)
            //console.log($scope.cate1)

    })
}])

.controller('entityProfilesCtrl', ['$scope', '$stateParams', 'eProfiles','$ionicScrollDelegate','$ionicSlideBoxDelegate', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, eProfiles, $ionicScrollDelegate,$ionicSlideBoxDelegate) {
    
    
  $scope.profile = eProfiles.get($stateParams.profileId);
      
  $ionicSlideBoxDelegate.update();
  $scope.onUserDetailContentScroll = onUserDetailContentScroll

  
  function onUserDetailContentScroll(){
    var scrollDelegate = $ionicScrollDelegate.$getByHandle('userDetailContent');
    var scrollView = scrollDelegate.getScrollView();
    $scope.$broadcast('userDetailContent.scroll', scrollView);
  }
    
      $scope.items = [{
      title: '1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }];

  
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

    
     $scope.showMe2 = false;
    $scope.myFunc2 = function() {
        $scope.showMe2 = !$scope.showMe2;
    };
    
     $scope.showMe3 = false;
    $scope.myFunc3 = function() {
        $scope.showMe3 = !$scope.showMe3;
    };
    
     $scope.showMe4 = false;
    $scope.myFunc4 = function() {
        $scope.showMe4 = !$scope.showMe4;
    };
  
                                              
}])
/////////////////////////////////////////////////////////////////////////


.controller('EeventsCtrl', ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$state', '$ionicPopup','moment', //'Upload',
function ($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state, $ionicPopup,moment) {

    $scope.newPost = function() {
    $state.go('postEvent');
  };
    
    var t1 = store.get('token');
    var tp = jwtHelper.decodeToken(t1);
    console.log(tp);
     var ent = tp;

    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'http://hoyportibppr.com/api/entities/'+ent.role_id ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.info = data.message;
        console.log($scope.info)
    })
    
}])
   
.controller('volunteeringCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('EvolunteeringCtrl',  ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$state', '$ionicPopup','moment', //'Upload',
function ($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state, $ionicPopup,moment) {

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
        url: 'http://hoyportibppr.com/api/entities/'+ent.role_id ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.info = data.message;
        console.log($scope.info)
    })

}])
   
.controller('donateCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('EdonateCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   

.controller('emailSentCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])
   
.controller('forgotPasswordCtrl', ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','$state','$ionicPopup',
function ($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,$state,$ionicPopup) {
    
    $scope.data = {};
    
    $scope.submit = function() {
        
          $http({
        url: 'http://hoyportibppr.com/api/auth/forgotpass',
        method: 'POST',
        data: $httpParamSerializerJQLike($scope.data),//
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456'            
        }
      }) .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data.status;
              console.log($scope.PostDataResponse);
              
              if($scope.PostDataResponse == "success"){ 
        
           var alertPopup = $ionicPopup.alert({
               title: 'Email sent!'
           });     

            } 
              
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = data.status;
                $scope.errorMessage = data.message;

              if($scope.ResponseDetails == "error"){ 
        
           var alertPopup = $ionicPopup.alert({
               title: 'Error!',
               template: $scope.errorMessage
           });     

            } 
              
              
            });
        };
}])
   
.controller('roleDecisionCtrl', ['$scope', '$stateParams','$http', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {
  
/*    $http.get('http://hoyportibppr.com/index.php/api/supporter/1').
        success(function(data) {
            $scope.greeting = data;
        });*/
}])




//.controller('activityFeedCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
//function ($scope, $stateParams) {
//
//
//}])

.controller('EactivityFeedCtrl', ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$state', '$ionicPopup','moment','$ionicActionSheet','$state', //'Upload',
function ($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$state, $ionicPopup,moment,$ionicActionSheet,$state) {

    $scope.newPost = function() {
    $state.go('entityPost');
  };
    
    
    var t1 = store.get('token');
    var tp = jwtHelper.decodeToken(t1);
    console.log(tp);
     var ent = tp;
    
    
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'http://hoyportibppr.com/api/entities/'+ent.role_id ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.info = data.message;
        console.log($scope.info)
    })
    
    
    ////////////////////////////////////////////////////////
    //all post
    ////////////////////////////////////////////////////////
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'http://hoyportibppr.com/api/entities/posts/'+ent.role_id ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message.posts;
        console.log($scope.posts)
    })
    ////////////////////////////////////////////////////////
    
    
    $scope.doRefresh = function() {
        
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'http://hoyportibppr.com/api/entities/posts/'+ent.role_id ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.posts = data.message.posts;
        console.log($scope.posts)
    })
    .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    };// end of function
    
    
    $scope.deletePost = function(val) {
         
         
    var hideSheet = $ionicActionSheet.show({
        
     buttons: [
       { text: 'Edit' }
     ],
        
     destructiveText: 'Delete',
     titleText: "This post will be deleted and you won't be able to find it anymore. You can also edit this post, if you just want to change something.",
     cancelText: 'Cancel',
        
     cancel: function() {
          // add cancel code..
        },
        
     buttonClicked: function(index) {
       return true;
     },
        
    destructiveButtonClicked: function() {
            
        $http({
        method: 'DELETE',
        skipAuthorization: true,//es necesario enviar el token
        url: 'http://hoyportibppr.com/api/entities/post/'+ val ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456',
                  TOKEN: t1}
    })
    .success(function (data) {
        $state.go($state.current, $stateParams, {reload: true, inherit: false});
        $scope.delete = data;

        console.log($scope.posts)
            }     
        );         
    }
        
   });

         
         
  };
    
    
}])

   
.controller('volunteering2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('volunteering2Ctrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {

    

}])
   
.controller('editSupportersProfileCtrl', ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$cordovaCamera','$ionicPopup','multipartForm','$ionicLoading','Upload','$state',  //'Upload',
function ($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet, $cordovaCamera,$ionicPopup,multipartForm,$ionicLoading,Upload,$state) {

    ////////////////////////////////////
    //    TOKEN RETRIEVAL
    var t1 = store.get('token');// get the encoded token
    var tp = jwtHelper.decodeToken(t1);// decode the encoded token
    console.log(tp);
    var sup = tp;
    ///////////////////////////////////
   
    ////////////////////
    //This variable  store all the input from the html
    $scope.data = {};
    ////////////////////
    
    
    
    ////////////////////////////////////////////////////////////////////
    //With this we get the skills from the database using a GET Method
//    $http({
//        url: 'http://hoyportibppr.com/api/supporters/skills',
//        method: 'GET',
//        headers: {
//          'Content-Type': 'application/x-www-form-urlencoded', 
//            'X-API-KEY' : '123456'
//        }
//        })
//        .then( function(response) {
//        $scope.skills = response.data.message.skills;   
//        console.log($scope.skills);
//        $scope.selectedSkills = function selectedSkills() {
//    return filterFilter($scope.skills, { selected: true });
//  };
 //////////////////////////////////////////////////////////////////////
        
        
        
        
// $scope.$watch('skills|filter:{selected:true}', function (nv) {
//    $scope.selection = nv.map(function (skills) {
//      return skills.name;
//    });
//  }, true);
//       // $scope.cate1 = response.data.message.categories[0];
//      console.log($scope.skills)
//            //console.log($scope.cate1)
//        })
    ///////////////////////////////////////////////////////////
   
    ////////////////////////////////////////////////////////////
    //This function represent the submit button in the html
    //When the user press the submit button it will call this function
    //and send all the data via POST method to the API, storing the data
    //in the database
//     $scope.selection = {
//        value: {"value": false}
//    };
    $scope.UpdateData = function() { 
        
         $ionicLoading.show({
                  template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                  duration: 300
                })
        
          $http({
        url: 'http://hoyportibppr.com/api/supporters/edit',
        method: 'POST',
        data: $httpParamSerializerJQLike($scope.data),//
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
            'TOKEN' : t1
        }
      }) .success(function (data, status, headers, config) {
                              $state.go('profile');

                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
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
    ///////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////
    //Here we get all the data from a specific user to display what
    //are the current values stored in the database
    $http({
        method: 'GET',
        skipAuthorization: true,//es necesario enviar el token
        url: 'http://hoyportibppr.com/api/supporters/'+sup.role_id ,
         headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
       $scope.info = data.message;
       console.log($scope.info);
        
        
       $scope.skills = data.message.skills;
        
//        angular.forEach($scope.skills, function(value, key) {
//  console.log(key + ': ' + value);
//});
        
       console.log($scope.skills);


        $scope.img={}
        $scope.img = data.message.sup_pic;
        console.log($scope.img);
        
        $http({
                method: 'POST',
                skipAuthorization: true,//es necesario enviar el token
                url: 'http://hoyportibppr.com/api/supporters/displaypic/',
                data: "img=" + $scope.img,                
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
                })
                .success(function (data) {
                    $scope.info1 = data.message;
                    console.log($scope.info1);
             
                })
    })
  
    $scope.showSkill = false;
    $scope.skillFunct = function() {
        $scope.showSkill = !$scope.showSkill;
    };
    
     $scope.showInterests = false;
    $scope.interestsFunct = function() {
        $scope.showInterests = !$scope.showInterests;
    };

    $scope.data = {
        'submit' : $scope.submit = 1,
        'userfile' : $scope.userfile,
    }
//    var uploadUrl = 'http://hoyportibppr.com/api/supporters/uploadpicture';
//    
//    $scope.$watch('data.userfile', function (img) {
//        $scope.data.userfile = img;
//        multipartForm.post(uploadUrl, $scope.data);
//    });
//   
    
    
    $scope.submitPicture = function(){
       
        var uploadUrl = 'http://hoyportibppr.com/api/supporters/uploadpicture';
		multipartForm.post(uploadUrl, $scope.data);

             $ionicLoading.show({
                  template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                  duration: 2000
                })
    }
    
}])

//Edit Entity Profile Page Controller
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
.controller('editentityProfileCtrl', ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$ionicPopup','$ionicLoading','$state',  //'Upload',
function ($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$ionicPopup,$ionicLoading,$state) {

    // Token retrieval
    var t1 = store.get('token');
    // Function to decode token
    var tp = jwtHelper.decodeToken(t1);
    console.log(tp);
    var ent = tp;
    
    
    $scope.data = {};// Variable that contains all the data retrived from the form fields in Edit Profile html
    
    ////////////////////////////////////////////////////////////
    //This function represent the submit button in the html
    //When the entity user press the submit button it will call this function
    //and send all the data via POST method to the API, storing the data
    //in the database
    $scope.UpdateData = function() {
    
    /*The $http service is a core Angular service that facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.*/
        
        $ionicLoading.show({
                  template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                  duration: 300
                })
        
    $http({
        url: 'http://hoyportibppr.com/api/entities/edit',//URL to edit and overwrite the data
        method: 'POST', // POST method
        data: $httpParamSerializerJQLike($scope.data),//the data typed in the field is binded to the $scope.data object that contains all the dat
        headers: { // here are the necessary headers
          'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
            'TOKEN' : t1 
        }// end of header
      }) 
           // If there are no errors, .success will run and the data will enter through here
         .success(function (data, status, headers, config) {
                $state.go('entityProfile');

                $scope.PostDataResponse = data;
            })
          //  If there are errors, .error will run and we will get the response from the server with the corresponding error
         .error(function (data, status, header, config) {
          // here we will get response errors
                $scope.ResponseDetails = data.status;
                $scope.errorMessage = data.message.ent_name;
                $scope.errorMessage1 = data.message.fax;
                $scope.errorMessage2 = data.message.phone;
                $scope.errorMessage3 = data.message.web;
                $scope.errorMessage4 = data.message.web_email;
                $scope.errorMessage5 = data.message.zip;
                $scope.errorMessage6 = data.message.address1;
                $scope.errorMessage7 = data.message.address2;
                $scope.errorMessage8 = data.message;

              if($scope.ResponseDetails == "failure"){ // this if condition verify the response was an error and display the error to the user
        
                   var alertPopup = $ionicPopup.alert({ // Pop up which shows the errors to the user
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
        url: 'http://hoyportibppr.com/api/entities/'+ent.role_id ,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
                   'Accept': 'application/x-www-form-urlencoded',
                  'X-API-KEY' : '123456'}
    })
    .success(function (data) {
        $scope.info = data.message;
        console.log($scope.info)
    }) // end of $http service
}])// End Edit Entity Profile Page Controller
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//Settings html Page Controller
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
.controller('settingsCtrl', ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$ionicActionSheet',
function ($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $ionicActionSheet) {
    
    
    $scope.logout = function() {
        
         var hideSheet = $ionicActionSheet.show({
        destructiveText: 'Log Out',
         titleText: 'Are you sure you want to log out?',
         cancelText: 'Cancel',
             
             cancel: function() {
            // add cancel code...
         },
             destructiveButtonClicked: function() {

    $rootScope.authToken = undefined; // when logout authToken will be set to undefined
    $rootScope.isAuthenticated = false; // when logout isAuthenticated will be set to false
    store.remove('token'); // when logout the token containing the credentials of the user will be deleted
    $state.go('login'); // when logout the user will automatically go to the login page
    $rootScope.u = false; // when user logout the profile page of user button will dissapear from the html DOM
    $rootScope.e = false; // when user logout the profile page of entity button will dissapear from the html DOM
    $rootScope.l = true;  // when user logout the login button will dissapear from the html DOM
    $rootScope.s = true;  // when user logout the signup button will dissapear from the html DOM
    $http.defaults.headers.common.Authorization = undefined; // when logout everything will be set to undefined and default
//    $state.transitionTo($state.current, $state.params, { reload: true, inherit: true, notify: true });//reload pg when transition to login page
    }// end of logout function
             
}
    )};
             
        
    
    
}])// end of Settings html Page Controller
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//.controller('indexCtrl', ['$scope', '$stateParams','$timeout','$http','store','jwtHelper','$httpParamSerializerJQLike','$ionicActionSheet','$ionicPopup',  //'Upload',
//function ($scope, $stateParams, $timeout, $http,store,jwtHelper,$httpParamSerializerJQLike,$ionicActionSheet,$ionicPopup) {
//
//}])

//Entity Normal Post html Page Controller
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
.controller('entityPostCtrl', ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','moment',
function ($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,moment) {
    
    var t1 = store.get('token');
    var tp = jwtHelper.decodeToken(t1);
    console.log(tp);
     var ent = tp;
    
    $scope.data = {};
    
    $scope.postData = function() {
      
          $http({
        url: 'http://hoyportibppr.com/api/entities/post',
        method: 'POST',
        data: $httpParamSerializerJQLike($scope.data),//
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
            'TOKEN' : t1
            
        }
      }) .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = data;
            });
      };

//    $scope.returnCount = function() {
//    if($scope.data.message){
//      return POST_MAX_CHAR - $scope.data.message.meta.text.length;
//    }
//  };
    
}])// End of Entity Normal Post html Page Controller
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
.controller('postEventCtrl', ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$cordovaCalendar',
function ($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $cordovaCalendar) {
    
    $scope.showEvent = false;
    $scope.eventSection = function() {
    $scope.showEvent = !$scope.showEvent;
    };
    
//$scope.createEvent = function() {
//        $cordovaCalendar.createEvent({
//            title: 'Space Race',
//            location: 'The Moon',
//            notes: 'Bring sandwiches',
//            startDate: new Date(2016, 0, 15, 18, 30, 0, 0, 0),
//            endDate: new Date(2015, 1, 17, 12, 0, 0, 0, 0)
//        }).then(function (result) {
//            console.log("Event created successfully");
//        }, function (err) {
//            console.error("There was an error: " + err);
//        });
//    }

    
}])

.controller('postVoluntCtrl', ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$ionicPopup',
function ($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http,$ionicPopup) {
    
    $scope.showVolunt = false;
    $scope.voluntSection = function() {
    $scope.showVolunt = !$scope.showVolunt;
    };
    
    $scope.showSearch = false;
    $scope.searchVolunt = function() {
    $scope.showSearch = !$scope.showSeacrh;
    };
    
     $scope.tip1 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Tip',
       template: 'Give your event an exciting, descriptive name to attract more volunteers!'
        });   
          
      };
    
    $scope.tip2 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Tip',
       template: ' Describe the opportunity in more detail here — what will the volunteers be expected to do? What will the experience be like?'
        });   
          
      };
    
    $scope.tip3 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Tip',
       template: 'Is there anything volunteers need to do before signing up for the opportunity? ex. Background check? Application form?'
        });   
          
      };
    
    $scope.tip4 = function() {

      var alertPopup = $ionicPopup.alert({
       title: 'Tip',
       template: 'Adding an image ensures that your opportunity stands out and helps to give some context as to what the opportunity is about!'
        });   
          
      };
    

}])


.controller('searchSupporters', ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http',
function ($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http) {
    
    $scope.showVolunt = false;
    $scope.voluntSection = function() {
    $scope.showVolunt = !$scope.showVolunt;
    };
    
}])

.controller('changePasswordCtrl', ['$scope', '$stateParams','authFactory','$state','jwtHelper', 'store','$rootScope','$http','$httpParamSerializerJQLike','$state','$ionicPopup',
function ($scope, $stateParams, authFactory,$state,jwtHelper, store,$rootScope,$http, $httpParamSerializerJQLike,$state,$ionicPopup) {
    
    var t1 = store.get('token');
    var tp = jwtHelper.decodeToken(t1);
    console.log(tp);
    
    $scope.data = {};
    
    $scope.submit = function() {
      
        $http({
        url: 'http://hoyportibppr.com/api/auth/changepass',
        method: 'POST',
        data: $httpParamSerializerJQLike($scope.data),//
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY' : '123456',
            'TOKEN' : t1
        }
      }) .success(function (data, status, headers, config) {
            $scope.PostDataResponse = data.status;
            console.log(data);

            if($scope.PostDataResponse == "success"){ // this if condition verify the response was an error and display the error to the user
        
           var alertPopup = $ionicPopup.alert({ // Pop up which shows the errors to the user
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
              
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = data.status;
                $scope.error1 = data.message.current_password;
                $scope.error2 = data.message.new_password;
                $scope.error3 = data.message.new_passconf;


            
            if($scope.ResponseDetails == "failure"){ // this if condition verify the response was an error and display the error to the user
        
                   var alertPopup = $ionicPopup.alert({ // Pop up which shows the errors to the user
                       title: 'Error!',
                       template: $scope.error1 || $scope.error2 || $scope.error3 || "The current password doesn't match." 
                   });     
                }// end of if
            
            });
        };
    
}])
