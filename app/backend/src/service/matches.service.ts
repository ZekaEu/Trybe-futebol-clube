import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

export interface IMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

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

const postMatch = async (matchData: IMatch) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = matchData;
  const newMatch = Matches.create({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
  });

  return { code: 201, data: newMatch };
};

const updateMatch = async (id: string) => {
  await Matches.update({ inProgress: false }, { where: { id } });
  return { code: 200, data: { message: 'Match ended' } };
};

export { getAllMatches, postMatch, updateMatch };
