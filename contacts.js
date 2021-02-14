const fs = require("fs").promises;
const path = require("path");
const generateUniqueId = require("generate-unique-id");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const setContactId = generateUniqueId({
  length: 3,
  useLetters: false,
});

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    return contacts.map(({ name, email, phone }) =>
      console.log(`name: ${name}, email: ${email}, phone: ${phone}`)
    );
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const showContact = await contacts.find((contact) => {
      if (contact.id === contactId) {
        console.table(contact);
        return;
      }
    });
    return showContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const updatedList = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedList, null, 2),
      "utf-8"
    );
    console.log("Contact has been removed");
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: setContactId,
      name,
      email,
      phone,
    };
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const updatedList = [newContact, ...contacts];
    fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2), "utf-8");
    console.log(`Contact has been added`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
