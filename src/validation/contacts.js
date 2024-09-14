import Joi from "joi";
import { contactTypeList } from "../constants/contacts.js";
import { stringRegexp } from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().pattern(stringRegexp).required().messages({
        "any.required": "name must be exist",
    }),
    phoneNumber: Joi.string().pattern(stringRegexp).required(),
    email: Joi.string().pattern(stringRegexp),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactTypeList).pattern(stringRegexp).required(),
});


export const contactPatchSchema = Joi.object({
    name: Joi.string().pattern(stringRegexp),
    phoneNumber: Joi.string().pattern(stringRegexp),
    email: Joi.string().pattern(stringRegexp),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactTypeList).pattern(stringRegexp),
})