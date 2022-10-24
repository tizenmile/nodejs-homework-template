const express = require('express')

const router = express.Router()
const contacts = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  res.json(await contacts.listContacts());
});


router.get('/:contactId', async (req, res, next) => {
  res.json(await contacts.getContactById(req.params.contactId));
})

router.post('/', async (req, res, next) => {
  res.status(201).json(await contacts.addContact(req.body));
})

router.delete('/:contactId', async (req, res, next) => {
  res.status(200).json(await contacts.removeContact(req.params.contactId, req.body));
})

router.put('/:contactId', async (req, res, next) => {
  res.json(await contacts.updateContact(req.params.contactId, req.body))
})

module.exports = router
