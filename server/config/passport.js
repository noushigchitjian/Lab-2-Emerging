var LocalStrategy = require("passport-local").Strategy;
var User = require("mongoose").model("Student");
module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "studentNumber",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, studentNumber, password, done) => {
        process.nextTick(() => {
          User.findOne({ studentNumber: studentNumber }, (err, user) => {
            if (err) return done(err);
            if (user) {
              return done(null, false, {
                message: "This Number is already in use",
              });
            } else {
              var newUser = new User(req.body);
              newUser.password = newUser.generateHash(password);
              newUser.save((err) => {
                if (err) return done(err);
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "studentNumber",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, studentNumber, password, done) => {
        User.findOne({ studentNumber: studentNumber }, (err, user) => {
          if (err) return done(err);
          if (!user)
            return done(null, false, { message: "Invalid ID or password" });
          if (!user.validPassword(password))
            return done(null, false, { message: "Invalid ID or password" });
          console.log(user);
          return done(null, user);
        });
      }
    )
  );
};
