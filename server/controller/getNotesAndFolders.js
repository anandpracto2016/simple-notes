let db = require('../db');


module.exports = function(req, res, next){
  let userId = req.params.user_id;
  let notesPromise = new Promise(function(resolve, reject){
    db.get().query(`Select * from notes where folder_id is null AND id in 
      (Select note_id from user_notes where user_id=?)`, userId, function(err, data){
        if (err) {
          reject(err);
        }

        resolve(data);
      })
  })

  let foldersPromise = new Promise(function(resolve, reject){
    db.get().query(`Select * from folders where id in 
      (Select folder_id from user_folders where user_id=?)`, userId, function(err, data){
        if (err) {
          reject(err);
        }

        resolve(data);
      })
  })

  Promise.all([notesPromise, foldersPromise])
    .then(response => {
      let notesResponse = response[0];
      let foldersResponse = response[1];

      let result = {
        notes: [],
        folders: []
      }

      notesResponse.map(note => {
        let { id, title, content, folder_id, url } = note;
        let data = {
          id,
          title,
          content,
          folder_id,
          url
        }

        result.notes.push(data);
      });

      foldersResponse.map(folder => {
        let { id, name } = folder;
        let data = {
          id,
          name
        }

        result.folders.push(data);
      })

      res.json({
        data: result,
        status: 'SUCCESS'
      });
    })
    .catch(err => {
      res.json({
        err: err,
        status: "FAILURE"
      });
    })
}