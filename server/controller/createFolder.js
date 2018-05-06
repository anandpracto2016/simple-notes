let db = require('../db');
var moment = require('moment');

module.exports = function(req, res, next){
  let userId = req.params.user_id;
  let { name } = req.body;
  
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  let updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');  
  let values = [name, createdAt, updatedAt];

  new Promise((resolve, reject) => {
    db.get().query(`Insert into folders(name, created_at, updated_at) values(?, ?, ?)`,
     values, function(err, data){
        if (err) {
          reject(err);
          return;
        }
        
        resolve(data.insertId);
    })
  })
  .then(folderId => {
    let values = [userId, folderId];
    db.get().query(`Insert into user_folders(user_id, folder_id) values(?, ?)`, 
      values, function(err, data){
        if (err) {
          res.json({
            err: err,
            success: false             
          });
        }
        res.json({
          success: true
        });
    })
  })
  .catch(err => {
    res.json({
      err: err,
      success: false      
    });
  })
}