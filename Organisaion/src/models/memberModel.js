module.exports = (db) => {
    
   const getMemberById = async (memberId) => {
    try {
      const [rows, fields] = await db.query('SELECT * FROM Members WHERE MemberId = ?', [memberId]);

      if (rows.length === 0) {
        throw new Error('Member not found');
      }

      return rows[0]; // Return the first member (assuming memberId is unique)
    } catch (error) {
      throw error;
    }
  };

  const getMemberByName = async (name) => {
    try {
      const [rows, fields] = await db.query('SELECT * FROM Members WHERE Name = ?', [name]);

      if (rows.length === 0) {
        throw new Error('Member not found');
      }

      return rows;
    } catch (error) {
      throw error;
    }
  };

  const getMemberBySalary = async (Salary) => {
    try {
      const [rows, fields] = await db.query('SELECT * FROM Members WHERE Salary = ?', [Salary]);

      if (rows.length === 0) {
        throw new Error('Member not found');
      }

      return rows;
    } catch (error) {
      throw error;
    }
  };

  const addMemberToTeam = async (name, salary, age, joiningDate, teamId, reportsTo, totalHoursWorked, totalWorkload) => {
    try {
      const [result] = await db.query('INSERT INTO Members (Name, Salary, Age, JoiningDate, TeamId, ReportsTo, TotalHoursWorked, TotalWorkload) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, salary, age, joiningDate, teamId, reportsTo, totalHoursWorked, totalWorkload]);

      const insertedId = result.insertId;
      return {
        status_code: 201,
        success_message: 'Member added successfully',
        member_id: insertedId,
      };
    } catch (error) {
      throw error;
    }
  };

  const deleteMemberFromTeam = async (memberId) => {
    try {
      await db.query('DELETE FROM Members WHERE MemberId = ?', [memberId]);
      return `Member deleted with ID: ${memberId}`;
    } catch (error) {
      throw error;
    }
  };

  const updateMember = async (id, name, salary, age, joiningDate, teamId, reportsTo, totalHoursWorked, totalWorkload) => {
    try {
      const memberExists = await getMemberById(id);

      if (!memberExists) {
        throw new Error(`Member with ID ${id} not found`);
      }

      await db.query('UPDATE Members SET Name = ?, Salary = ?, Age = ?, JoiningDate = ?, TeamId = ?, ReportsTo = ?, TotalHoursWorked = ?, TotalWorkload = ? WHERE MemberId = ?',
        [name, salary, age, joiningDate, teamId, reportsTo, totalHoursWorked, totalWorkload, id]);

      return `Member modified with ID: ${id}`;
    } catch (error) {
      throw error;
    }
  };

  const partialUpdateMember = async (id, requestBody) => {
    try {
      const existingMember = await getMemberById(id);

      if (!existingMember) {
        throw new Error(`Member with ID ${id} not found`);
      }

      const storedData = existingMember;
      const setClauses = [];
      const values = [];
      for (const key in requestBody) {
        if (requestBody.hasOwnProperty(key)) {
          setClauses.push(`${key} = ?`);
          values.push(requestBody[key]);
        } else {
          console.log(`Skipping key '${key}' from requestBody`);
        }
      }

      if (setClauses.length === 0) {
        console.log('No valid fields provided for update. Request Body:', requestBody);
        throw new Error("No valid fields provided for update");
      }
      values.push(id);
      const updateQuery = `UPDATE Members SET ${setClauses.join(', ')} WHERE MemberId = ?`;

      await db.query(updateQuery, values);

      return `Member partially modified with ID: ${id}`;
    } catch (error) {
      throw error;
    }
  };

  const reassignMemberToTeam = async (memberId, newTeamId, newReportsTo) => {
    try {
      const managerId = await getTeamManager(newTeamId);
      await db.query('UPDATE Members SET TeamId = ?, ReportsTo = ? WHERE MemberId = ?', [newTeamId, newReportsTo, memberId]);
      return `Member reassigned to Team ID: ${newTeamId} and ReportsTo: ${newReportsTo}`;
    } catch (error) {
      throw error;
    }
  };

  const getTeamManager = async (teamId) => {
    try {
      const [rows, fields] = await db.query('SELECT ManagerId FROM Teams WHERE TeamId = ?', [teamId]);

      if (rows.length === 0 || rows[0].ManagerId === null) {
        throw new Error('Team manager not found for the team');
      }

      return rows[0].ManagerId;
    } catch (error) {
      throw error;
    }
  };

  
    
  const changeMemberToEmployee = async (memberId) => {
    try {
      const [member] = await db.query('SELECT * FROM members WHERE MemberId = ?', [memberId]);

      if (member.length === 0) {
        throw new Error('Member not found');
      }

      const { Name, Salary, Age, JoiningDate } = member[0];

      await db.query('DELETE FROM members WHERE MemberId = ?', [memberId]);

      const [result] = await db.query('INSERT INTO employee (name, salary, age, joiningDate) VALUES (?, ?, ?, ?)', [Name, Salary, Age, JoiningDate]);

      const employeeId = result.insertId;

      return {
        status_code: 200,
        success_message: `Member with ID ${memberId} changed to Employee with ID ${employeeId}`,
        employee_id: employeeId,
      };
    } catch (error) {
      throw error;
    }
  };

  const changeEmployeeToMember = async (employeeId) => {
    try {
        const [employee] = await db.query('SELECT * FROM employee WHERE id = ?', [employeeId]);
        if (employee.length === 0) {
            throw new Error('Employee not found');
        }
        const { name, salary, age, joiningDate } = employee[0];
        const [managerTeam] = await db.query('SELECT * FROM teams WHERE ManagerId = ?', [employeeId]);
        if (managerTeam.length > 0) {
            const teamId = managerTeam[0].TeamId;
            await db.query('UPDATE teams SET ManagerId = NULL WHERE TeamId = ?', [teamId]);
        }
        await db.query('UPDATE members SET ReportsTo = NULL WHERE ReportsTo = ?', [employeeId]);

        await db.query('DELETE FROM employee WHERE id = ?', [employeeId]);
        const [result] = await db.query('INSERT INTO members (Name, Salary, Age, JoiningDate) VALUES (?, ?, ?, ?)', [name, salary, age, joiningDate]);
        const memberId = result.insertId;
        return {
            status_code: 200,
            success_message: `Employee with ID ${employeeId} changed to Member with ID ${memberId}`,
            member_id: memberId,
        };
    } catch (error) {
        throw error;
    }
};
    return {
      getMemberById,
      getMemberByName,
      getMemberBySalary,
      addMemberToTeam,
      deleteMemberFromTeam,
      updateMember,
      partialUpdateMember,
      reassignMemberToTeam,
      getTeamManager,
      changeMemberToEmployee,
      changeEmployeeToMember
    };
  };