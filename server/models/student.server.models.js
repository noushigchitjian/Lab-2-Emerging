let mongoose = require("mongoose");
let { Schema } = mongoose;
let passportLocalMongoose = require("passport-local-mongoose");
var bcrypt = require("bcrypt-nodejs");

let studentSchema = new Schema(
  {
    studentNumber: {
      type: String,
      match: [/[0-9]{9}/, "Student number should be 9 digits long number"],
      trim: true,
      sparse: true,
      required: "Please fill all fields",
    },
    firstName: {
      type: String,
      required: "Please fill all fields",
    },
    lastName: {
      type: String,
      required: "Please fill all fields",
    },
    address: String,
    city: String,
    phoneNumber: String,
    program: {
      type: String,
      required: "Please fill all fields",
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Please fill valid email address"],
      required: "Please fill all fields",
    },
    courses: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Course" },
        section: { type: String },
      },
    ],

    password: {
      type: String,
      required: "Please fill all fields",
      validate: [
        (password) => password && password.length >= 5,
        "Password length is minimum five characters/numbers",
      ],
    },
  },
  {
    timestamps: true,
  }
);
studentSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

studentSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

studentSchema.plugin(passportLocalMongoose);
mongoose.model("Student", studentSchema);
