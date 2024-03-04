const createEmployeeModel = (db) => {
    const getEmployees = async () => {
      try {
        const [rows, fields] = await db.query('SELECT * FROM Employee');
        return rows;
      } catch (error) {
        throw error;
      }
    };
  
    const getEmployeeById = async (id) => {
      try {
        const [rows, fields] = await db.query('SELECT * FROM Employee WHERE id = ?', [id]);
        return rows;
      } catch (error) {
        throw error;
      }
    };
    const getEmployeeByName = async (name) => {
      try {
        const [rows, fields] = await db.query('SELECT * FROM Employee WHERE name = ?', [name]);
        return rows;
      } catch (error) {
        throw error;
      }
    };
    const getEmployeeBySalary = async (salary) => {
      try {
        const [rows, fields] = await db.query('SELECT * FROM Employee WHERE salary = ?', [salary]);
        return rows;
      } catch (error) {
        throw error;
      }
    };
    const getEmployeeByAge = async (age) => {
      try {
        const [rows, fields] = await db.query('SELECT * FROM Employee WHERE age = ?', [age]);
        return rows;
      } catch (error) {
        throw error;
      }
    };
    const getEmployeeByJoiningDate = async (joiningDate) => {
      try {
        const [rows, fields] = await db.query('SELECT * FROM Employee WHERE joiningDate = ?', [joiningDate]);
        return rows;
      } catch (error) {
        throw error;
      }
    };
    const createEmployee = async (name, salary, age, joiningDate) => {
      try {
        const [result] = await db.query('INSERT INTO Employee (name, salary, age, joiningDate) VALUES (?, ?, ?, ?)', [name, salary, age, joiningDate]);
        return result.insertId;
      } catch (error) {
        throw error;
      }
    };
  
    const updateEmployee = async (id, name, salary, age, joiningDate) => {
      try {
        const updateQuery = 'UPDATE Employee SET name = ?, salary = ?, age = ?, joiningDate = ? WHERE id = ?';
        await db.query(updateQuery, [name, salary, age, joiningDate, id]);
      } catch (error) {
        throw error;
      }
    };
  
    const deleteEmployee = async (id) => {
      try {
        await db.query('DELETE FROM Employee WHERE id = ?', [id]);
      } catch (error) {
        throw error;
      }
    };
  
    const updateLeaves = async (employeeId, leaves) => {
      try {
        const updateQuery = 'UPDATE Employee SET Leaves = ? WHERE id = ?';
        await db.query(updateQuery, [leaves, employeeId]);
      } catch (error) {
        throw error;
      }
    };
  
    const calculateEmployeeSalary = async (employeeId) => {
      try {
        const [employeeRows, employeeFields] = await db.query('SELECT Salary, Leaves FROM Employee WHERE id = ?', [employeeId]);
  
        if (employeeRows.length === 0) {
          return null; 
        }
  
        const totalLeaves = employeeRows[0].Leaves || 0;
        const totalWorkingDays = 20;
        const dailySalary = employeeRows[0].Salary / totalWorkingDays;
        const salary = dailySalary * (totalWorkingDays - totalLeaves);
  
        return { employeeId, salary };
      } catch (error) {
        throw error;
      }
    };
  
    return {
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
      calculateEmployeeSalary,
    };
  };
  
  module.exports = createEmployeeModel;