const createMemberModel = require('../models/memberModel');

const getMemberById = async (db, memberId) => {
  const model = createMemberModel(db);
  try {
    const result = await model.getMemberById(memberId);
    return result;
  } catch (error) {
    throw error;
  }
};
const getMemberByName = async (db, name) => {
  const model = createMemberModel(db);
  try {
    const result = await model.getMemberByName(name);
    return result;
  } catch (error) {
    throw error;
  }
};
const getMemberBySalary = async (db, Salary) => {
  const model = createMemberModel(db);
  try {
    const result = await model.getMemberBySalary(Salary);
    return result;
  } catch (error) {
    throw error;
  }
};
const addMemberToTeam = async (db, request) => {
  const { name, salary, age, joiningDate, teamId, reportsTo, totalHoursWorked, totalWorkload } = request.body;
  const model = createMemberModel(db);
  try {
    const result = await model.addMemberToTeam(name, salary, age, joiningDate, teamId, reportsTo, totalHoursWorked, totalWorkload);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteMemberFromTeam = async (db, memberId) => {
  const model = createMemberModel(db);
  try {
    const result = await model.deleteMemberFromTeam(memberId);
    return result;
  } catch (error) {
    throw error;
  }
};


const reassignMemberToTeam = async (db, memberId, newTeamId) => {
  // const model = createMemberModel(db);
  // try {
  //   const managerId = await model.getTeamManager(newTeamId);
  //   await model.reassignMemberToTeam(memberId, newTeamId, managerId);

  //   return `Member reassigned to Team ID: ${newTeamId} with ReportsTo updated to: ${managerId}`;
  // } catch (error) {
  //   console.error("Error in reassignMemberToTeam:", error);
  //   throw error; // Propagate the error to the calling function
  // }
  const model = createMemberModel(db);
  try {
    const managerId = await model.getTeamManager(newTeamId);
    await model.reassignMemberToTeam(memberId, newTeamId, managerId);

    return `Member reassigned to Team ID: ${newTeamId} with ReportsTo updated to: ${managerId}`;
  } catch (error) {
    console.error("Error in reassignMemberToTeamController:", error);
    throw error;
  }
};
// const changeMemberRole = async (db, memberId, newRole) => {
//   const model = createMemberModel(db);
//   try {
//     const result = await model.changeMemberRole(memberId, newRole);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };
// const updateMember = async (db, id, requestBody) => {
//   const model = createMemberModel(db);
//   const { name, salary, age, joiningDate, teamId, reportsTo, totalHoursWorked, totalWorkload } = requestBody;
//   try {
//     await model.updateMember(id, name, salary, age, joiningDate, teamId, reportsTo, totalHoursWorked, totalWorkload);
//     return `Member modified with ID: ${id}`;
//   } catch (error) {
//     console.error("Error in updateMember:", error);
//     throw new Error("Error updating member");
//   }
// };
const updateMember = async (db, id, requestBody) => {
  const model = createMemberModel(db);
  const { name, salary, age, joiningDate, teamId, reportsTo, totalHoursWorked, totalWorkload } = requestBody;

  try {
    const existingMember = await model.getMemberById(id);

    if (!existingMember) {
      return response.status(404).json({ error: 'Member not found' });
    }

    await model.updateMember(id, name, salary, age, joiningDate, teamId, reportsTo, totalHoursWorked, totalWorkload);
    
    return `Member modified with ID: ${id}`;
  } catch (error) {
    // console.error("Error in updateMember:", error);
    return response.status(500).send("Error in updateMember:", error);
  }
};
const partialUpdateMember = async (db, id, requestBody) => {
  const model = createMemberModel(db);

  try {
    const result = await model.partialUpdateMember(id, requestBody);
    return result; // This could be a success message or any other response you want to send
  } catch (error) {
    console.error("Error in partialUpdateMember controller:", error);
    throw new Error("Error updating member partially");
  }
};
const changeMemberToEmployee = async (db, memberId) => {
  const model = createMemberModel(db);
  try {
    const result = await model.changeMemberToEmployee(memberId);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }}
  const changeEmployeeToMember = async (db, employeeId) => {
    const model = createMemberModel(db);
    try {
      const result = await model.changeEmployeeToMember(employeeId);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

module.exports = {
  getMemberById,
  getMemberByName,
  getMemberBySalary,
  addMemberToTeam,
  deleteMemberFromTeam,
  reassignMemberToTeam,
  updateMember,
  partialUpdateMember,
  changeMemberToEmployee,
  changeEmployeeToMember
};