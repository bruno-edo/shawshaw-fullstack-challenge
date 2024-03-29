myApp.config(function($stateProvider, $urlRouterProvider) {
    var homeState = {
      name: 'home',
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'appCtrl'
    }

    var imagesState = {
      name: 'breed-images',
      url: '/images/:breedName',
      templateUrl: 'templates/breed_images.html',
      controller: 'breedCtrl'
    }

    var favoritesState = {
      name: 'favorites',
      url: '/favorites',
      templateUrl: 'templates/favorites.html',
      controller: 'favoritesCtrl'
    }
    
    $stateProvider.state(homeState);
    $stateProvider.state(imagesState);
    $stateProvider.state(favoritesState);

    $urlRouterProvider.otherwise('/');
});