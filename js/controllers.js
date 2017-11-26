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
    $scope.selectedBreed = {
        'name' : 'Akita',
        'breedPhotoList' : ['https://vetstreet.brightspotcdn.com/dims4/default/84ab16c/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fdb%2F3b3280a40011e087a80050568d634f%2Ffile%2FAkita-2-645mk062111.jpg',
        'https://www.pets4homes.co.uk/images/breeds/42/large/547ae7c5ca5d55a9b7a44cc06d93536e.jpg', 'http://cdn2-www.dogtime.com/assets/uploads/gallery/akita-dogs-and-puppies/akita-dogs-puppies-1.jpg',
        'http://cdn.akc.org/6_Akita_Red.jpg', 
        'https://vetstreet.brightspotcdn.com/dims4/default/e577587/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F62%2F35%2Fcabe34064904a472dfdd450b7fee%2Fakita-AP-1BY6BI-645sm71113.jpg']
    };

    $scope.getBreeds = function() {

    };

    $scope.getBreedImages = function() {

    };

    $scope.toggleFavorite = function(item) {
        item.favorite = !item.favorite;
    };
}

myApp.controller('sideBarCtrl', sideBarCtrl)
     .controller('appCtrl', appCtrl)