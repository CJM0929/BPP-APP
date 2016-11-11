angular.module('app.constants',['ngRoute', 'angular-jwt', 'angular-storage'])
//
//
.constant('CONFIG', {
 APIURL: "http://hoyportibppr.com/api",
})

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})

.config(function Config($httpProvider, jwtOptionsProvider) {
    jwtOptionsProvider.config({

      whiteListedDomains: ['http://hoyportibppr.com/api', 'localhost']
    })
})

//.config(["$routeProvider", "$httpProvider",  function ($routeProvider, $httpProvider) 
//{
//    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
//    
//    $routeProvider.when('/', {
//        redirectTo: "/profile"
//    })
//    .when("/profile", {
//        templateUrl: 'templates/profile.html',
//        controller: 'profileCtrl'
//    })
//    .when("/login", {
//        templateUrl: 'templates/login.html',
//        controller: 'loginCtrl'
//    })
//    
//}])

//
//.config(["$routeProvider", "$httpProvider", "jwtInterceptorProvider",  function ($routeProvider, $httpProvider, jwtInterceptorProvider) 
//{
//    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
//    
//    //en cada petición enviamos el token a través de los headers con el nombre Authorization
//    jwtInterceptorProvider.tokenGetter = function() {
//        return localStorage.getItem('token');
//    };
//    $httpProvider.interceptors.push('jwtInterceptor');
//
//	$routeProvider.when('/', {
//        redirectTo: "/profile"
//    })
//    .when("/profile", {
//        templateUrl: 'templates/profile.html',
//        controller: 'profileCtrl',
//        authorization: true
//    })
//    .when("/login", {
//        templateUrl: 'templates/login.html',
//        controller: 'loginCtrl',
//        authorization: false
//    })
//}])


//
//
//
//
//
//
//
//
//
//
//
//
//
////.constant('AUTH_EVENTS', {
////  notAuthenticated: 'auth-not-authenticated',
////  notAuthorized: 'auth-not-authorized'
////})
////
////.constant('USER_ROLES', {
////  admin: 'admin_role',
////  public: 'public_role'
////});
//
//
////.constant('CONFIG', {
////	TEMPLATE_DIR:"templates/",
////	ROL_CURRENT_USER: 1
////})
////
////.constant('ROLES', {
////	USER: {
////		ROL:1,
////		PATH:"/registered"
////	},
////	EUSER: {
////		ROL:2,
////		PATH:"/guest"
////	}
////})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
