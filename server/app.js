let express         = require('express');
let bodyParser      = require('body-parser');
let path            = require('path');
let morgan          = require("morgan");
let routes          = require('./routes');
let db              = require('./db');

let port = 8080;

let app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
console.log("Index file: ", path.join(__dirname, '..', 'build/index.html'));

app.use('/assets', express.static(path.join(__dirname, '..', 'build')));
app.use('/share', express.static(path.join(__dirname, '..', 'build')));
app.use('/', express.static(path.join(__dirname, '..', 'build')));


app.use('/api/v1', routes);

db.connect(function(err){
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
    console.log('Connection to MySQL is successfull');
    app.listen(port, function() {
      console.log('\nListening on port ' + port);
    });
  }
})

module.exports = app;