const { body, validationResult } = require("express-validator");
const validate = {};

/*  **********************************
 *  Task Data Validation Rules
 * ********************************* */
validate.addTaskRules = () => {
  return [
    // description is required and must be a string if provided
    body("taskDescription")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1, max: 255 })
      .withMessage("The task description given does not meet requirements."),
  ];
};

validate.checkTaskData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
