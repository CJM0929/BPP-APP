angular.module('app.services', [])
/////////////////////////////////////// 
/////////////////////////////////////// 
/////////////////////////////////////// 

.factory('Profile', ["$http", "$q", "CONFIG", ,"CordovaCamera", function($http, $q, CONFIG, CordovaCamera)
{

// SET  users/$uid/profilePicture
  self.changeProfilePicture = function(sourceTypeIndex, uid) {
    return CordovaCamera.newImage(sourceTypeIndex, 200).then(
      function(imageData){
        if(imageData != undefined) {
          return self.setGlobal(uid, 'profilePicture', imageData);
        } else {
          return imageData;
        }
      }, function(error){
        Codes.handleError(error);
      }
    );
  };
    
}])




.factory('eProfiles', [function(){
    
var profiles = [{
    id: 0,
    name: 'Animal Aid',
    avatar: 'img/gt-animal-aid-foundation.jpg',
    background: 'img/IMG_3683.jpg',
    about: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip .',
    streetline1: 'Calle I dont Know',
    streetline2: '',
    city: 'San Juan',
    state: 'PR',
    category: 'Animals',
    zipcode: '00926',
    phone: '7876228000',
    website: 'www.bpp.com',
    email: 'example@gmail.com',
    
  }, {
    id: 1,
    name: 'Peace 4 Animals',
    avatar: 'img/p4a.png',
    background: 'img/gt-animal-aid-foundation.jpg',
    about: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    streetline1: 'Calle I dont Know',
    streetline2: '',
    city: 'San Juan',
    state: 'PR',
    category: 'Animals',
    zipcode: '00926',
    phone: '7876228000',
    website: 'www.bpp.com',
    email: 'example@gmail.com',
  }, {
    id: 2,
	name: 'World Animal Fundation',
    avatar: 'img/WAF_LOGO.png',
    background: 'img/gt-animal-aid-foundation.jpg',
    about: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    streetline1: 'Calle I dont Know',
    streetline2: '',
    city: 'San Juan',
    state: 'PR',
    category: 'Animals',
    zipcode: '00926',
    phone: '7876228000',
    website: 'www.bpp.com',
    email: 'example@gmail.com',
      
  }, {
    id: 3,
    name: 'ASPCA',
    avatar: 'img/aspca(1).jpg',
    background: 'img/gt-animal-aid-foundation.jpg',
    about: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    streetline1: 'Calle I dont Know',
    streetline2: '',
    city: 'San Juan',
    state: 'PR',
    category: 'Animals',
    zipcode: '00926',
    phone: '7876228000',
    website: 'www.bpp.com',
    email: 'example@gmail.com',
  }, {
    id: 4,
	name: 'WSPA',
    avatar: 'img/world-society-for-protection-of-animals.jpg',
    avatar: 'img/gt-animal-aid-foundation.jpg',
    about: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    streetline1: 'Calle I dont Know',
    streetline2: '',
    city: 'San Juan',
    state: 'PR',
    category: 'Animals',
    zipcode: '00926',
    phone: '7876228000',
    website: 'www.bpp.com',
    email: 'example@gmail.com',
    
  }];
    
  return {
    all: function() {
      return profiles;
    },
    remove: function(id) {
      profiles.splice(profiles.indexOf(id), 1);
    },
    get: function(profileId) {
      for (var i = 0; i < profiles.length; i++) {
        if (profiles[i].id === parseInt(profileId)) {
          return profiles[i];
        }
      }
      return null;
    }
  };
}])
/////////////////////////////////////// 
/////////////////////////////////////// 
/////////////////////////////////////// 








.factory('uProfiles', [function(){
    
var profiles = [{
    id: 0,
    name: 'Christian Morales',
    avatar: 'img/user.jpg'  
  }];
    
    
  return {
    all: function() {
      return profiles;
    },
    remove: function(id) {
      profiles.splice(profiles.indexOf(id), 1);
    },
    get: function(profileId) {
      for (var i = 0; i < profiles.length; i++) {
        if (profiles[i].id === parseInt(profileId)) {
          return profiles[i];
        }
      }
      return null;
    }
  };
    
    
    
    

}])

.factory("userData", ["$http", "$q", "CONFIG", function($http, $q, CONFIG)
{
    return{
        get: function()
        {
            var deferred;
            deferred = $q.defer();
            $http({
                method: 'GET',
                skipAuthorization: true,//es necesario enviar el token
                url: CONFIG.APIURL+'/supporters',
                 headers: {'Content-Type': 'application/x-www-form-urlencoded',
                           'Accept': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
            })
            .then(function(res)
            {
                deferred.resolve(res);
            })
            .then(function(error)
            {
                deferred.reject(error);
            })
            return deferred.promise;
        }
    }
}])

.factory("authFactory", ["$http", "$q", "CONFIG","$ionicPopup","$ionicLoading", function($http, $q, CONFIG, $ionicPopup,$ionicLoading)
{
    ////////////////////////////////////////////////////////////////
	return {
		login: function(user)
		{
			var deferred;
            deferred = $q.defer();
            $http({
                method: 'POST',
                skipAuthorization: true,//no queremos enviar el token en esta petición
                url: CONFIG.APIURL+'/auth/login',
                data: "username=" + user.username + "&password=" + user.password,
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                          'X-API-KEY' : '123456'}
            })
            .then(function(res)
            {
                 
                deferred.resolve(res);

            },
            
            function errorCallback(error) {
                
              var PostDataResponse = error.data.status;
//              var usernameError = error.data.message.username;
//              console.log(usernameError)


              console.log(PostDataResponse)
              
              if(PostDataResponse == "failure"){ 
        
               var alertPopup = $ionicPopup.alert({
                   title: 'Error!',
                   template: "The credentials used to log in were invalid or this user does not exist"
               });     

                }
                
            })
            
            
            
//            .then(function(error)
//            {
//                deferred.reject(error);
//            })
            return deferred.promise;
		}
	}
    //////////////////////////////////////////////////////////////////////
}])


.service('multipartForm', function($http,store,jwtHelper) {
    
    // Token retrieval
    var t1 = store.get('token');
    // Function to decode token
    var tp = jwtHelper.decodeToken(t1);
    
    this.post = function(uploadUrl, data){
		var fd = new FormData();
		for(var key in data)
			fd.append(key, data[key]);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.indentity,
			headers: { 'Content-Type': undefined,'X-API-KEY' : '123456',      
            'TOKEN' : t1 
            }
		});
    }
})




















.service('AuthService', function($q, $http, CONFIG, store) {
  var token = 'yourTokenKey';
  var isAuthenticated = false;
  var authToken;
 
  function loadUserCredentials() {
    var token = store.get('token');
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(token) {
    window.store.set('token', token);
    useCredentials(token);
  }
 
  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
    // Set the token as header for your requests!
//    $http.defaults.headers.common.Authorization = authToken;
  }
 
 
  loadUserCredentials();
 
  
})
 







.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})



//
//         
//.factory("Data", ['$http', 'toaster',
//    function ($http, toaster) { // This service connects to our REST API
// 
//        var serviceBase = 'api/v1/';
// 
//        var obj = {};
//        obj.toast = function (data) {
//            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
//        }
//        obj.get = function (q) {
//            return $http.get(serviceBase + q).then(function (results) {
//                return results.data;
//            });
//        };
//        obj.post = function (q, object) {
//            return $http.post(serviceBase + q, object).then(function (results) {
//                return results.data;
//            });
//        };
//        obj.put = function (q, object) {
//            return $http.put(serviceBase + q, object).then(function (results) {
//                return results.data;
//            });
//        };
//        obj.delete = function (q) {
//            return $http.delete(serviceBase + q).then(function (results) {
//                return results.data;
//            });
//        };
// 
//        return obj;
//}])

//
//
//
//.service('BlankService', [function(){
//
//}]);


