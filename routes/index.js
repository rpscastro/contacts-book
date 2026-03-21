const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags = ['Welcome to the Contacts Book API!']
  res.send("Welcome to the Contacts Book API!");
});

router.use("/contacts", require("./contacts"));

router.use("/tasks", require("./tasks"));

module.exports = router;
