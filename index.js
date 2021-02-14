const { Command } = require("commander");
const process = require("process");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const program = new Command();

program
  .version("0.0.1")
  .option("-a, --action <type>", "show all contacts")
  .option("-i, --id [id]", "get contact by id")
  .option("-n, --name [name]", "contact name", "EMPTY FIELD")
  .option("-e, --email [email]", "contact email", "EMPTY FIELD")
  .option("-p, --phone [phone]", "contact phone number", "EMPTY FIELD");

program.parse(process.argv);

const options = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(Number(id));
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(Number(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
