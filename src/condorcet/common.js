define(["lodash"], function (_) {

var common = {};

function ballotToPairs (ballot, candidates) {
  var voteWeight = ballot.count || 1;
  var ranks = ballot.ranks;
  var result = Object.create(null);
  _.forEach(candidates, function (first) {
    result[first] = Object.create(null);
    _.forEach(candidates, function (second) {
      if (ranks[first] < ranks[second]) {
        result[first][second] = voteWeight;
      } else {
        result[first][second] = 0;
      }
    });
  });

  return result;
}

function ballotArrayToPairs (ballots, candidates) {
  var result = Object.create(null);

  _.forEach(candidates, function (first) {
    result[first] = Object.create(null);
    _.forEach(candidates, function (second) {
      result[first][second] = 0;
    });
  });

  var pairs = _.map(ballots, _.partial(ballotToPairs, _, candidates));
  _.forEach(pairs, function (pairMap) {
    _.forEach(candidates, function (first) {
      _.forEach(candidates, function (second) {
        result[first][second] += pairMap[first][second];
      });
    });
  });

  return result;
}

common.ballotToPairs = ballotToPairs;
common.ballotArrayToPairs = ballotArrayToPairs;

return common;

});
