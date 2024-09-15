import createHttpError from "http-errors"

import * as contactServices from "../services/contacts.js";

import parsePaginationParams from "../utils/parsPaginationParams.js";

import parseSortParams from "../utils/parsSortParams.js";

import { sortFields } from "../db/models/Contact.js";


export const getAllContactsController = async (req, res, next) => {
    
    const { perPage, page } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams({...req.query, sortFields});

    console.log(req.query)

    const data = await contactServices.getContacts({perPage, page, sortBy, sortOrder});

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
}

export const getContactByIdController = async (req, res ) => {
    
        const { contactId } = req.params;
        const data = await contactServices.getContactById(contactId);

        if (!data) {

            throw createHttpError(404, `Movie with id=${contactId} not found`);
        }
        
        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data,
        })

}

export const addContactController = async (req, res) => {

    const data = await contactServices.createContact(req.body);
    
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
}

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactServices.updateContact({ _id: contactId }, req.body);

    if (!result) {
        throw createHttpError(404, `Movie with id=${contactId} not found`);
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.data,
    })
}

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const data = await contactServices.deleteContact({ _id: contactId });

        if (!data) {
        throw createHttpError(404, `Movie with id=${contactId} not found`);
        }
    
    res.status(204).send();
}