var barApp = angular.module("myApp",[]);

barApp.controller('AppCtrl',['$scope','$http',
  function($scope,$http) {
    console.log("Hello from controller.");

    $http.get('/barlist').then(
      function(response) {
        console.log("I got the data I requested.");
        console.log(response);
        $scope.barlist = response.data;
      }
    );
  }
]);
