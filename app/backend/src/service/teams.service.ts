import Teams from '../database/models/teams';

const getAllTeams = async () => {
  const teams = await Teams.findAll();
  return { code: 200, data: teams };
};

const getTeamById = async (id: string) => {
  const team = await Teams.findByPk(id);
  if (!team) return { code: 404, data: { message: 'There is no team with such id!' } };
  return { code: 200, data: team };
};

export { getAllTeams, getTeamById };
