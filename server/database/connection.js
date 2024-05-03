import ENV from "../../config.js";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const urlDB = `mysql://root:hfDGinZxnzGoogBcedPgtcGUzGPADVzS@viaduct.proxy.rlwy.net:34677/railway`;

const mysqlPool = mysql.createPool(urlDB);

export default mysqlPool;
