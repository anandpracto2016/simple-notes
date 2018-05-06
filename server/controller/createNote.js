let db = require('../db');
let md5 = require('md5');
var moment = require('moment');

module.exports = function(req, res, next){
  let userId = req.params.user_id;
  let payload = req.body;
  console.log('createNote payload', payload);
  let { folder_id, title, content } = payload;
  let url = md5(Date.now()+title);
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  let updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');  
  let values = [folder_id, url, createdAt, updatedAt, title, content];

  new Promise((resolve, reject) => {
    db.get().query(`Insert into notes(folder_id, url, created_at, updated_at, title, content) 
      values(?, ?, ?, ?, ?, ?)`, values, function(err, data){
        if (err) {
          reject(err);
          return;
        }
        
        resolve(data.insertId);
    })
  })
  .then(noteId => {
    let values = [userId, noteId];
    db.get().query(`Insert into user_notes(user_id, note_id) values(?, ?)`, values, function(err, data){
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