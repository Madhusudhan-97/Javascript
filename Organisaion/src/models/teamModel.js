module.exports = (db) => {
  const initializeTeams = async (teamData) => {
    if (!teamData || !Array.isArray(teamData) || teamData.length === 0) {
      throw new Error('Invalid or empty team data provided');
    }

    try {
      const teams = await Promise.all(teamData.map(async (team) => {
        const { teamName, managerId } = team;
        const [result] = await db.query('INSERT INTO Teams (TeamName, ManagerId) VALUES (?, ?)', [teamName, managerId]);
        return { teamName, managerId, teamId: result.insertId };
      }));

      return teams;
    } catch (error) {
      throw error;
    }
  };
  
  const updateTeamManager = async (teamId, managerId) => {
    try {
      await db.query('UPDATE Teams SET ManagerId = ? WHERE TeamId = ?', [managerId, teamId]);
      return `Team manager updated for Team ID: ${teamId}`;
    } catch (error) {
      console.error('Error in updateTeamManager:', error);
      throw error;
    }
  };
  
  const updateTeamMemberReportingTo = async (memberId, managerId) => {
    try {
      await db.query('UPDATE Members SET ReportsTo = ? WHERE MemberId = ?', [managerId, memberId]);
    } catch (error) {
      console.error('Error in updateTeamMemberReportingTo:', error);
      throw error;
    }
  };
    const getTeamManager = async (teamId) => {
      try {
        const [rows, fields] = await db.query('SELECT ManagerId FROM Teams WHERE TeamId = ?', [teamId]);
  
        if (rows.length === 0 || rows[0].ManagerId === null) {
          throw new Error('Team manager not found for the team');
        }
  
        const managerId = rows[0].ManagerId;
        const [managerRows, managerFields] = await db.query('SELECT * FROM Employee WHERE id = ?', [managerId]);
  
        if (managerRows.length === 0) {
          throw new Error('Manager not found');
        }
  
        return managerRows;
      } catch (error) {
        throw error;
      }
    };
  
    const getTeamMembers = async (teamId) => {
      try {
        const [rows, fields] = await db.query('SELECT * FROM Members WHERE TeamId = ?', [teamId]);
        return rows;
      } catch (error) {
        throw error;
      }
    };
  
    const getAllMembersFromAllTeams = async () => {
      try {
        const [rows, fields] = await db.query('SELECT * FROM Members');
        return rows;
      } catch (error) {
        throw error;
      }
    };
  
    const getTeamsTotalEfforts = async (teamId) => {
      try {
        const [rows, fields] = await db.query('SELECT SUM(TotalHoursWorked) AS total_hours, COUNT(MemberId) AS total_members FROM Members WHERE TeamId = ?', [teamId]);
  
        if (rows.length === 0 || rows[0].total_hours === null || rows[0].total_members === 0) {
          throw new Error('No efforts found for the team');
        }
  
        const totalHours = rows[0].total_hours;
        const totalMembers = rows[0].total_members;
  
        return { total_hours: totalHours, total_members: totalMembers };
      } catch (error) {
        throw error;
      }
    };
  
    const getAllTeams = async () => {
      try {
        const [rows, fields] = await db.query('SELECT * FROM Teams');
        return rows;
      } catch (error) {
        throw error;
      }
    };
    return {
      initializeTeams,
      updateTeamManager,
      updateTeamManager,
      updateTeamMemberReportingTo,
      getTeamManager,
      getTeamMembers,
      getAllMembersFromAllTeams,
      getTeamsTotalEfforts,
      getAllTeams
    };
  };