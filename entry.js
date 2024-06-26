#!/usr/bin/env node

/**
 * Module dependencies.
 */

 var app = require('./app');
 var debug = require('debug')('hop-on:server');
 var fs = require('fs')
 var http = require('http');
 // var privateKey  = fs.readFileSync(__dirname + '/ssl/private.key');
 // var certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt');
 // var credentials = { key: privateKey, cert: certificate};
 // var https = require('https');
 /**
  * Get port from environment and store in Express.
  */
 
 var port = normalizePort(process.env.PORT || '80');
 app.set('port', port);
 
 /**
  * Create HTTP server.
  */
 
 var server = http.createServer(app);
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 console.log('app run on port:' + port)
 server.on('error', onError);
 server.on('listening', onListening);
 
 app.use((req, res, next) => {
   // if (req.protocol === 'http') {
   //   res.redirect(301, `https://${req.headers.host}${req.url}`)
   // }
   next()
 })
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val) {
   var port = parseInt(val, 10);
 
   if (isNaN(port)) {
     // named pipe
     return val;
   }
 
   if (port >= 0) {
     // port number
     return port;
   }
 
   return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
 function onError(error) {
   if (error.syscall !== 'listen') {
     throw error;
   }
 
   var bind = typeof port === 'string'
     ? 'Pipe ' + port
     : 'Port ' + port;
 
   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'port ' + addr.port;
   debug('Listening on ' + bind);
 }
 