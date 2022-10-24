
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://homeUser:A12mongo@mongo.tizenmile.keenetic.pro/db-contacts`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const contacts = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {
  versionKey: false
});

const Contact = mongoose.model('contact', contacts);

const listContacts = async () => Contact.find();

const getContactById = async (contactId) => Contact.findOne({ _id: contactId });

const removeContact = async (contactId) => {
  try {
    await Contact.deleteOne({ _id: contactId });
    return { code: 200, message: "Contact deleted" }
  } catch (error) {
    return { code: 404, message: "Not found" }
  }
}

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({
    name,
    email,
    phone: phone.toString(),
    favorite,
  });
  try {
    const result = await contact.save();
    return { status: 'success', code: 201, data: { result } }
  } catch (error) {
    return { status: 'failed', code: 400, data: { message: error.details } }
  }
}

const updateContact = async (contactId, body) => {
  try {
    await Contact.updateOne({ _id: contactId }, { name: body.name, phone: body.phone, email: body.email });
    return ({ status: 'success', code: 200, data: body, });
  } catch (error) {
    return { status: 'failed', code: 400, data: { message: error.details } }
  }
}

const updateContactFavorite = async (contactId, body) => {
  if (body.favorite.length) {
    return { "message": "missing field favorite" }
  }
  try {
    await Contact.updateOne({ _id: contactId }, { favorite: body.favorite });
    return ({ status: 'success', code: 200, data: body, });
  } catch (error) {
    return { status: 'failed', code: 400, data: { message: "missing field favorite" } }
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactFavorite,
}
