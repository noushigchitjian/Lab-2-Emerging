process.env.NODE_ENV = process.env.NODE_ENV || "development";
var mongoose = require("./config/mongoose");
var http = require("http");
app.set("port", port);
var server = http.createServer(app);
server.listen(port);
server.on("error", onError);
var debug = require("debug")("server:server");
server.on("listening", onListening);
var db = mongoose();
var app = require("./config/express");
var port = normalizePort(process.env.PORT || "3500");

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
