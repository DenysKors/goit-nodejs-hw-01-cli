const path = require("path");
const fs = require("fs").promises;

const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("1234567890", 3);

const contactsPath = path.join("db", "contacts.json");

// This function read and show contacts database file
async function listContacts() {
	try {
		const result = await fs.readFile(contactsPath);
		const contacts = JSON.parse(result);
		console.table(contacts);
	} catch (error) {
		console.log(error.message);
	}
}

// This function read and show contact selected by id
async function getContactById(id) {
	try {
		const result = await fs.readFile(contactsPath);

		const contacts = JSON.parse(result);
		const contactById = contacts.find(contact => contact.id === id);

		if (contactById === undefined) {
			return console.warn(`\x1B[31m Contact by id=${id} not found !`);
		}

		console.table(contactById);
	} catch (error) {
		console.log(error.message);
	}
}

// This function remove contact by id from database file
async function removeContact(id) {
	try {
		const result = await fs.readFile(contactsPath);

		const contacts = JSON.parse(result);

		const contactById = contacts.find(contact => contact.id === id);

		if (contactById === undefined) {
			return console.warn(`\x1B[31m Unable to remove. Contact by id=${id} not found !`);
		}

		const filteredContact = contacts.filter(contact => contact.id !== id);

		const jsonContacts = JSON.stringify(filteredContact);

		await fs.writeFile(contactsPath, jsonContacts);

		const readResult = await fs.readFile(contactsPath);
		const contactsResult = JSON.parse(readResult);

		console.table(contactsResult);
	} catch (error) {}
}

// This function add contact to database file
async function addContact(name, email, phone) {
	try {
		const result = await fs.readFile(contactsPath);

		const contacts = JSON.parse(result);
		const newContact = { id: nanoid(), name, email, phone };
		const updatedContacts = [...contacts, newContact];
		const jsonContacts = JSON.stringify(updatedContacts);

		await fs.writeFile(contactsPath, jsonContacts);

		const readResult = await fs.readFile(contactsPath);

		const contactsResult = JSON.parse(readResult);

		console.table(contactsResult);
	} catch (error) {}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
