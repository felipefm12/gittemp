var app = angular.module('catsvsdogs', []);
var socket = io.connect();

app.controller('statsCtrl', function ($scope) {
  $scope.aPercent = 50;
  $scope.bPercent = 50;

  var updateSimilarities = function () {
    socket.on('similarities', function (json) {
      console.log('Received similarities:', json);
      var data = JSON.parse(json);

      // Extraer el único valor del objeto
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          $scope.similarity = data[key];
          break; // Solo necesitas la primera clave
        }
      }

      console.log('$scope.similarity:', $scope.similarity);
      console.log('Similarity:', $scope.similarity);
      $scope.$apply(); // Asegúrate de aplicar los cambios al ámbito de AngularJS
    });
  };
  
  var updateRatings = function () {
    socket.on('ratings', function (json) {
      console.log('Received ratings:', json);
      var data = JSON.parse(json);

      // Puedes hacer lo que necesites con los datos de ratings, por ejemplo:
      $scope.ratings = data;
      
      console.log('$scope.ratings:', $scope.ratings);
      $scope.$apply(); // Asegúrate de aplicar los cambios al ámbito de AngularJS
    });
  };

  var init = function () {
    console.log('Initializing...');
    document.body.style.opacity = 1;
    updateSimilarities();
    updateRatings();
  };

  socket.on('message', function (data) {
    init();
  });
});
