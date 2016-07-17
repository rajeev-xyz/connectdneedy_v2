// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'starter.directives'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('map', {
            url: '/map',
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl'
        })
        .state('extendedMap', {
            url: '/extendedMap',
            templateUrl: 'templates/extendedMap.html',
            controller: 'providerCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        })
        .state('provider', {
            url: '/provider',
            templateUrl: 'templates/provider.html',
            controller: 'providerCtrl'
        })
        .state('seeker', {
            url: '/seeker',
            templateUrl: 'templates/seeker.html',
            controller: 'providerCtrl'
        })
        .state('volunteer', {
            url: '/volunteer',
            templateUrl: 'templates/volunteer.html',
            controller: 'volunteerCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: 'appLoginCtrl'
        })
        .state('login', {
            url: '/',
            templateUrl: 'templates/login.html',
            controller: 'appLoginCtrl'
        });

    $urlRouterProvider.otherwise("/");

})

.controller('appLoginCtrl', function ($scope, $http, $state) {

        $scope.authorization = {
            username: '',
            password: ''
        };

        $scope.signIn = function (form) {
            if (form.$valid) {
                $state.go('home');
            }
        };
    
    $scope.createAccount = function(){
        console.log('create account here');   
    }
    })
    .controller('homeCtrl', function ($scope, $state, $http, $timeout) {

        $scope.showDetailsForUser = function (userRole) {
            $timeout(function () {
                $state.go(userRole);
            }, 500);
        }

    })
    .controller('extendedMapCtrl', function ($scope, $http, $state) {

        $scope.showDetailsForUser = function (userRole) {
            $state.go(userRole);
        }

    })
    .controller('seekerCtrl', function ($scope, $http, $state) {

        $scope.showDetailsForUser = function (userRole) {
            $state.go(userRole);
        }

    })
    .controller('MapCtrl', function ($scope, $state, $http, $cordovaGeolocation) {
        console.log('Inside Map controller');
        var options = {
            enableHighAccuracy: true,
            timeout: 2 * 1000
        };

        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
            console.log('Entering search position');
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            console.log('Longitude ' + latLng);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
            console.log('Longitude ' + $scope.map);
            //Wait until the map is loaded
            google.maps.event.addListenerOnce($scope.map, 'idle', function () {

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });

                var infoWindow = new google.maps.InfoWindow({
                    content: "Here I am!"
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.open($scope.map, marker);
                });

            });
        }, function (error) {
            console.log("Could not get location");
        })
    })
    .controller('providerCtrl', function ($scope, $http, $state, $cordovaGeolocation,$ionicPopup, $cordovaDatePicker) {
        $scope.model = {};
        $scope.model.itemCount = 2;
        $scope.model.peopleCount = 2;
        $scope.model.date = new Date();
        $scope.model.selectedItem = 'Food';
        $scope.model.selectedTimeSlot = '';
        $scope.model.map = ''
        var latLng = '';
        var server = 'http://52.5.146.88:3001';

        $scope.disableTap = function () {
            container = document.getElementsByClassName('pac-container');
            // disable ionic data tab
            angular.element(container).attr('data-tap-disabled', 'true');
            // leave input field if google-address-entry is selected
            angular.element(container).on("click", function () {
                document.getElementById('searchBar').blur();
            });
        };
        $scope.getDates = function () {
            var options = {
                date: new Date(),
                mode: 'date', // or 'time'
                minDate: new Date() - 10000,
                allowOldDates: true,
                allowFutureDates: false,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#F2F3F4',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            };

            document.addEventListener("deviceready", function () {

                $cordovaDatePicker.show(options).then(function (date) {
                    alert(date);
                });

            }, false);
        };

        $scope.subtractItem = function () {
            $scope.model.itemCount = $scope.model.itemCount - 1 > 0 ? $scope.model.itemCount - 1 : 0;
            console.log('Fulfil is ' + $scope.model.itemCount);
        };

        $scope.addItem = function () {
            $scope.model.itemCount = parseInt($scope.model.itemCount) + 1;
            console.log('Fulfil is ' + $scope.model.itemCount);
        };

        $scope.subtractPeople = function () {
            $scope.model.peopleCount = $scope.model.peopleCount - 1 > 0 ? $scope.model.peopleCount - 1 : 0;
            console.log('Fulfil is ' + $scope.model.peopleCount);
        };

        $scope.addPeople = function () {
            $scope.model.peopleCount = parseInt($scope.model.peopleCount) + 1;
            console.log('Fulfil is ' + $scope.peopleCount);
        };

        $scope.subtractRadius = function () {
            $scope.radius = $scope.radius - 1 > 0 ? $scope.radius - 1 : 0;
            console.log('Fulfil is ' + $scope.radius);
        };

        $scope.addRadius = function () {
            $scope.radius = parseInt($scope.radius) + 1;
            console.log('Fulfil is ' + $scope.radius);
        };

        var latLng = new google.maps.LatLng(17.3840500, 78.4563600);
        var options = {
            enableHighAccuracy: true,
            timeout: 5 * 1000
        };
        $scope.saveRec = function (typeOfRec) {
            if (typeOfRec == 'provider') {
                //alert('selectedItem ' + $scope.model['selectedItem'] + ' \ndate ' + $scope.model['date'] + ' \ntime slot ' + $scope.model['selectedTimeSlot'] + ' \nItems ' + $scope.model['peopleCount'] + ' \nloation ' + latLng);
                $ionicPopup.alert({
                        title: 'Connect The Needy',
                        template: 'Thanks for providing your help.'
                    });
                
                $http({
                    method: 'POST',
                    url: server + '/providers',
                    data: {
                        'location': {
                            lat: latLng.lat(),
                            lng: latLng.lng()
                        },
                        'radius': 10,
                        'availDate': $scope.model['date'],
                        'slot': $scope.model['selectedTimeSlot'],
                        'quantity': $scope.model['peopleCount'],
                        'itemType': $scope.model['selectedItem']
                    }
                }).success(function () {
                    console.log('Provider Items Saved');
                });
            }
            if (typeOfRec == 'seeker') {
                //alert('seeker');
                $ionicPopup.alert({
                        title: 'Connect The Needy',
                        template: 'We will send you details on your email'
                    });
            }
        }
        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
            console.log('Entering search position');
            latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            console.log('Longitude ' + latLng);
            initialize();
        }, function (error) {
            console.log("Could not get location, using default location");
            initialize();
        })

        function initialize() {
            console.log('Initializing location map for coordinates ' + latLng)
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            console.log('Map DOm ' + document.getElementById('map'));
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);

            google.maps.event.addListenerOnce(map, 'idle', function () {
                console.log('Map is loaded');
                var marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });

                var infoWindow = new google.maps.InfoWindow({
                    content: "Here You are!"
                });
                infowindow.setContent('<div><strong> You are Here </strong></div>');
                infowindow.open(map, marker);
                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.open(map, marker);
                });

            });

            var input = (document.getElementById('pac-input'));

            // Create the autocomplete helper, and associate it with
            // an HTML text input box.
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                map: map
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

            // Get the full place details when the user selects a place from the
            // list of suggestions.
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                infowindow.close();
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                // Set the position of the marker using the place ID and location.
                marker.setPlace( /** @type {!google.maps.Place} */ ({
                    placeId: place.place_id,
                    location: place.geometry.location
                }));
                latLng = '(' + place.geometry.location.lat() + ', ' + place.geometry.location.lng() + ')';
                marker.setVisible(true);

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '<br>' +
                    place.formatted_address + '</div>');
                infowindow.open(map, marker);
            });


        }

        // Run the initialize function when the window has finished loading.
        //google.maps.event.addDomListener(window, 'load', initialize);

    })
    .controller('volunteerCtrl', function ($scope, $state, $http, $cordovaGeolocation, $ionicPopup, $compile) {
        var thisScope = $scope;
        $scope.vmodel = {};
        $scope.vmodel.radius = 2;
        $scope.vmodel.date = new Date();
        $scope.vmodel.selectedTimeSlot = '';
        var map = '';
        var latLng = '';

        $scope.disableTap = function () {
            container = document.getElementsByClassName('pac-container');
            // disable ionic data tab
            angular.element(container).attr('data-tap-disabled', 'true');
            // leave input field if google-address-entry is selected
            angular.element(container).on("click", function () {
                document.getElementById('searchBar').blur();
            });
        };
        $scope.getDates = function () {
            var options = {
                date: new Date(),
                mode: 'date', // or 'time'
                minDate: new Date() - 10000,
                allowOldDates: true,
                allowFutureDates: false,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#F2F3F4',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            };

            document.addEventListener("deviceready", function () {

                $cordovaDatePicker.show(options).then(function (date) {
                    alert(date);
                });

            }, false);
        };

        $scope.subtractRadius = function () {
            $scope.vmodel.radius = $scope.vmodel.radius - 1 > 0 ? $scope.vmodel.radius - 1 : 0;
            console.log('Fulfil is ' + $scope.vmodel.radius);
        };

        $scope.addRadius = function () {
            $scope.vmodel.radius = parseInt($scope.vmodel.radius) + 1;
            console.log('Fulfil is ' + $scope.vmodel.radius);
        };

        var latLng = new google.maps.LatLng(17.3840500, 78.4563600);
        var options = {
            enableHighAccuracy: true,
            timeout: 5 * 1000
        };
        $scope.saveRec = function (typeOfRec) {
            if (typeOfRec == 'provider') {
                console.log('selectedItem ' + $scope.vmodel['selectedItem'] + ' \ndate ' + $scope.vmodel['date'] + ' \ntime slot ' + $scope.vmodel['selectedTimeSlot'] + ' \nItems ' + $scope.vmodel['peopleCount'] + ' \nloation ' + latLng);
                console.log('selectedItem ' + $scope.vmodel['selectedItem'] + ' \ndate ' + $scope.vmodel['date'] + ' \ntime slot ' + $scope.vmodel['selectedTimeSlot'] + ' \nItems ' + $scope.vmodel['peopleCount'] + ' \nloation ' + latLng);
            }

        }

        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
            console.log('Entering search position');
            latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            console.log('Longitude ' + latLng);
            initialize();
        }, function (error) {
            console.log("Could not get location, using default location");
            initialize();
        })

        function initialize() {
            console.log('Initializing location map for coordinates ' + latLng)
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };


            map = new google.maps.Map(document.getElementById('map'), mapOptions);

            google.maps.event.addListenerOnce(map, 'idle', function () {
                console.log('Map is loaded');
                var marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });

                var infoWindow = new google.maps.InfoWindow({
                    content: "Here You are!"
                });
                infowindow.setContent('<div><strong> You are Here </strong></div>');
                infowindow.open(map, marker);
                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.open(map, marker);
                });
            });

            var input = (document.getElementById('pac-input'));

            // Create the autocomplete helper, and associate it with
            // an HTML text input box.
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                map: map
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

            // Get the full place details when the user selects a place from the
            // list of suggestions.
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                infowindow.close();
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                // Set the position of the marker using the place ID and location.
                marker.setPlace( /** @type {!google.maps.Place} */ ({
                    placeId: place.place_id,
                    location: place.geometry.location
                }));
                latLng = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
                marker.setVisible(true);

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '<br>' +
                    place.formatted_address + '</div>');
                infowindow.open(map, marker);
            });


        }
        var server = 'http://52.5.146.88:3001';
        var all_locations = [{
                role: 'Provider',
                itemType: "Food",
                number: "5",
                name: "Mallesh",
                lat: 17.4649711,
                lng: 78.3617583
    },
            {
                role: 'Seeker',
                itemType: "Food",
                number: "5",
                name: "Tulip Park -Kedar",
                lat: 17.4666408,
                lng: 78.36309940000001
    }, {
                role: 'Provider',
                itemType: "Food",
                number: "5",
                name: "Restaurant",
                lat: 17.471568,
                lng: 78.360044
    }, {
                role: 'Seeker',
                itemType: "Food",
                number: "5",
                name: "NGO ",
                lat: 17.456075,
                lng: 78.333090
    }];
        //--- method to be added for near loc
        var volMap = {
            provider: '',
            seeker: ''
        };
        $scope.connectLoc = '';
        $scope.checkConnectMap = function (connectMap) {
            console.log('connect is called ' + connectMap.connectLoc.role);

            if (connectMap.connectLoc.role == 'Seeker') {
                volMap.seeker = connectMap.connectLoc;
                if (!volMap.provider) {
                    $ionicPopup.alert({
                        title: 'Connect The Needy',
                        template: 'Now, Please select Help-Provider from Map'
                    });
                }
            }

            if (connectMap.connectLoc.role == 'Provider') {
                volMap.provider = connectMap.connectLoc;
                if (!volMap.seeker) {
                    $ionicPopup.alert({
                        title: 'Connect The Needy',
                        template: 'Now, Please select Help-Seeker from Map'
                    });
                }
            }
            console.log('volmap ' + volMap);
            if (volMap.provider != '' && volMap.seeker != '') {
                //alert('Thanks for connecting ' + volMap.provider.name + ' and ' + volMap.seeker.name);
                $ionicPopup.alert({
                    title: 'Connect The Needy',
                    template: 'Now you are connected with help-provider and help-seeker\n.Please check your email for more details'
                });
            }


        }


        var radius_circle = null;
        var markers_on_map = [];
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        $scope.callMe = function () {
            alert('called');
        }
        $scope.showCloseLocations = function () {
            console.log('In Nearest location method');

            /* $http({
                      method: 'POST',
                      url: server + '/volunteers',
                      data: {
                      'location': {lat:latLng.lat(), lng:latLng.lng()},
                      'radius' : 10,
                      'availDate' : $scope.vmodel['date'],
                      'slot': $scope.vmodel['selectedTimeSlot'],
                      'quantity' : $scope.vmodel['peopleCount'],
                      'itemType' : $scope.vmodel['selectedItem']
              }}).then(function(res) {
                  console.log('Volunteer Items Saved' + JSON.stringify(res));
                  //all_locations = res.data;
                  window.location.href = "#/connected";
              });*/
            var i;
            var radius_km = $scope.vmodel.radius;
            //window.location.href = "#/connected";
            //remove all radii and markers from map before displaying new ones
            if (radius_circle) {
                radius_circle.setMap(null);
                radius_circle = null;
            }
            for (i = 0; i < markers_on_map.length; i++) {
                if (markers_on_map[i]) {
                    markers_on_map[i].setMap(null);
                    markers_on_map[i] = null;
                }
            }

            if (geocoder) {
                console.log('In geo ' + latLng);
                geocoder.geocode({
                    'location': latLng
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                            radius_circle = new google.maps.Circle({
                                center: latLng,
                                radius: radius_km * 1000,
                                clickable: false,
                                map: map
                            });
                            if (radius_circle) map.fitBounds(radius_circle.getBounds());
                            for (var j = 0; j < all_locations.length; j++) {
                                console.log('location array size ' + all_locations.length);
                                (function (location) {
                                    console.log('executing radius ' + j);
                                    var marker_lat_lng = new google.maps.LatLng(location.lat, location.lng);
                                    console.log('mRKER ' + marker_lat_lng);
                                    var distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(latLng, marker_lat_lng); //distance in meters between your location and the marker
                                    var label = location.role == 'Provider' ? "P" : "S";
                                    var action = location.role == 'Provider' ? "give" : "take";
                                    if (distance_from_location <= radius_km * 1000) {
                                        var new_marker = new google.maps.Marker({
                                            position: marker_lat_lng,
                                            map: map,
                                            title: location.name,
                                            label: label
                                        });
                                        google.maps.event.addListener(new_marker, 'click', function () {
                                            if (infowindow) {
                                                infowindow.setMap(null);
                                                infowindow = null;
                                            }
                                            $scope.connectLoc = location;
                                            var contentString = '<div style="color:green"> ' + 'Help-' + location.role + '</br>Name: ' + location.name +
                                                '</br> Distance from your location : ' + parseFloat(distance_from_location / 1000).toFixed(2) + "km" + '</br> Ready to  ' + action + " " + location.itemType + ' for ' + location.number +
                                                '</br> <a  ng-click="checkConnectMap(this)">Click here to if you want to volunteer for this user</a></div>'
                                            var compiled = $compile(contentString)(thisScope);
                                            //console.log(compiled);
                                            infowindow = new google.maps.InfoWindow({
                                                content: compiled[0],
                                                size: new google.maps.Size(150, 50),
                                                pixelOffset: new google.maps.Size(0, -30),
                                                position: marker_lat_lng,
                                                map: map
                                            });
                                        });
                                        markers_on_map.push(new_marker);
                                    }
                                })(all_locations[j]);
                            }
                        } else {
                            alert("No results found while geocoding!");
                        }
                    } else {
                        alert("Geocode was not successful: " + status);
                    }
                });
            }
        }


    });