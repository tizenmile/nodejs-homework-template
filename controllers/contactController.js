const Contact = require("../models/contactsModel");

const listContacts = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: await Contact.find(),
      },
    });
  } catch (error) {
    res.status(400).json({ code: 404, message: error.message });
  }
};

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  try {
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: Contact.findOne({ _id: contactId }),
      },
    });
  } catch (error) {
    res.status(404).json({ code: 404, message: "Not found" });
  }
};

const removeContact = async (req, res) => {
  const contactId = req.params.contactId;
  try {
    await Contact.deleteOne({ _id: contactId });
    res.status(200).json({
      code: 200,
      message: "Contact deleted",
    });
  } catch (error) {
    res.status(404).json({ code: 404, message: "Not found" });
  }
};

const addContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const contact = new Contact({
    name: name,
    email: email,
    phone: phone,
    favorite,
  });
  try {
    const result = await contact.save();
    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

const updateContact = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;
  try {
    await Contact.updateOne(
      { _id: contactId },
      { name: body.name, phone: body.phone, email: body.email }
    );
    res.status(200).json({ status: "success", code: 200, data: body });
  } catch (error) {
    res.status(400).json({ code: 404, message: error.message });
  }
};

const updateContactFavorite = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;
  if (body.favorite.length) {
    res.status(200).json({ message: "missing field favorite" });
  }
  try {
    await Contact.updateOne({ _id: contactId }, { favorite: body.favorite });
    res.status(200).json({ status: "success", code: 200, data: body });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      data: { message: "missing field favorite" },
    });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactFavorite,
};
