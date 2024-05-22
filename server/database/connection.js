import ENV from "../../config.js";
import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// dotenv.config();
// const urlDB = `mysql://root:hfDGinZxnzGoogBcedPgtcGUzGPADVzS@viaduct.proxy.rlwy.net:34677/railway`;
// const urlDB = `jdbc:mysql://sql12.freesqldatabase.com:3306/sql12708030`;

// const mysqlPool = mysql.createPool(urlDB);

const mysqlPool = mysql.createPool({
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  database: ENV.DB_NAME,
  password: ENV.DB_PASSWORD,
});

export default mysqlPool;
