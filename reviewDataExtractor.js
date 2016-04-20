exports.getLoc = function(input) {
  var items = input.reviewItems.reviewItem;
  var total = 0;
  for (var i in items) {
    total += parseInt(items[i].expandedRevisions[0].changedLines);
  }

  return total;
};

function getDefectsCountFrom(comments) {
  var total = 0;
  for (var i in comments) {
      var item = comments[i];
      if (item.defectRaised === true && item.deleted === false) {
        total += 1;
          }
      }
  return total;
};

function getCommentsCountFrom(comments) {
  var total = 0;
  for (var i in comments) {
    var item = comments[i];
    if (item.defectRaised === false && item.deleted === false) {
      total += 1;
    }
  }
  return total;
};

exports.getDefectsCount = function(input) {
  var generalComments = input.generalComments.comments;
  var versionedComments = input.versionedComments.comments;
  return getDefectsCountFrom(generalComments) + getDefectsCountFrom(versionedComments);
};

exports.getCommentsCount = function(input) {
  var generalComments = input.generalComments.comments;
  var versionedComments = input.versionedComments.comments;
  return getCommentsCountFrom(generalComments) + getCommentsCountFrom(versionedComments);
};

exports.getTime = function(input) {
  var items = input.reviewers.reviewer;
  var total = 0;
  var all = [];
  for (var i in items) {
    var current = parseInt(items[i].timeSpent);
    if (!isNaN(current)) {
      total += current;
      all.push(Math.floor(current / 6000));
    }

  }
  total = Math.floor(total / 6000);

  return {
    total: total,
    avg: Math.floor(total / items.length),
    all: all
  }
};

exports.getInspectionRate = function(timesSpent, loc) {
  var all = [];
  var total = 0;
  
  if (timesSpent.length === 0) {
    return {
      avg: 0,
      all: []
    }
  }

  for (var i in timesSpent) {
    var current = Math.floor(loc / timesSpent[i] * 60);
    all.push(Math.floor(current));
    total += current;
  }
  return {
    avg: Math.floor(total / timesSpent.length),
    all: all
  }
};

exports.getDefectDensity = function(defectCount, loc) {
  return Math.floor(defectCount / loc * 1000);
};
