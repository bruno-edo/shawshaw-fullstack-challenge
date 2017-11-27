var sideBarCtrl = function($scope) {
    $scope.sideBarVisible = true;

    $scope.toggleSidaBar = function() {
        $scope.sideBarVisible = !$scope.sideBarVisible;
    };
};

var appCtrl = function($scope, $http, $q) {
    $scope.breedSearchKeyword = '';
    $scope.breedListFavorites = [];

    var getDogBreeds = function() {
        var deferred = $q.defer();

        $http.get('dogs/breeds').then(
            function(data, status, headers, config) {
            $scope.breedList = data.data;
            deferred.resolve();
        },
        function(error) {
            console.log(error);
            deferredd.reject();
            $scope.breedList = [];
        });

        return deferred.promise;
    };

    $scope.toggleFavorite = function(item) {
        item.favorite = !item.favorite;
    };

    $scope.breedList = getDogBreeds();
};

var breedCtrl = function($scope, $http, $stateParams, $q) {
    $scope.selectedBreedName = $stateParams.breedName;
    $scope.loading = true;

    var getDogBreedImages = function() {
        var deferred = $q.defer();
        
        $http.get('dogs/breeds/images', {
            params: {
                'breedName': $scope.selectedBreedName
            }
        }).then(
            function(data, status, headers, config) {
            $scope.loading = false;
            $scope.selectedBreedImages = data.data;
            deferred.resolve();
        },
        function(error) {
            console.log(error);
            deferredd.reject();
            $scope.selectedBreedImages = [];
        });

        return deferred.promise;
    };

    $scope.selectedBreedImages = getDogBreedImages();
};

var favoritesCtrl = function($scope, $q) {

};

myApp.controller('sideBarCtrl', sideBarCtrl)
     .controller('appCtrl', appCtrl)
     .controller('breedCtrl', breedCtrl)