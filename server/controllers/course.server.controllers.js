let mongoose = require("mongoose");
let Course = mongoose.model("Course");
let Student = mongoose.model("Student");
let bodyParser = require("body-parser");
module.exports.addCourse = (req, res, next) => {
  if (req.user) {
    let newCourse = new Course(req.body);

    newCourse
      .save()
      .then(() => res.json({ success: "yes", message: "Course Added" }))
      .catch((err) => res.json({ message: err.message }));
  } else return res.json({ message: "session expired" });
};

module.exports.deletCourse = (req, res, next) => {
  if (req.user) {
    Course.deleteOne({ _id: req.body.courseId })
      .then(res.json({ message: "Course Deleted" }))
      .catch((err) => res.json({ message: err.message }));
  } else return res.json({ message: "session expired" });
};

module.exports.showEnrolledStudents = (req, res, next) => {
  if (req.user) {
    Course.findOne({ _id: mongoose.Types.ObjectId(req.params.courseId) })
      .select({ students: 1 })
      .populate({
        path: "students",
        select: "studentNumber firstName lastName",
      })
      .then((result) => {
        res.json(result.students);
      })
      .catch((err) => res.json(err));
  } else return res.json({ message: "" });
};

module.exports.showCourseList = (req, res, next) => {
  if (req.user) {
    Course.find()
      .select({})
      .then((result) => res.json(result))
      .catch((err) => res.json(err.message));
  } else return res.json({ message: "" });
};
module.exports.findByCourseCode = (req, res, next) => {
  Course.findOne({ courseCode: req.params.courseCode }).then((result) => {
    res.send(result ? result : "Error Try again");
  });
};

module.exports.addStudentToCourse = (req, res, next) => {
  if (req.user) {
    Course.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.body.courseId),
      { $push: { students: mongoose.Types.ObjectId(req.body.studentId) } },
      { new: true, upsert: true },
      (err, managerparent) => {
        if (err) throw err;
        res.json(managerparent);
      }
    );
  } else return res.json({ message: "" });
};
