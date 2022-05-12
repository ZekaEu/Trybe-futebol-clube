import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

export interface IMatch {
  id?:number;
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
  if (homeTeam === awayTeam) {
    return {
      code: 401,
      data: { message: 'It is not possible to create a match with two equal teams' },
    };
  }

  const getHomeTeam = await Teams.findByPk(homeTeam);
  const getAwayTeam = await Teams.findByPk(awayTeam);
  if (!getHomeTeam || !getAwayTeam) {
    return { code: 404, data: { message: 'There is no team with such id!' } };
  }

  const newMatch = await Matches.create({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
  });

  return { code: 201, data: newMatch };
};

const endMatch = async (id: string) => {
  await Matches.update({ inProgress: false }, { where: { id } });
  return { code: 200, data: { message: 'Match ended' } };
};

const updateMatch = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
  await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return { code: 200, data: { message: 'Match updated' } };
};

export { getAllMatches, postMatch, endMatch, updateMatch };
