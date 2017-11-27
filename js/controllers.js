var sideBarCtrl = function($scope) {
    $scope.sideBarVisible = true;

    $scope.toggleSidaBar = function() {
        $scope.sideBarVisible = !$scope.sideBarVisible;
    };
};

var appCtrl = function($scope, $http, $q) {
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

        if(item.favorite) {
            $http.post('dogs/favorites', {
                'breedName': item.name
            }).then(
                function(data, status, headers, config) {

                },
                function(error) {
                    console.log(error);
                }
            );
        }

        else {
            $http.delete('dogs/favorites', {
                params: {
                    'breedName': item.name
                }
            }).then(
                function(data, status, headers, config) {

                },
                function(error) {
                    console.log(error);
                }
            );
        }
    };

    $scope.breedSearchKeyword = '';
    $scope.breedListFavorites = [];
    $scope.breedList = getDogBreeds();
};

var breedCtrl = function($scope, $http, $stateParams, $q) {
    $scope.toggleFavorite = function() {
        $scope.favorite = !$scope.favorite;

        if($scope.favorite) {
            $http.post('dogs/favorites', {
                'breedName': $scope.selectedBreedName
            }).then(
                function(data, status, headers, config) {
                    $scope.favorite
                },
                function(error) {
                    console.log(error);
                }
            );
        }
        else {
            $http.delete('dogs/favorites', {
                params: {
                    'breedName': $scope.selectedBreedName
                }
            }).then(
                function(data, status, headers, config) {

                },
                function(error) {
                    console.log(error);
                }
            );
        }
    };

    var isFavorite = function() {
        $http.get('dogs/favorites').then(
            function(data, status, headers, config) {
                var index = data.data.indexOf($scope.selectedBreedName);
                
                if(index == -1) {
                    $scope.favorite = false;
                }
                else {
                    $scope.favorite = true;
                }
            },
            function(error) {
                console.log(error);
            }
        );
    };

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
            }
        );

        return deferred.promise;
    };

    $scope.selectedBreedName = $stateParams.breedName;
    $scope.loading = true;
    isFavorite();
    $scope.selectedBreedImages = getDogBreedImages();
};

var favoritesCtrl = function($scope, $q) {

};

myApp.controller('sideBarCtrl', sideBarCtrl)
     .controller('appCtrl', appCtrl)
     .controller('breedCtrl', breedCtrl)