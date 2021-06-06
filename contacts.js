const path = require('path');
const fs = require('fs');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
  const data = fs.readFileSync(contactsPath, 'utf8');
  console.table(data);
  return data;
}
function addContact(name, email, phone) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
  const idArray = contacts.map(contact => contact.id);
  const id = idArray.reduce((accum, id) => {
    if (id > accum) {
      accum = id;
    }
    return accum + 1;
  });
  contacts.push({ id, name, email, phone });

  fs.writeFileSync(contactsPath, JSON.stringify(contacts), 'utf8');
  console.log({ id, name, email, phone });
  return { id, name, email, phone };
}
function getContactById(contactId) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
  const contactToFind = contacts.find(contact => contact.id === contactId);
  console.log(contactToFind);
  return contactToFind;
}
function removeContact(contactId) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
  const contactsAfterRemove = contacts.filter(
    contact => contact.id !== contactId,
  );
  fs.writeFileSync(contactsPath, JSON.stringify(contactsAfterRemove), 'utf8');
  console.log(contacts.filter(contact => contact.id === contactId));
  return contacts.filter(contact => contact.id === contactId);
}
module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
