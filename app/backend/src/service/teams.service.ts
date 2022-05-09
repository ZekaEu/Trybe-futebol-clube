import Teams from '../database/models/teams';

const getAllTeams = async () => {
  const teams = await Teams.findAll();
  return { code: 200, data: teams };
};

export default getAllTeams;
