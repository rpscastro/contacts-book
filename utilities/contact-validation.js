const { body, validationResult } = require("express-validator");
const validate = {};

/*  **********************************
 *  Contact Data Validation Rules
 * ********************************* */
validate.addContactRules = () => {
  return [
    // firstname is required and must be string
    body("firstName")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1, max: 100 })
      .withMessage("The first name given does not meet requirements."),
    // lastname is required and must be string
    body("lastName")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1, max: 100 })
      .withMessage("The last name given does not meet requirements."),
    // email is required and must be a valid email address
    body("email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .withMessage("The email given does not meet requirements."),
    // phone is required and must be a valid phone number
    body("telephoneNumber")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("The phone number given does not meet requirements."),
  ];
};

validate.checkContactData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
