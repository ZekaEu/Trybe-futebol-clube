import { IMatch } from './matches.service';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

const getHomeTeamMatchesById = async (id: number) => {
  const homeTeamMatches = await Matches.findAll({ where: { homeTeam: id, inProgress: false } });
  return homeTeamMatches;
};

const getTotalPoints = (victories: number, draws: number) => (victories * 3) + draws;

const getTotalGames = (matches: IMatch[]) => matches.length;

const getTotalVDL = (matches: IMatch[]) => {
  const totalVDL = {
    victories: 0,
    draws: 0,
    losses: 0,
  };
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) totalVDL.victories += 1;
    if (match.homeTeamGoals === match.awayTeamGoals) totalVDL.draws += 1;
    if (match.homeTeamGoals < match.awayTeamGoals) totalVDL.losses += 1;
  });

  return totalVDL;
};

const getGoals = (matches: IMatch[]) => {
  const goals = {
    favor: 0,
    own: 0,
  };
  matches.forEach((match) => {
    goals.favor += match.homeTeamGoals;
    goals.own += match.awayTeamGoals;
  });

  return goals;
};

const getGoalsBalance = (goalsFavor: number, goalsOwn: number) => goalsFavor - goalsOwn;

const getEfficiency = (totalPoints: number, totalGames: number) => {
  const efficiency = +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return efficiency;
};

const buildLeaderboard = (matches: IMatch[]) => {
  const totalGames = getTotalGames(matches);
  const totalVDL = getTotalVDL(matches);
  const totalPoints = getTotalPoints(totalVDL.victories, totalVDL.draws);
  const goals = getGoals(matches);
  const goalsBalance = getGoalsBalance(goals.favor, goals.own);
  const efficiency = getEfficiency(totalPoints, totalGames);

  return {
    totalPoints,
    totalGames,
    totalVictories: totalVDL.victories,
    totalDraws: totalVDL.draws,
    totalLosses: totalVDL.losses,
    goalsFavor: goals.favor,
    goalsOwn: goals.own,
    goalsBalance,
    efficiency,
  };
};

const sortLeaderboard = (leaderboard: ILeaderboard[]) => {
  leaderboard.sort((team1, team2) => team2.totalPoints - team1.totalPoints
    || team2.totalVictories - team1.totalVictories
    || team2.goalsBalance - team1.goalsBalance
    || team2.goalsFavor - team1.goalsFavor
    || team2.goalsOwn - team1.goalsOwn);
};

const getHomeTeamLeaderboard = async () => {
  const teams = await Teams.findAll();
  const leaderboard = await Promise.all(
    teams.map(async ({ id, teamName }) => {
      const matches = await getHomeTeamMatchesById(id);
      const setLeaderboard = buildLeaderboard(matches);
      return {
        name: teamName,
        ...setLeaderboard,
      };
    }),
  );

  sortLeaderboard(leaderboard);

  return { code: 200, data: leaderboard };
};

export default getHomeTeamLeaderboard;
