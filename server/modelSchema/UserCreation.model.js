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

export const saveUser = async (image, username, password, role, email) => {
  let sql = `INSERT INTO users(
        image,
        username,
        password,
        role,
        email
    ) VALUES (
      '${image}',
      '${username}',
      '${password}',
      '${role}',
      '${email}'
      )`;
  let [registration] = await mysqlPool.execute(sql);
  return registration;
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
