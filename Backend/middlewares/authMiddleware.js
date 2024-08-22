exports.isAuthenticated = (req, res, next) => {
  if (req.session.isVerified) {
      next();
  } else {
      res.status(401).json({ message: "Not authenticated" });
  }
};