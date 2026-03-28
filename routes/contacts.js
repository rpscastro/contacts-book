const express = require("express");
const router = express.Router();
const contactValidate = require("../utilities/contact-validation");
const auth = require("../utilities/authenticate");

const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", auth.isAuthenticated, contactValidate.addContactRules(), contactValidate.checkContactData, contactsController.createContact);

router.put("/:id", auth.isAuthenticated, contactValidate.addContactRules(), contactValidate.checkContactData, contactsController.updateContact);

router.delete("/:id", auth.isAuthenticated, contactsController.deleteContact);

module.exports = router;