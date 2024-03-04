const createEmployeeModel = require('../models/employeeModel');

const getEmployees = async (db) => {
  const model = createEmployeeModel(db);
  try {
    const rows = await model.getEmployees();
    return rows;
  } catch (error) {
    console.error("Error in getEmployees:", error);
    throw new Error("Error fetching employees");
  }
};

const getEmployeeById = async (db, id) => {
  const model = createEmployeeModel(db);
  try {
    const rows = await model.getEmployeeById(id);
    if (rows.length === 0) {
      throw new Error("Employee not found");
    }
    return rows;
  } catch (error) {
    console.error("Error in getEmployeeById:", error);
    throw new Error("Error fetching employee by ID");
  }
};
const getEmployeeByName = async (db, name) => {
  const model = createEmployeeModel(db);
  try {
    const rows = await model.getEmployeeByName(name);
    if (rows.length === 0) {
      throw new Error("Employee not found");
    }
    return rows;
  } catch (error) {
    console.error("Error in getEmployeeByName:", error);
    throw new Error("Error fetching employee by name");
  }
};
const getEmployeeBySalary = async (db, salary) => {
  const model = createEmployeeModel(db);
  try {
    const rows = await model.getEmployeeBySalary(salary);
    if (rows.length === 0) {
      throw new Error("Employee not found");
    }
    return rows;
  } catch (error) {
    console.error("Error in getEmployeeBySalary:", error);
    throw new Error("Error fetching employee by salary");
  }
};
const getEmployeeByAge = async (db, age) => {
  const model = createEmployeeModel(db);
  try {
    const rows = await model.getEmployeeByAge(age);
    if (rows.length === 0) {
      throw new Error("Employee not found");
    }
    return rows;
  } catch (error) {
    console.error("Error in getEmployeeByAge:", error);
    throw new Error("Error fetching employee by age");
  }
};
const getEmployeeByJoiningDate = async (db, joiningDate) => {
  const model = createEmployeeModel(db);
  try {
    const rows = await model.getEmployeeByJoiningDate(joiningDate);  // Corrected method name
    if (rows.length === 0) {
      throw new Error("Employee not found");
    }
    return rows;
  } catch (error) {
    console.error("Error in getEmployeeByJoiningDate:", error);
    throw new Error("Error fetching employee by joining date");
  }
};
const createEmployee = async (db, requestBody) => {
  const { name, salary, age, joiningDate } = requestBody;
  const model = createEmployeeModel(db);
  try {
    const insertedId = await model.createEmployee(name, salary, age, joiningDate);
    return { status_code: 201, success_message: "Employee added successfully", employee_id: insertedId };
  } catch (error) {
    console.error("Error in createEmployee:", error);
    throw new Error("Error creating employee");
  }
};

const updateEmployee = async (db, id, requestBody) => {
  const { name, salary, age, joiningDate } = requestBody;
  const model = createEmployeeModel(db);
  try {
    await model.updateEmployee(id, name, salary, age, joiningDate);
    return `Employee modified with ID: ${id}`;
  } catch (error) {
    console.error("Error in updateEmployee:", error);
    throw new Error("Error updating employee");
  }
};

const deleteEmployee = async (db, id) => {
  const model = createEmployeeModel(db);
  try {
    await model.deleteEmployee(id);
    return `Employee deleted with ID: ${id}`;
  } catch (error) {
    console.error("Error in deleteEmployee:", error);
    throw new Error("Error deleting employee");
  }
};

const updateLeaves = async (db, employeeId, requestBody) => {
  const { leaves } = requestBody;
  const model = createEmployeeModel(db);
  try {
    await model.updateLeaves(employeeId, leaves);
    return `Leaves updated for Employee ID: ${employeeId}`;
  } catch (error) {
    console.error("Error in updateLeaves:", error);
    throw new Error("Error updating leaves for employee");
  }
};

const calculateEmployeeSalary = async (db, employeeId) => {
  const model = createEmployeeModel(db);
  try {
    const result = await model.calculateEmployeeSalary(employeeId);
    return result;
  } catch (error) {
    console.error("Error in calculateEmployeeSalary:", error);
    throw new Error("Error calculating employee salary");
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  getEmployeeByName,
  getEmployeeBySalary,
  getEmployeeByAge,
getEmployeeByJoiningDate,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  updateLeaves,
  calculateEmployeeSalary
}