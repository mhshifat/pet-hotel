import Joi from "joi";

const stringRequiredSchema = Joi.string().required();
const emailRequiredSchema = Joi.string()
  .email({ tlds: { allow: ["com"] } })
  .required();

export const loginValidationSchema: Record<string, Joi.StringSchema> = {
  email: emailRequiredSchema,
  password: Joi.string().min(5).required(),
};

export const registerValidationSchema: Record<string, Joi.StringSchema> = {
  firstName: stringRequiredSchema,
  lastName: stringRequiredSchema,
  email: emailRequiredSchema,
  password: Joi.string().min(6).required(),
};

export const createUserValidationObject: Record<string, Joi.StringSchema> = {
  firstName: stringRequiredSchema,
  lastName: stringRequiredSchema,
  email: emailRequiredSchema,
  phoneNumber: Joi.string().allow("").optional(),
  avatar: Joi.string().allow("").optional(),
  role: stringRequiredSchema,
  password: Joi.string().min(5).required(),
};

export const updateUserValidationObject: Record<string, Joi.StringSchema> = {
  id: Joi.string().allow("").optional(),
  firstName: stringRequiredSchema,
  lastName: stringRequiredSchema,
  email: emailRequiredSchema,
  phoneNumber: Joi.string().allow("").optional(),
  avatar: Joi.string().allow("").optional(),
  role: stringRequiredSchema,
};

export const createPetValidationObject: Record<string, Joi.StringSchema> = {
  owner: stringRequiredSchema,
  name: stringRequiredSchema,
  type: stringRequiredSchema,
  bread: stringRequiredSchema,
  size: stringRequiredSchema,
};

export const updatePetValidationObject: Record<string, Joi.StringSchema> = {
  id: Joi.string().allow("").optional(),
  owner: stringRequiredSchema,
  name: stringRequiredSchema,
  type: stringRequiredSchema,
  bread: stringRequiredSchema,
  size: stringRequiredSchema,
};

export const createBookingValidationObject: Record<
  string,
  Joi.StringSchema | Joi.NumberSchema | Joi.ArraySchema
> = {
  owner: stringRequiredSchema,
  pet: stringRequiredSchema,
  arrival: stringRequiredSchema,
  departure: stringRequiredSchema,
  notes: Joi.string().optional().allow(""),
  employeeNotes: Joi.string().optional().allow(""),
  cancellationNotes: Joi.string().optional().allow(""),
  images: Joi.array().items(Joi.string().optional()),
};

export const updateBookingValidationObject: Record<
  string,
  Joi.StringSchema | Joi.NumberSchema | Joi.ArraySchema
> = {
  id: Joi.string().allow("").optional(),
  status: Joi.string().optional().allow(""),
  notes: Joi.string().optional().allow(""),
  employeeNotes: Joi.string().optional().allow(""),
  cancellationNotes: Joi.string().optional().allow(""),
  images: Joi.array().items(Joi.string()),
};
