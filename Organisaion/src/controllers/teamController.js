const createTeamModel = require('../models/teamModel');

const initializeTeams = async (db, teamData) => {
  const model = createTeamModel(db);
  try {
    const result = await model.initializeTeams(teamData);
    return result;
  } catch (error) {
    throw error;
  }
};


const updateTeamManager = async (db, teamId, managerId) => {
  const model = createTeamModel(db);

  try {
    await model.updateTeamManager(teamId, managerId);

    const teamMembers = await model.getTeamMembers(teamId);

    const updatePromises = teamMembers.map(async (teamMember) => {
      const memberId = teamMember.MemberId;
      await model.updateTeamMemberReportingTo(memberId, managerId);
    });

    await Promise.all(updatePromises);

    return {
      success: true,
      message: `Team manager and team members' reportingTo updated for Team ID: ${teamId}`,
    };
  } catch (error) {
    console.error('Error in updateTeamManager:', error);
    throw {
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    };
  }
};

const getTeamManager = async (db, request) => {
  const teamId = parseInt(request.params.teamId);

  const model = createTeamModel(db);
  try {
    const result = await model.getTeamManager(teamId);
    return result;
  } catch (error) {
    throw error;
  }
};

const getTeamMembers = async (db, request) => {
  const teamId = parseInt(request.params.teamId);

  const model = createTeamModel(db);
  try {
    const result = await model.getTeamMembers(teamId);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllMembersFromAllTeams = async (db) => {
  const model = createTeamModel(db);
  try {
    const result = await model.getAllMembersFromAllTeams();
    return result;
  } catch (error) {
    throw error;
  }
};

const getTeamsTotalEfforts = async (db, request) => {
  const teamId = parseInt(request.params.teamId);

  const model = createTeamModel(db);
  try {
    const result = await model.getTeamsTotalEfforts(teamId);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllTeams = async (db) => {
  const model = createTeamModel(db)
  try {
    const teams = await model.getAllTeams(db);
    return teams;
  } catch (error) {
    console.error("Error in getAllTeams:", error);
    throw new Error("Error fetching teams");
  }
};
const getTeamMembersWithManager = async (req, res) => {
  const db = req.db; // Assuming you attach your database connection to the request object
  const teamId = req.params.teamId;

  try {
    const teamManager = await memberModel.getTeamManager(db, teamId);
    const teamMembers = await memberModel.getTeamMembers(db, teamId);

    // Include the manager in the team members list
    const teamMembersWithManager = [...teamManager, ...teamMembers];

    res.status(200).json(teamMembersWithManager);
  } catch (error) {
    console.error('Error fetching team members with manager:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  initializeTeams,
  updateTeamManager,
  getTeamManager,
  getTeamMembers,
  getAllMembersFromAllTeams,
  getTeamsTotalEfforts,
  getAllTeams,
  getTeamMembersWithManager
};