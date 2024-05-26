import mysql from "mysql2/promise";

import dotenv from "dotenv";
dotenv.config();
// const urlDB = `mysql://root:hfDGinZxnzGoogBcedPgtcGUzGPADVzS@viaduct.proxy.rlwy.net:34677/railway`;
// const urlDB = `jdbc:mysql://sql12.freesqldatabase.com:3306/sql12708030`;

// const mysqlPool = mysql.createPool(urlDB);

const mysqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

export default mysqlPool;
