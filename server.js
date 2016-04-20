var express = require('express');
var http = require('http');
var request = require('request');
var extractor = require('./reviewDataExtractor.js');
var app = module.exports = express();

app.get('/:review', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
  request('http://localhost:8060/rest-service/reviews-v1/' + req.params.review + '/details.json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var reviewData = JSON.parse(body);
      var calculatedData = {};
      calculatedData.id = req.params.review;
      calculatedData.allDefects = getDefectsForReview(calculatedData.id);
      calculatedData.loc = extractor.getLoc(reviewData);
      calculatedData.defectCount = extractor.getDefectsCount(reviewData);
      calculatedData.commentsCount = extractor.getCommentsCount(reviewData);
      calculatedData.time = extractor.getTime(reviewData);
      calculatedData.inspectionRate = extractor.getInspectionRate(calculatedData.time.all, calculatedData.loc);
      calculatedData.defectDensity = extractor.getDefectDensity(calculatedData.defectCount, calculatedData.loc);
      res.send(calculatedData)
    } else {
      res.send('Error')
    }
  })
});

function getDefectsForReview(id) {
  switch (id) {
    case 'CR-1': return 50;
    case 'CR-2': return 70;
    default: return 100;

  }
}
