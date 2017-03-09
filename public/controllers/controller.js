var barApp = angular.module("myApp",[]);

barApp.controller('AppCtrl',['$scope','$http',
  function($scope,$http) {
    $scope.sortType = 'name';
    $scope.reverseSort = false;
    $scope.searchBar = "";
    $scope.bar;

    $scope.sortData = function(id) {
      $scope.reverseSort = ($scope.sortType === id) ? !$scope.reverseSort : false;
      $scope.sortType = id;
    }

    var refresh = function() {
      $http.get('/barlist').then(
        function(response) {
          console.log("I got the data I requested.");
          console.log(response);
          $scope.barlist = response.data;
          $scope.bar = null;
        }
      );
    }

    $scope.addBarToDB = function() {
      console.log($scope.bar);
      $http.post('/barlist', $scope.bar).then(
        function(response) {
          console.log(response);
          refresh();
        }
      );
    }

    $scope.remove = function(id) {
      console.log(id);
      $http.delete('/barlist/'+id).then(
        function(response) {
          console.log("test");
          refresh();
        }
      );
    }

    refresh();
  }
]);

barApp.filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
});
