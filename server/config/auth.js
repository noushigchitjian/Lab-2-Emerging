module.exports.requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send("login");
  }
  next();
};
