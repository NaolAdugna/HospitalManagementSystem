import mysqlPool from "../database/connection.js";

export const findUser = async (username) => {
  try {
    const sql = "SELECT * FROM users WHERE username = ?";
    const [user] = await mysqlPool.execute(sql, [username]);

    if (user.length === 0) {
      return false;
    } else {
      return user;
    }
  } catch (error) {
    console.error("Error in findUser:", error);
    throw error;
  }
};
export const ReturnEmail = async (username) => {
  try {
    const sql = "SELECT email from users WHERE username = ?";
    const [user] = await mysqlPool.execute(sql, [username]);
    if (user.length === 0) {
      return false;
    } else {
      return user[0].email;
    }
  } catch (error) {
    console.error("error occured in returning email", error);
    throw error;
  }
};

export const findEmail = async (email) => {
  try {
    const sql = "SELECT * FROM users WHERE email = ? ";
    const [userEmail] = await mysqlPool.execute(sql, [email]);
    if (userEmail.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error occurred in findEmail ", error);
    throw error;
  }
};

export const saveUser = async (username, password, role, email) => {
  try {
    let sql = `INSERT INTO users(
        username,
        password,
        role,
        email,
        dateofregistration
    ) VALUES (
      '${username}',
      '${password}',
      '${role}',
      '${email}',
      CURRENT_TIMESTAMP
      )`;
    let [registration] = await mysqlPool.execute(sql);
    return registration;
  } catch (error) {
    console.error("Error occurred while registering: ", error);
  }
};

export const updateUserStaffRecord = async (
  id,
  username,
  password,
  role,
  email
) => {
  let sql;
  let values = [];

  // Build the SQL query dynamically based on provided parameters
  if (password) {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10); // Use a suitable number of rounds

    sql = `UPDATE users SET username = ?, password = ?, role = ?, email = ? WHERE id = ?;`;
    values = [username, hashedPassword, role, email, id];
  } else {
    sql = `UPDATE users SET username = ?, role = ?, email = ? WHERE id = ?;`;
    values = [username, role, email, id];
  }

  // Execute the SQL query with the constructed SQL and values
  const [user] = await mysqlPool.execute(sql, values);
  return user;
};

export const GetUserName = async (userId) => {
  try {
    const sql = "SELECT username FROM users WHERE id = ?";
    const [results] = await mysqlPool.execute(sql, [userId]);
    if (results.length === 0) {
      console.log("User not found");
    } else {
      const username = results[0].username;
      return username;
    }
  } catch (error) {
    console.error("Error in findUser:", error);
    throw error;
  }
};

export const GetUsers = async () => {
  try {
    const sql =
      "SELECT id, username, email, role, dateofregistration FROM users";
    const [results] = await mysqlPool.execute(sql);
    return results;
  } catch (error) {
    console.error("Error in findUser:", error);
    throw error;
  }
};
export const DeleteUsers = async (id) => {
  try {
    if (id === undefined) {
      throw new Error("User ID is undefined");
    }

    const sql = "DELETE FROM users WHERE id = ?";
    const [results] = await mysqlPool.execute(sql, [id]);
    return results;
  } catch (error) {
    console.error("Error in DeleteUsers:", error);
    throw error;
  }
};
export const GetUserById = async (id) => {
  try {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [results] = await mysqlPool.execute(sql, [id]);
    return results;
  } catch (error) {
    console.error("Error in GETTING USER BY ID:", error);
    throw error;
  }
};
export const UpdateUserStaff = async (id, username, password, role, email) => {
  try {
    const sql =
      "UPDATE users SET username = ?, password = ?, role = ?, email = ? WHERE id = ?";
    const [updated] = await mysqlPool.execute(sql, [
      username,
      password,
      role,
      email,
      id,
    ]);
    return updated;
  } catch (error) {
    console.error("Error occurred while updating: ", error);
    throw error;
  }
};

export const GetRole = async (id) => {
  try {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [response] = await mysqlPool.execute(sql, [id]);
    console.log(response[0]);
    const role = response[0];
    return role;
  } catch (error) {
    console.error("Error in GetRole:", error);
    throw error;
  }
};

export const UpdateUserStaffPassword = async (username, password) => {
  try {
    const sql = "UPDATE users SET password = ? WHERE username = ?";
    const [response] = await mysqlPool.execute(sql, [password, username]);
    return response;
  } catch (error) {
    console.error("ERROR occured in reseting user password", error);
    throw error;
  }
};

export const findList = async (id, listtitle) => {
  try {
    const sql = "SELECT * FROM lists WHERE user_id = ? AND title = ? ";
    const [list] = await mysqlPool.execute(sql, [id, listtitle]);

    if (list.length === 0) {
      return false;
    } else {
      return list;
    }
  } catch (error) {
    console.error("Error in find lists:", error.response.data);
    throw error;
  }
};

export const createList = async (id, listtitle) => {
  try {
    let sql = `INSERT INTO lists(
        title,
        created_at,
        user_id
    ) VALUES (
      '${listtitle}',
      CURRENT_TIMESTAMP,
      '${id}'
    )`;
    let [list] = await mysqlPool.execute(sql);
    return list;
  } catch (error) {
    console.error("Error occurred while creating: ", error);
  }
};

export const contactSendMessageMysql = async (name, email, message) => {
  try {
    let sql = `INSERT INTO message(
        name,
        email,
        message,
        dateofmessagesent
    ) VALUES (
      '${name}',
      '${email}',
      '${message}',
      CURRENT_TIMESTAMP
      )`;
    let [result] = await mysqlPool.execute(sql);
    return result;
  } catch (error) {
    console.error("Error occurred while sending message: ", error);
  }
};

export const deleteUserRegister = async (
  username,
  role,
  email,
  reason,
  deletedby
) => {
  try {
    let sql = `INSERT INTO deletedusers(
        username,
        role,
        email,
        reason,
        deletedby,
        dateofdeletion
    ) VALUES (
      '${username}',
      '${role}',
      '${email}',
      '${reason}',
      '${deletedby}',
      CURRENT_TIMESTAMP
      )`;
    let [deletion] = await mysqlPool.execute(sql);
    return deletion;
  } catch (error) {
    console.error("Error occurred while deleting: ", error);
  }
};

export const GetDeletedUsers = async () => {
  try {
    const sql =
      "SELECT id, username,role,email,reason,deletedby,dateofdeletion FROM deletedusers";
    const [results] = await mysqlPool.execute(sql);
    return results;
  } catch (error) {
    console.error("Error in finddeletedUser:", error);
    throw error;
  }
};
export const GetContactUsMessage = async () => {
  try {
    const sql =
      "SELECT id, name, email, message, dateofmessagesent FROM message ORDER BY dateofmessagesent DESC";

    const [results] = await mysqlPool.execute(sql);
    return results;
  } catch (error) {
    console.error("Error in finddeletedUser:", error);
    throw error;
  }
};

export const findPatient = async (username) => {
  try {
    const sql = "SELECT * FROM patient WHERE name = ?";
    const [user] = await mysqlPool.execute(sql, [username]);

    if (user.length === 0) {
      return false;
    } else {
      return user;
    }
  } catch (error) {
    console.error("Error in findPatient:", error);
    throw error;
  }
};

export const findPatientEmail = async (email) => {
  try {
    const sql = "SELECT * FROM patient WHERE email = ? ";
    const [userEmail] = await mysqlPool.execute(sql, [email]);
    if (userEmail.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error occurred in findEmail ", error);
    throw error;
  }
};

export const registerPatientUser = async (
  name,
  password,
  age,
  gender,
  email,
  medicalhistory
) => {
  try {
    let sql = `INSERT INTO patient(
        name,
        password,
        age,
        gender,
        email,
        medicalhistory,
        dateofregistration
    ) VALUES (
      '${name}',
      '${password}',
      '${age}',
      '${gender}',
      '${email}',
      '${medicalhistory}',
      CURRENT_TIMESTAMP
      )`;
    let [registration] = await mysqlPool.execute(sql);
    return registration;
  } catch (error) {
    console.error("Error occurred while registering patient: ", error);
  }
};

export const GetPatientUsers = async () => {
  try {
    const sql =
      "SELECT id, name,age,gender,email,medicalhistory,dateofregistration FROM patient";
    const [results] = await mysqlPool.execute(sql);
    return results;
  } catch (error) {
    console.error("Error in finddeletedUser:", error);
    throw error;
  }
};

export const ReturnPatientEmail = async (name) => {
  try {
    const sql = "SELECT email from patient WHERE name = ?";
    const [user] = await mysqlPool.execute(sql, [name]);
    if (user.length === 0) {
      return false;
    } else {
      return user[0].email;
    }
  } catch (error) {
    console.error("error occured in returning email", error);
    throw error;
  }
};

export const UpdatePatientPassword = async (name, password) => {
  try {
    const sql = "UPDATE patient SET password = ? WHERE name = ?";
    const [response] = await mysqlPool.execute(sql, [password, name]);
    return response;
  } catch (error) {
    console.error("ERROR occured in reseting user password", error);
    throw error;
  }
};

export const UpdateUserStaffProfile = async (id, username, email) => {
  try {
    const sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
    const [updated] = await mysqlPool.execute(sql, [username, email, id]);
    return updated;
  } catch (error) {
    console.error("Error occurred while updating: ", error);
    throw error;
  }
};
export const UpdatePatientProfile = async (id, username, email, age) => {
  try {
    const sql = "UPDATE patient SET name = ?, age = ?,  email = ? WHERE id = ?";
    const [updated] = await mysqlPool.execute(sql, [username, age, email, id]);
    return updated;
  } catch (error) {
    console.error("Error occurred while updating: ", error);
    throw error;
  }
};
