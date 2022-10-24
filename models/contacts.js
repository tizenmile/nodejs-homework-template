
const fs = require('fs').promises;
const Joi = require('joi');

const schema = Joi.object({
  id: Joi.string(),
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

  phone: Joi.string().required().min(3)
})


const listContacts = async () => {
  return fs.readFile('./models/contacts.json')
    .then(data => { return { status: 'success', code: 200, data: JSON.parse(data.toString()) } })
}


const getContactById = async (contactId) => {
  return fs.readFile('./models/contacts.json').then(data => JSON.parse(data.toString()).filter(el => el.id === contactId));
}

const removeContact = async (contactId) => {
  return fs.readFile('./models/contacts.json')
    .then(data => {
      let array = JSON.parse(data.toString())
      const newArray = array.filter(el => el.id != contactId);
      if (array.length === newArray.length) {
        return { code: 404, message: "Not found" }
      }
      array = [...newArray];
      fs.writeFile('./models/contacts.json', JSON.stringify(array))
      return { code: 200, message: "Contact deleted" }
    }
    )
}
const addContact = async ({ name, email, phone }) => {
  return fs.readFile('./models/contacts.json')
    .then(async data => {
      const array = JSON.parse(data.toString())
      const contact = {
        id: Date.now().toString(),
        name,
        email,
        phone: phone.toString(),
      }
      try {
        const value = await schema.validateAsync(contact);
        array.push(value)
        fs.writeFile('./models/contacts.json', JSON.stringify(array))
        return { status: 'success', code: 201, data: { contact } }
      } catch (error) {
        return { status: 'failed', code: 400, data: { message: error.details } }
      }

    })
}

const updateContact = async (contactId, body) => {
  return fs.readFile('./models/contacts.json')
    .then(async data => {
      const array = JSON.parse(data.toString())
      const contact = array.findIndex((obj => obj.id === contactId));
      try {
        await schema.validateAsync(body);
        array[contact].name = body.name;
        array[contact].phone = body.phone;
        array[contact].email = body.email;
        fs.writeFile('./models/contacts.json', JSON.stringify(array))
        return ({ status: 'success', code: 200, data: array[contact], });
      } catch (error) {
        return { status: 'failed', code: 400, data: { message: error.details } }
      }
    }
    )
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
