import mysqlPool from "../database/connection.js";
export const getAllPatient = async () => {
  let sql = "SELECT * FROM patient";
  const [[{ affectedRows }]] = await mysqlPool.execute(sql);

  if (affectedRows == 0) {
    console.log("zero affected row");
  }
};

export const findUserName = async (firstname, middlename, lastname) => {
  try {
    const sql =
      "SELECT * FROM patient WHERE firstname = ? AND middlename = ? AND lastname = ?";
    const [patient] = await mysqlPool.execute(sql, [
      firstname,
      middlename,
      lastname,
    ]);

    if (patient.length === 0) {
      return false;
    } else {
      return patient;
    }
  } catch (error) {
    console.error("Error in findUserName:", error);
    throw error;
  }
};

export const findUserEmail = async (email) => {
  try {
    const sql = "SELECT * FROM patient WHERE email = ? ";
    const [userEmail] = await mysqlPool.execute(sql, [email]);
    if (userEmail.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error occurred in findUserEmail ", error);
    throw error;
  }
};

export const updateUserRecords = async (
  id,
  woreda,
  katana,
  kebele,
  housenumber,
  phonenumber,
  email
) => {
  let sql = `UPDATE patient Set woreda = ${woreda}, katana = ${katana}, kebele = ${kebele}, housenumber = ${housenumber}, phonenumber = ${phonenumber}, email = ${email} WHERE id = ${id};`;
  const [user] = mysqlPool.execute(sql);
  return user;
};

export const savePatient = async (
  firstname,
  middlename,
  lastname,
  sex,
  dateofbirth,
  region,
  woreda,
  katana,
  kebele,
  housenumber,
  phonenumber,
  nameoffacility,
  medicalrecordnumber,
  dateofregistration,
  email,
  password
) => {
  let day = new Date();
  let year = day.getFullYear();
  let month = day.getMonth() + 1;
  let date = day.getDate();

  let createAtDate = `${year}-${month}-${date}`;
  let sql = `INSERT INTO patient(
      firstname,
      middlename,
      lastname,
      sex,
      dateofbirth,
      region,
      woreda,
      katana,
      kebele,
      housenumber,
      phonenumber,
      nameoffacility,
      medicalrecordnumber,
      dateofregistration,
      email,
      password
    ) VALUES (
      '${firstname}',
      '${middlename}',
      '${lastname}',
      '${sex}',
      '${dateofbirth}',
      '${region}',
      '${woreda}',
      '${katana}',
      '${kebele}',
      '${housenumber}',
      '${phonenumber}',
      '${nameoffacility}',
      '${medicalrecordnumber}',
      '${createAtDate}',
      '${email}',
      '${password}'
    )`;
  let [registration] = await mysqlPool.execute(sql);
  return registration;
};
