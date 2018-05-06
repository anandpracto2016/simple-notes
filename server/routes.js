let router = require('express').Router();
let db = require('./db');
let md5 = require('md5');

var getNotesAndFolders = require( './controller/getNotesAndFolders');
var createNote = require('./controller/createNote');
var createFolder = require('./controller/createFolder');

router.get('/getNoteDetails/:user_id/:note_id', function(req, res, next) {
  let userId = req.params.user_id;
  let noteId = req.params.note_id;
  db.get().query(`
    Select * from notes where id = ? AND id in (Select note_id from user_notes where user_id = ?)
  `, [noteId, userId], function (err, rows) {
    if (err){
      res.json({
        status: "FAILURE",
        err: err
      });
    }
    res.json({
      status: "SUCCESS",
      data: rows
    });
  })
})

router.get('/getNoteDetailsByUrl/:url', function(req, res, next) {
  let url = req.params.url;
  db.get().query(`
    Select * from notes where url = ?
  `, url, function (err, rows) {
    if (err){
      res.json({
        status: "FAILURE",
        err: err
      });
    }
    res.json({
      status: "SUCCESS",
      data: rows
    });
  })
})

router.get('/getFolderDetails/:user_id/:folder_id', function(req, res, next) {
  let userId = req.params.user_id;
  let folderId = req.params.folder_id;
  console.log(userId, folderId)
  db.get().query(`
    Select * from notes where notes.folder_id = ? AND notes.folder_id = ? AND notes.folder_id in (Select folder_id from user_folders where id = ?)
  `, [folderId, folderId, userId], function (err, rows) {
    if (err){
      res.json({
        status: "FAILURE",
        err: err
      });
    } else {
      res.json({
        status: "SUCCESS",
        data: rows
      });
    }
  })
})

router.post('/login', function(req, res, next) {
  let email = req.body.email;
  let pwd = md5(req.body.pwd);
  console.log(email, pwd);
  db.get().query(`
    Select * from user where email = ? AND pwd = ?
  `, [email, pwd], function (err, rows) {
    if (err){
      res.json({
        status: "FAILURE",
        err: err,
      });
    }
    if (rows[0] && rows[0].email && rows[0].pwd) {
      delete rows[0].pwd
      res.json({
        data: rows[0],
        status: "SUCCESS"
      });
    } else {
      res.json({
        status: "FAILURE"
      });
    }
  })
})

router.patch('/updateFolder', function(req, res, next) {
  let folderId = req.body.id;
  let name =  req.body.name;
  
  db.get().query(`UPDATE folders SET name = ? where id = ?`, [name, folderId], function (err, rows) {
    if (err){
      res.json({
        err: err,
        status: "FAILURE"
      });
    }
    res.json({
      data: rows,
      status: "SUCCESS"
    });
  })
})

router.patch('/updateNote', function(req, res, next) {
  let noteId = req.body.id;
  let title =  req.body.title;
  let content =  encodeURI(req.body.content);
  db.get().query(`UPDATE notes SET title = ?, content = ? where id = ?`, [title, content, noteId], function (err, rows) {
    if (err){
      res.json({
        err: err,
        status: "FAILURE"
      });
    } else {
      res.json({
        data: rows,
        status: "SUCCESS"
      });
    }
  })
})
router.get('/getNotesAndFolders/:user_id', getNotesAndFolders);
router.post('/createNote/:user_id', createNote);
router.post('/createFolder/:user_id', createFolder);

module.exports = router;