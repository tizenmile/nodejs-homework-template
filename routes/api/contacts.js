const express = require("express");
const router = express.Router();
const contacts = require("../../controllers/contactController");

router.get("/", contacts.listContacts);

router.get("/:contactId", contacts.getContactById);

router.post("/", contacts.addContact);

router.delete("/:contactId", contacts.removeContact);

router.put("/:contactId", contacts.updateContact);

router.patch("/:contactId/favorite", contacts.updateContactFavorite);

module.exports = router;
