const express = require("express");
const router = express.Router();
const contactValidate = require("../utilities/contact-validation");

const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", contactValidate.addContactRules(), contactValidate.checkContactData, contactsController.createContact);

router.put("/:id", contactValidate.addContactRules(), contactValidate.checkContactData, contactsController.updateContact);

router.delete("/:id", contactsController.deleteContact);

module.exports = router;