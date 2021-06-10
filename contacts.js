const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    console.table(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const idArray = contacts.map(contact => contact.id);
    const id = idArray.reduce((accum, id) => {
      if (id > accum) {
        accum = id;
      }
      return accum + 1;
    });
    contacts.push({ id, name, email, phone });
    await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8');
    console.log({ id, name, email, phone });
    return { id, name, email, phone };
  } catch (err) {
    console.error(err);
  }
}
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const contactToFind = contacts.find(contact => contact.id === contactId);
    console.log(contactToFind);
    return contactToFind;
  } catch (err) {
    console.error(err);
  }
}
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const contactsAfterRemove = contacts.filter(
      contact => contact.id !== contactId,
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsAfterRemove),
      'utf8',
    );
    console.log(contacts.filter(contact => contact.id === contactId));
    return contacts.filter(contact => contact.id === contactId);
  } catch (err) {
    console.error(err);
  }
}
module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
