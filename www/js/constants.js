//Constants.js linted:
angular.module('app.constants',[])
    .constant('CONFIG', 
              {
    APIURL: "https://hoyportibppr.com/api",
})
    .constant('AUTH_EVENTS', 
              {
    notAuthenticated: 'auth-not-authenticated'
})
    .config(function Config($httpProvider, jwtOptionsProvider) {
    jwtOptionsProvider.config({
        whiteListedDomains: ['https://hoyportibppr.com/api', 'localhost']
    });
});
