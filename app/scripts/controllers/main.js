'use strict';

/**
 * @ngdoc function
 * @name crtoolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the crtoolApp
 */
angular.module('crtoolApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams) {
    $scope.data = {
      loc : '?',
      totalTime : '?',
      avgTime : '?',
      times : '?',
      defectCount : '?',
      allDefects : 10,
      commentsCount : '?',
      avgInspectionRate : '?',
      allInspectionRates : '?',
      defectRate : '?',
      defectDensity : '?',
      efficiency : '?'
    };
    $scope.review = $routeParams.reviews;

    $http.get('http://localhost:3000/' + $routeParams.reviews)
      .then(
        function(result) {
          $scope.data.loc = result.data.loc;
          $scope.data.defectCount = result.data.defectCount;
          $scope.data.allDefects = 10;
          $scope.data.commentsCount = result.data.commentsCount;
          $scope.data.totalTime = result.data.time.total;
          $scope.data.avgTime = result.data.time.avg;
          $scope.data.times = result.data.time.all.join(', ');
          $scope.data.avgInspectionRate = result.data.inspectionRate.avg;
          $scope.data.allInspectionRates = result.data.inspectionRate.all.join(', ');
          $scope.data.defectDensity = result.data.defectDensity;
        },
        function() {
        }
      );
  });
