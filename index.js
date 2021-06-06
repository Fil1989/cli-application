const operations = require('./contacts');
// operations.addContact(
//   6,
//   "Abbot Franks",
//   "scelerisque@magnis.org",
//   "(186) 568-3720"
// );
// operations.removeContact(1);
const argv = require('yargs').argv;
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      operations.listContacts();
      break;

    case 'get':
      operations.getContactById(id);
      break;

    case 'add':
      operations.addContact(name, email, phone);
      break;

    case 'remove':
      operations.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
// node index.js--action remove--id = 13

invokeAction(argv);
