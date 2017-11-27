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
            $scope.loading = false;
            $scope.breedList = data.data;
            deferred.resolve();
        },
        function(error) {
            console.log(error);
            deferred.reject();
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

    $scope.loading = true;
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
        var breedList = [];
        breedList.push($scope.selectedBreedName);
        
        $http.get('dogs/breeds/images', {
            params: {
                'breedNames': JSON.stringify(breedList)
            }
        }).then(
            function(data, status, headers, config) {
                $scope.loading = false;
                $scope.selectedBreedImages = data.data[0].images;
                deferred.resolve();
            },
            function(error) {
                console.log(error);
                deferred.reject();
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

var favoritesCtrl = function($scope, $http, $q) {
    var getDogBreedImages = function(breedList) {
        var deferred = $q.defer();

        $http.get('dogs/breeds/images', {
            params: {
                'breedNames': JSON.stringify(breedList),
                'imageCount': 5
            }
        }).then(
            function(data, status, headers, config) {
                $scope.loading = false;
                $scope.favoriteBreeds = data.data;
                deferred.resolve();
            },
            function(error) {
                console.log(error);
                deferred.reject();
                $scope.favoriteBreeds = [];
            }
        );

        return deferred.promise;
    };

    var getFavorites = function() {
        $http.get('dogs/favorites').then(
            function(data, status, headers, config) {
                $scope.favoriteBreeds = getDogBreedImages(data.data);
            },
            function(error) {
                console.log(error);
                $scope.favoriteBreeds = [];
            }
        );
    };

    $scope.removeFromFavorites = function(item) {
        $http.delete('dogs/favorites', {
            params: {
                'breedName': item.name
            }
        }).then(
            function(data, status, headers, config) {
                var index = $scope.favoriteBreeds.indexOf(item);
                $scope.favoriteBreeds.splice(index, 1);
            },
            function(error) {
                console.log(error);
            }
        );
    };

    getFavorites();
    $scope.loading = true;

};

myApp.controller('sideBarCtrl', sideBarCtrl)
     .controller('appCtrl', appCtrl)
     .controller('breedCtrl', breedCtrl)
     .controller('favoritesCtrl', favoritesCtrl)