import _ from 'lodash';

import {countFirstPrefs} from './utils';

function irv (election) {
  var curBallots, curCandidates, voteCount, firstPrefs, ratios, winner, loser;

  curBallots = election.ballots;
  curCandidates = election.candidates;

  while (true) {
    // jshint loopfunc:true
    voteCount = _.sumBy(curBallots, 'count');
    firstPrefs = countFirstPrefs(curBallots, curCandidates);
    ratios = _.mapValues(firstPrefs, votes => votes / voteCount);

    winner = _.findKey(ratios, function (x) {return x > 0.5; });
    if (!!winner) return winner;

    loser = _.map(_.orderBy(_.toPairs(firstPrefs), x => x[1], ['asc']), x => x[0])[0];

    curBallots = _.compact(_.map(curBallots, function (ballot) {
      return ballot.eliminate(loser);
    }));
    curCandidates = _.without(curCandidates, loser);

  }
}

export default irv;
