import ENV from "../../config.js";
import mysql from "mysql2/promise";

const mysqlPool = mysql.createPool({
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  database: ENV.DB_NAME,
  password: ENV.DB_PASSWORD,
});

export default mysqlPool;
