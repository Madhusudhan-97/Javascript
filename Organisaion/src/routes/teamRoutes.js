const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');


router.post('/initialize-teams', async (req, res) => {
  try {
    const teamData = req.body.teamData;
    const result = await teamController.initializeTeams(req.db, teamData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.put('/team-manager/:teamId', async (request, response) => {
  try {
    const teamId = parseInt(request.params.teamId);
    const { managerId } = request.body;

    const result = await teamController.updateTeamManager(request.db, teamId, managerId);
    response.status(200).json(result);
  } catch (error) {
    response.status(500).json(error);
  }
});
router.get('/team-manager/:teamId', async (request, response) => {
  const teamId = parseInt(request.params.teamId);
  try {
    const result = await teamController.getTeamManager(request.db, { params: { teamId } });
    response.status(200).json(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});

router.get('/team-members/:teamId', async (request, response) => {
  const teamId = parseInt(request.params.teamId);
  try {
    const result = await teamController.getTeamMembers(request.db, { params: { teamId } });
    response.status(200).json(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});

router.get('/all-members', async (request, response) => {
  try {
    const result = await teamController.getAllMembersFromAllTeams(request.db);
    response.status(200).json(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});

router.get('/teams-total-efforts/:teamId', async (request, response) => {
  const teamId = parseInt(request.params.teamId);
  try {
    const result = await teamController.getTeamsTotalEfforts(request.db, { params: { teamId } });
    response.status(200).json(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});
router.get('/', async (request, response) => {
  try {
    const teams = await teamController.getAllTeams(request.db);
    response.status(200).json(teams);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});
router.get('/team-membersandManager/:teamId', async (request, response) => {
  const teamId = parseInt(request.params.teamId);
  try {
    const teamMembersWithManager = await teamController.getTeamMembersWithManager(request.db, teamId);
    response.status(200).json(teamMembersWithManager);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});
module.exports = router;