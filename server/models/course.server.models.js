let mongoose = require("mongoose");
const { Schema } = mongoose;
require("../models/student.server.models");

const courseSchema = new Schema(
  {
    courseCode: {
      type: String,
      unique: true,
      trim: true,
      required: "Please fill all fields",
      uppercase: true,
    },
    courseName: {
      type: String,
      required: "Please fill all fields",
    },
    section: {
      type: String,
      required: "Please fill all fields",
    },
    semester: String,
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

mongoose.model("Course", courseSchema);
