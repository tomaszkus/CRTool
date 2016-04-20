'use strict';

/**
 * @ngdoc function
 * @name crtoolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the crtoolApp
 */
/* jshint ignore:start */
angular.module('crtoolApp')

  .controller('MainCtrl', function ($scope, $http, $routeParams) {
    $scope.reviews = [];
    var reviewIds = $routeParams.reviews.split(';');


    for(var i in reviewIds) {
      $http.get('http://localhost:3000/' + reviewIds[i])
        .then(
          function (result) {
            var data = {};
            data.id = result.data.id;
            data.loc = result.data.loc;
            data.defectCount = result.data.defectCount;
            data.allDefects = result.data.allDefects;
            data.commentsCount = result.data.commentsCount;
            data.totalTime = result.data.time.total;
            data.avgTime = result.data.time.avg;
            data.times = result.data.time.all.join(', ');
            data.avgInspectionRate = result.data.inspectionRate.avg;
            data.allInspectionRates = result.data.inspectionRate.all.join(', ');
            data.defectDensity = result.data.defectDensity;
            $scope.reviews.push(data);
          },
          function() {
          }
        );
    }
  });
/* jshint ignore:end */
