var sideBarCtrl = function($scope) {
    $scope.sideBarVisible = true;

    $scope.toggleSidaBar = function() {
        $scope.sideBarVisible = !$scope.sideBarVisible;
    };
};

var appCtrl = function($scope) {
    $scope.breedSearchKeyword = "";
    $scope.breedList = [
        {
            'name': 'teste1',
            'favorite': true
        },
        {
            'name': 'teste2',
            'favorite': false
        }
    ];
    $scope.breedListFavorites = [];

    $scope.getBreeds = function() {

    };

    $scope.getBreedImages = function() {

    };

    $scope.toggleFavorite = function(item) {
        console.log('toggle');
        item.favorite = !item.favorite;
    };
}

myApp.controller('sideBarCtrl', sideBarCtrl)
     .controller('appCtrl', appCtrl)