import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

const getAllMatches = async () => {
  const matches = await Matches.findAll({
    include: [{
      model: Teams,
      as: 'teamHome',
      attributes: ['teamName'],
    },
    {
      model: Teams,
      as: 'teamAway',
      attributes: ['teamName'],
    }],
  });

  return { code: 200, data: matches };
};

export default getAllMatches;
