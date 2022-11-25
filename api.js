const config = require('./config.json');
var express = require('express');
var app = express();
var cors = require('cors');
const mysql = require("mysql2");
const { spawn } = require('child_process');
const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};
const port = 5000;

app.use(cors(corsOptions))
app.use(express.json());
console.log('server start')
app.post('/api', function (req, res) {
  switch (req.body["type"]) {
    case "sql": {
      // connect MySQL
      var connection = mysql.createConnection(config.mysql);
      try {
        connection.query(req.body["query"], function (err, rows) {
          if (err) throw err;
          // console.debug('Response: ', rows);
          var data = { data: rows };
          res.json(data);
          // console.debug(data);
        });
      } catch (exception) {
        console.error(exception);
      } finally {
        connection.end();
      }
      break;
    }
    case "python": {
      var dataToSend = null;
      // spawn new child process to call the python script
      const argv = req.body["query"].map(x => x);
      argv[0] = "./scripts/" + argv[0]
      console.debug(argv);
      const python = spawn('python', argv);
      // collect data from script
      python.stdout.on('data', function (data) {
        console.debug('Pipe data from python script ...');
        dataToSend = data.toString();
        console.debug(dataToSend);
      });
      // in close event we are sure that stream from child process is closed
      python.on('close', (code) => {
        console.debug(`child process close all stdio with code ${code}`);
        // send data to browser
        var data = { data: dataToSend };
        res.send(data);
      });
      break;
    }
    default: {
      // var dataToSend = null;
      // // spawn new child process to call the python script
      // const python = spawn('python', ["test.py"]);
      // // collect data from script
      // python.stdout.on('data', function (data) {
      //   console.debug('Pipe data from python script ...');
      //   dataToSend = data.toString();
      //   console.debug(dataToSend);
      // });
      // // in close event we are sure that stream from child process is closed
      // python.on('close', (code) => {
      //   console.debug(`child process close all stdio with code ${code}`);
      //   // send data to browser
      //   var data = { data: dataToSend };
      //   res.send(data);
      // });
      break;
    }
  }
})
app.get('/', function (req, res) {
  var dataToSend = null;
  // spawn new child process to call the python script
  const python = spawn('python', ["./scripts/verify_account.py", "data", "werwer"]);
  // collect data from script
  python.stdout.on('data', function (data) {
    console.debug('Pipe data from python script ...');
    dataToSend = data.toString();
    console.debug(dataToSend);
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
    console.debug(`child process close all stdio with code ${code}`);
    // send data to browser
    var data = { data: dataToSend };
    res.send(data);
  });
});
app.listen(port);