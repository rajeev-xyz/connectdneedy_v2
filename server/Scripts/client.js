var app = angular.module('needyapp', []);
app.controller('needyController', ['$scope', '$http', '$location', function($scope, $http, $location) {


    $scope.locationHidden = '';
    $scope.date = "29/05/2016";
    $scope.items = ["Food", "Clothes", "Toys", "Vegetables", "Fruits"];
    $scope.selectedItem = "Food";
    $scope.itemCount = 1;
    $scope.selectedTimeSlot = "10:00 - 13:00";
    $scope.peopleCount = 1;
    $scope.radius = 10;

    $('#datetimepicker').datetimepicker({
        format: 'dd/MM/yyyy',
    });


    $scope.subtractItem = function() {
        $scope.itemCount = $scope.itemCount - 1 > 0 ? $scope.itemCount - 1 : 0;
        console.log('Fulfil is ' + $scope.itemCount);
    };

    $scope.addItem = function() {
        $scope.itemCount = parseInt($scope.itemCount) + 1;
        console.log('Fulfil is ' + $scope.itemCount);
    };

    $scope.subtractPeople = function() {
        $scope.peopleCount = $scope.peopleCount - 1 > 0 ? $scope.peopleCount - 1 : 0;
        console.log('Fulfil is ' + $scope.peopleCount);
    };

    $scope.addPeople = function() {
        $scope.peopleCount = parseInt($scope.peopleCount) + 1;
        console.log('Fulfil is ' + $scope.peopleCount);
    };

    $scope.subtractRadius = function() {
        $scope.radius = $scope.radius - 1 > 0 ? $scope.radius - 1 : 0;
        console.log('Fulfil is ' + $scope.radius);
    };

    $scope.addRadius = function() {
        $scope.radius = parseInt($scope.radius) + 1;
        console.log('Fulfil is ' + $scope.radius);
    };

    $scope.saveProviderRec = function() {
        var obj = {};
        obj.item = $scope.selectedItem;
        obj.itemCount = $scope.itemCount;
        obj.peopleCount = $scope.peopleCount;
        obj.date = $scope.date;
        obj.selectedTimeSlot = $scope.selectedTimeSlot;
        var strLocation = document.getElementById('pac-input').value;
        strLocation = strLocation.split(', ');
        console.log('Location is ' + strLocation.join('+'));
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + strLocation.join('+') + '&key=AIzaSyAr9mUTDM3TlMHp1QNMFmIy4ro29ezV4kk'
        var placeID = $http.get(url).success(function(data, status) {
            obj.location = data.results[0].place_id;
            console.log('Request is ' + JSON.stringify(obj));
            $http.post('/saveProviderRec', {
                'providerRec': obj
            }).success(function() {
                alert('Thanks for helping..!!');
            });
        });
    };

    $scope.saveSeekerRec = function() {
        var obj = {};
        obj.item = $scope.selectedItem;
        obj.itemCount = $scope.itemCount;
        obj.peopleCount = $scope.peopleCount;
        obj.date = $scope.date;
        obj.selectedTimeSlot = $scope.selectedTimeSlot;
        var strLocation = document.getElementById('pac-input').value;
        strLocation = strLocation.split(', ');
        console.log('Location is ' + strLocation.join('+'));
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + strLocation.join('+') + '&key=AIzaSyAr9mUTDM3TlMHp1QNMFmIy4ro29ezV4kk'
        var placeID = $http.get(url).success(function(data, status) {
            $scope.location = data.results[0].place_id;
            obj.location = $scope.location;
            console.log('Request is ' + JSON.stringify(obj));
            $http.post('/saveSeekerRec', {
                'seekerRec': obj
            }).success(function() {
                alert('Thanks for helping..!!');
            });
        });
    };

    $scope.onChangeModel = function() {
        console.log('Vinod');
        var strLocation = document.getElementById('pac-input').value;
        strLocation = strLocation.split(', ');
        console.log('Location is ' + strLocation.join('+'));
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + strLocation.join('+') + '&key=AIzaSyAr9mUTDM3TlMHp1QNMFmIy4ro29ezV4kk'
        var placeID = $http.get(url).success(function(data, status) {
            console.log('Place id is ' + data.results[0].place_id);
            $scope.locationHidden = data.results[0].place_id;
            console.log($scope.locationHidden + " " + document.querySelector('#locatePlaceId').value);
        });
    }

    $scope.saveVolunteerRec = function() {
        var obj = {};
        obj.radius = $scope.radius;
        obj.itemCount = $scope.itemCount;
        obj.peopleCount = $scope.peopleCount;
        obj.date = $scope.date;
        obj.selectedTimeSlot = $scope.selectedTimeSlot;
        var strLocation = document.getElementById('pac-input').value;
        strLocation = strLocation.split(', ');
        console.log('Location is ' + strLocation.join('+'));
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + strLocation.join('+') + '&key=AIzaSyAr9mUTDM3TlMHp1QNMFmIy4ro29ezV4kk'
        var placeID = $http.get(url).success(function(data, status) {
            $scope.location = data.results[0].place_id;
            obj.location = $scope.location;
            console.log('Request is ' + JSON.stringify(obj));
            $http.post('/saveVolunteerRec', {
                'volunteerRec': obj
            }).success(function() {
                alert('Thanks for helping..!!');
            });
        });
    };

    $scope.getNeighbours = function(){
    $http.post('/https://api.havenondemand.com/1/api/sync/getneighbors/v1?graph=needy_locations_graph&max_results=6&target_names=porvider_location_graph&apikey=37f8b8b5-c0b3-4ae3-af72-e07d24a090d6',{'needy_locations_graph':needy_locations_graph,'porvider_location_graph':porvider_location_graph}).success(function(data,status){
        console.log(data);
        //alert('Thanks for helping..!!');
    });
 };
 
 $scope.getNodeClosest = function(){
     $http.post('https://api.havenondemand.com/1/api/sync/getneighbors/v1?graph=needy_locations_graph&max_results=6&target_names=porvider_location_graph&apikey=37f8b8b5-c0b3-4ae3-af72-e07d24a090d6',      {'needy_locations_graph':needy_locations_graph,'porvider_location_graph':porvider_location_graph}).success(function(data,status){
         console.log(data);
          //alert('Thanks for helping..!!');
        }); 
 };

}]);