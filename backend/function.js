const mysql = require("mysql");
const config = require("./config");
const pool = mysql.createPool(config);

const getAllRecords = (tableName) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} `;

    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results : null);
      }
    });
  });
};

const getInfo = (tableName, value) => {
  return new Promise((resolve, reject) => {
    const query = ` select u.*,p.*,c.* from user u left join posts p on u.id=p.id left join comments c on p.post_id=c.post_id where p.post_id=?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results : null);
      }
    });
  });
};

const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const query = `insert into  ${tableName} SET ? `;

    pool.query(query, [record], (err, results) => {
      if (err) {
        console.log();
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const updateRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE ${tableName} SET ? where post_id=${record.post_id}`;

    pool.query(query, [record], (err, results) => {
      if (err) {
        console.log();
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
const delPost=(tableName,record)=>{
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM ${tableName} WHERE post_id=?`;

    pool.query(query, [record], (err, results) => {
      if (err) {
        console.log();
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

}
module.exports = {
  insertRecord,
  updateRecord,
  checkRecordExists,
  getAllRecords,
  getInfo,
  delPost
};
