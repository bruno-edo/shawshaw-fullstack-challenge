var sideBarCtrl = function($scope) {
    $scope.sidaBarVisible = true;

    $scope.toggleSidaBar = function() {
        $scope.sidaBarVisible = (!$scope.sidaBarVisible);
    };
};

var appCtrl = function($scope) {
    $scope.breedSearchKeyword = "";
    $scope.breedList = [
        {
            'name': 'teste1'
        },
        {
            'name': 'teste2'
        }
    ];
    $scope.breedListFavorites = [];

    var getBreeds = function() {

    };

    var getBreedImages = function() {

    };
}

myApp.controller('sideBarCtrl', sideBarCtrl)
     .controller('appCtrl', appCtrl)