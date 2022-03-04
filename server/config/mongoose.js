var config = require("./config"),
  mongoose = require("mongoose");
module.exports = function () {
  const db = mongoose
    .connect(config.db)
    .then(() => console.log("DB Successfully Connected!"))
    .catch((err) => {
      console.log("Error");
    });

  require("../models/course.server.models");
  require("../models/student.server.models");
  return db;
};
