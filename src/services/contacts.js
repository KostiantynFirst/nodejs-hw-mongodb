import ContactsCollection from "../db/models/Contact.js";

export const getAllContacts = () => ContactsCollection.find();
export const getContactById = contactId => ContactsCollection.findById(contactId);