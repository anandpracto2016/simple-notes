var mysql = require('mysql');

const DB_NAME = 'nanonets';

let state = {
  pool: null
}

exports.connect = function(done) {
  state.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: DB_NAME
  })

  done()
}

exports.get = function() {
  return state.pool
}
