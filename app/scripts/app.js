 (function() {
     function config($stateProvider, $locationProvider) {
       $locationProvider
         .html5mode({
          enabled: true,
          requireBase: false
       });
        
       $stateProvider
         .state('landing', {
             url: '/',
             controller: 'LandingCtrl as landing',
             templateUrl: '/templates/landing.html'
             
         })
       
        .state('album', {
             url: '/album',
             templateUrl: '/templates/album.html'
         })
       
        .state('collection', {
<<<<<<< HEAD
              url: '/collection',
              templateUrl: '/templates/collection.html'    
        });
=======
        url: '/collection',
        controller: 'CollectionCtrl as collection',
        templateUrl: '/templates/collection.html'
 });
       
       
       ;

>>>>>>> cp-5-ang-controllers
     }
   
angular
  .module('blocJams',['ui.router'])
  .config(config);

 })();


