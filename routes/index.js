const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger"));

// router.get("/", (req, res) => {
//   //#swagger.tags = ['Welcome to the Contacts Book API!']
//   res.send("Welcome to the Contacts Book API!");
// });

router.use("/contacts", require("./contacts"));

router.use("/tasks", require("./tasks"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
