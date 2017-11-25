var sideBarCtrl = function($scope) {
    $scope.sidaBarVisible = true;

    $scope.toggleSidaBar = function() {
        $scope.sidaBarVisible = (!$scope.sidaBarVisible);
    }
};

myApp.controller('sideBarCtrl', sideBarCtrl)