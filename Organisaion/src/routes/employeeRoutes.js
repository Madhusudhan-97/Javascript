const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/', async (request, response) => {
  try {
    const result = await employeeController.getEmployees(request.db);
    response.status(200).json(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const result = await employeeController.getEmployeeById(request.db, id);
    response.status(200).json(result);
  } catch (error) {
    response.status(404).send(error.message);
  }
});
router.get('/name/:name', async (request, response) => {
  const name = request.params.name;

  try {
    const result = await employeeController.getEmployeeByName(request.db, name);
    response.status(200).json(result);
  } catch (error) {
    response.status(404).send(error.message);
  }
});
router.get('/sal/:salary', async (request, response) => {
  const salary = parseInt(request.params.salary);

  try {
    const result = await employeeController.getEmployeeBySalary(request.db, salary);
    response.status(200).json(result);
  } catch (error) {
    response.status(404).send(error.message);
  }
});
router.get('/age/:age', async (request, response) => {
  const age = parseInt(request.params.age);

  try {
    const result = await employeeController.getEmployeeByAge(request.db, age);
    response.status(200).json(result);
  } catch (error) {
    response.status(404).send(error.message);
  }
});
router.get('/Date/:joiningDate', async (request, response) => {
  const joiningDate = request.params.joiningDate;

  try {
    const result = await employeeController.getEmployeeByJoiningDate(request.db, joiningDate);
    response.status(200).json(result);
  } catch (error) {
    response.status(404).send(error.message);
  }
});
router.post('/', async (request, response) => {
  try {
    const result = await employeeController.createEmployee(request.db, request.body);
    response.status(201).json(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});

router.put('/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const result = await employeeController.updateEmployee(request.db, id, request.body);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const result = await employeeController.deleteEmployee(request.db, id);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});

router.put('/:employeeId/update-leaves', async (request, response) => {
  const employeeId = parseInt(request.params.employeeId);
  try {
    const result = await employeeController.updateLeaves(request.db, employeeId, request.body);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});

router.get('/:employeeId/calculate-salary', async (request, response) => {
  const employeeId = parseInt(request.params.employeeId);
  try {
    const result = await employeeController.calculateEmployeeSalary(request.db, employeeId);
    response.status(200).json(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
});

module.exports = router;