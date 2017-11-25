myApp.config(function($stateProvider, $urlRouterProvider) {
    var homeState = {
      name: 'home',
      url: '/',
      templateUrl: 'templates/home.html'
    }

    var imagesState = {
      name: 'breed-images',
      url: '/images',
      templateUrl: 'templates/breed_images.html'
    }

    var favoritesState = {
      name: 'favorites',
      url: '/favorites',
      templateUrl: 'templates/favorites.html'
    }
    
    $stateProvider.state(homeState);
    $stateProvider.state(imagesState);
    $stateProvider.state(favoritesState);

    $urlRouterProvider.otherwise('/');
});