import { Schema, model } from 'mongoose';
import { contactTypeList } from '../../constants/contacts.js';
import { handleSaveError, setUpdateOptions } from './hooks.js';
import { stringRegexp } from '../../constants/contacts.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name must be exist'],
      match: stringRegexp,
    },
    phoneNumber: {
      type: String,
      required: [true, 'phoneNumber must be exist'],
      match: stringRegexp,
    },
    email: String,
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactTypeList,
      required: [true, 'contactType must be exist'],
      default: 'personal',
      match: stringRegexp,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', setUpdateOptions);

contactSchema.post('findOneAndUpdate', handleSaveError);

const ContactsCollection = model('contact', contactSchema);

export const sortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];

export default ContactsCollection;
