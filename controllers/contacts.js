const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // Implementation for getting all contacts
  try {
    const contacts = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (error) {
    console.error("getAllContacts error:", error);
    res.status(500).json({ message: error.message || error });
  }
};

const getContactById = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // Implementation for getting a contact by ID
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json("Must use a valid contact id to find a contact.");
  }
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = await mongodb.getDatabase()
      .db()
      .collection("contacts")
      .findOne({ _id: contactId });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  } catch (error) {
    console.error("getContactById error", error);
    res.status(500).json({ message: error.message || error });
  }
};

const createContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // Implementation for creating a new contact
  const contactData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    telephoneNumber: req.body.telephoneNumber,
    birthdate: req.body.birthdate,
    favoriteColor: req.body.favoriteColor,
    nationality: req.body.nationality,
    email: req.body.email,
    socialMedia: req.body.socialMedia,
    company: req.body.company,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(contactData);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the contact.",
      );
  }
};

const updateContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // Implementation for updating an existing contact
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json("Must use a valid contact id to update a contact.");
  }
  const contactId = new ObjectId(req.params.id);
  const contactData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    telephoneNumber: req.body.telephoneNumber,
    birthdate: req.body.birthdate,
    favoriteColor: req.body.favoriteColor,
    nationality: req.body.nationality,
    email: req.body.email,
    socialMedia: req.body.socialMedia,
    company: req.body.company,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .replaceOne({ _id: contactId }, contactData);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the contact.",
      );
  }
};

const deleteContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // Implementation for deleting a contact
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json("Must use a valid contact id to delete a contact.");
  }

  const contactId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .deleteOne({ _id: contactId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the contact.",
      );
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
