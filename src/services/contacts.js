import ContactsCollection from "../db/models/Contact.js";

import calculatePaginationData from "../utils/calculatePaginationData.js";

export const getContacts = async ({ perPage, page }) => {
   const skip = (page -1) * perPage
    const contacts = await ContactsCollection.find().skip(skip).limit(perPage);
    const count = await ContactsCollection.find().countDocuments();

    const paginationData = calculatePaginationData({ count, perPage, page });


    return {
        page,
        perPage,
        contacts,
        totalItems: count,
        ...paginationData,
    };
}
export const getContactById = contactId => ContactsCollection.findById(contactId);

export const createContact = payload => ContactsCollection.create(payload);

export const updateContact = async(filter, data, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(filter, data, {
        includeResultMetadata: true,
        ...options,
    });

    if (!rawResult || !rawResult.value) return null;

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    }
}

export const deleteContact = filter => ContactsCollection.findOneAndDelete(filter);