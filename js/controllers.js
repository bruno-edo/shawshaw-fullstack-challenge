var sideBarCtrl = function($scope) {
    $scope.sidaBarVisible = true;

    $scope.toggleSidaBar = function() {
        $scope.sidaBarVisible = (!$scope.sidaBarVisible);
    }
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
    ]
}

myApp.controller('sideBarCtrl', sideBarCtrl)
     .controller('appCtrl', appCtrl)