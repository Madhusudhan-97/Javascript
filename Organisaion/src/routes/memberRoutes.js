const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/:memberId', async (request, response) => {
  const memberId = parseInt(request.params.memberId);
  try {
    const result = await memberController.getMemberById(request.db, memberId);
    response.status(200).json(result);
  } catch (error) {
    response.status(404).send(error.message);
  }
});
router.get('/name/:name', async (request, response) => {
  const name = request.params.name;
  try {
    const result = await memberController.getMemberByName(request.db, name);
    response.status(200).json(result);
  } catch (error) {
    response.status(404).send(error.message);
  }
});
router.get('/sal/:Salary', async (request, response) => {
  const Salary = parseInt(request.params.Salary);
  try {
    const result = await memberController.getMemberBySalary(request.db, Salary);
    response.status(200).json(result);
  } catch (error) {
    response.status(404).send(error.message);
  }
});

router.post('/', async (request, response) => {
  try {
    const result = await memberController.addMemberToTeam(request.db, request);
    response.status(201).json(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});

router.delete('/:memberId', async (request, response) => {
  const memberId = parseInt(request.params.memberId);
  try {
    const result = await memberController.deleteMemberFromTeam(request.db, memberId);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});

router.put('/:memberId/reassign/:newTeamId', async (request, response) => {
  const memberId = parseInt(request.params.memberId);
  const newTeamId = parseInt(request.params.newTeamId);

  try {
    const result = await memberController.reassignMemberToTeam(request.db, memberId, newTeamId);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});

router.put('/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const result = await memberController.updateMember(request.db, id, request.body);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});
router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await memberController.partialUpdateMember(req.db, id, req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error("Error in partialUpdateMember route:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/:memberId/change-to-employee', async (request, response) => {
  const memberId = parseInt(request.params.memberId);
  try {
    const result = await memberController.changeMemberToEmployee(request.db, memberId);
    response.status(200).json(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});
router.put('/:employeeId/change-to-member', async (request, response) => {
  const employeeId = parseInt(request.params.employeeId);
  try {
    const result = await memberController.changeEmployeeToMember(request.db, employeeId);
    response.status(200).json(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});
module.exports = router;