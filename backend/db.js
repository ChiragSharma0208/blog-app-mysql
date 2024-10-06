const mysql = require("mysql");
const config = require("./config");

const connectDB = async () => {
  const pool = mysql.createPool(config);

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected to MySQL database");
    connection.release();
  });
};

module.exports = connectDB;
