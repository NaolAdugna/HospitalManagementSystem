// import mongoose from "mongoose";

// export const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Please provide unique Username"],
//     unique: [true, "Username Exist"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide a password"],
//     unique: false,
//   },
//   email: {
//     type: String,
//     required: [true, "Please provide a unique email"],
//     unique: true,
//   },
//   firstName: { type: String },
//   lastName: { type: String },
//   mobile: { type: Number },
//   address: { type: String },
//   profile: { type: String },
// });

// export default mongoose.model.Users || mongoose.model("User", UserSchema);

// class UserSchema {
//   constructor(
//     firstname,
//     middlename,
//     lastname,
//     sex,
//     dateofbirth,
//     region,
//     woreda,
//     katana,
//     kebele,
//     housenumber,
//     phonenumber,
//     nameoffacility,
//     medicalrecordnumber,
//     dateofregistration,
//     email,
//     password
//   ) {
//     this.firstname = firstname;
//     this.middlename = middlename;
//     this.lastname = lastname;
//     this.sex = sex;
//     this.dateofbirth = dateofbirth;
//     this.region = region;
//     this.woreda = woreda;
//     this.katana = katana;
//     this.kebele = kebele;
//     this.housenumber = housenumber;
//     this.phonenumber = phonenumber;
//     this.nameoffacility = nameoffacility;
//     this.medicalrecordnumber = medicalrecordnumber;
//     this.dateofregistration = dateofregistration;
//     this.email = email;
//     this.password = password;
//   }

//
// }
// export default UserSchema;

import mysqlPool from "../database/connection.js";
export const getAllPatient = async () => {
  let sql = "SELECT * FROM patient";
  const [[{ affectedRows }]] = await mysqlPool.execute(sql);

  if (affectedRows == 0) {
    console.log("zero affected row");
  }
};

// export const findUserName = async (firstname, middlename, lastname) => {
//   let sql = `SELECT * FROM patient WHERE firstname = ${firstname} AND middlename = ${middlename} AND lastname = ${lastname};`;
//   const [patient] = mysqlPool.execute(sql);

//   return patient;
// };
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
