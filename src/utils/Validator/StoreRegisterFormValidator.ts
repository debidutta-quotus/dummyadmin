import { z } from 'zod';
import { StoreForm } from '../../Types';

// Zod schemas for each section
const basicInfoSchema = z.object({
  storeName: z.string().min(1, 'Store name can not be empty'),
  brandName: z.string().min(1, 'Brand name can not be empty'),
  businessType: z.string().min(1, 'Business Type is required'),
  cuisineType: z.string().min(1, 'Cuisine Type is required'),
});

const contactInfoSchema = z.object({
  firstName: z.string().min(1, 'First name can not be empty'),
  lastName: z.string().min(1, 'Last name can not be empty'),
  email: z.string().email('Invalid email format'),
  contactNumber: z
    .string()
    .min(1, 'Contact Number cannot be empty')
    .regex(/^\d+$/, 'Contact Number must contain only digits'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/(?=.*\d)/, 'Password must contain at least one number'),
});

const addressSchema = z.object({
  streetAddress: z.string().min(1, 'Street Address is required'),
  city: z.string().min(1, 'City is required'),
  region: z.string().min(1, 'Region is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().min(1, 'Postal Code is required'),
  // floor: z.number().nullable(),
});

const businessDetailsSchema = z.object({
  numberOfLocation: z.number().min(1, 'Number of Locations must be at least 1'),
  websiteUrl: z.string().url('Invalid website URL format').optional().or(z.literal('')),
  description: z.string().optional(),
  neighbourhood: z.string().optional(),
});

const operatingHoursSchema = z.object({
  openTime: z.string().min(1, 'Open Time is required'),
  closeTime: z.string().min(1, 'Close Time is required'),
  operatingDays: z.array(z.string()).min(1, 'At least one Operating Day must be selected'),
});

const deliveryPartnersSchema = z.object({
  deliveryPartnerID: z.array(z.number()).min(1, 'At least one Delivery Partner must be selected'),
});

const bankDetailsSchema = z.object({
  bankName: z.string().min(1, 'Bank Name is required'),
  accountNumber: z.string().regex(/^\d+$/, 'Account Number must contain only digits'),
  accountHolder: z.string().min(1, 'Account Holder is required'),
  ifscCode: z.string().min(1, 'IFSC Code is required'),
  iban: z
    .string()
    .regex(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/, 'Invalid IBAN format'),
  swiftCode: z.string().regex(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 'Invalid SWIFT Code format'),
});

// Combined schema for store info
const storeInfoSchema = basicInfoSchema
  .merge(contactInfoSchema)
  .merge(businessDetailsSchema)
  .merge(operatingHoursSchema)
  .merge(deliveryPartnersSchema);

// Complete form schema
const storeFormSchema = z.object({
  storeInfo: storeInfoSchema,
  storeAddress: addressSchema,
  storeBankDetails: bankDetailsSchema,
});

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Helper function to format Zod errors
const formatZodErrors = (error: z.ZodError): ValidationError[] => {
  return error.errors.map((err) => ({
    field: err.path[err.path.length - 1].toString(),
    message: err.message,
  }));
};

// Validation functions using Zod schemas
export const validateBasicInfo = (storeInfo: StoreForm['storeInfo']): ValidationResult => {
  try {
    basicInfoSchema.parse(storeInfo);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: formatZodErrors(error) };
    }
    return { isValid: false, errors: [{ field: 'unknown', message: 'Validation failed' }] };
  }
};

export const validateContactInfo = (storeInfo: StoreForm['storeInfo']): ValidationResult => {
  try {
    contactInfoSchema.parse(storeInfo);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: formatZodErrors(error) };
    }
    return { isValid: false, errors: [{ field: 'unknown', message: 'Validation failed' }] };
  }
};

export const validateAddress = (storeAddress: StoreForm['storeAddress']): ValidationResult => {
  try {
    addressSchema.parse(storeAddress);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: formatZodErrors(error) };
    }
    return { isValid: false, errors: [{ field: 'unknown', message: 'Validation failed' }] };
  }
};

export const validateBusinessDetails = (storeInfo: StoreForm['storeInfo']): ValidationResult => {
  try {
    businessDetailsSchema.parse(storeInfo);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: formatZodErrors(error) };
    }
    return { isValid: false, errors: [{ field: 'unknown', message: 'Validation failed' }] };
  }
};

export const validateOperatingHours = (storeInfo: StoreForm['storeInfo']): ValidationResult => {
  try {
    operatingHoursSchema.parse(storeInfo);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: formatZodErrors(error) };
    }
    return { isValid: false, errors: [{ field: 'unknown', message: 'Validation failed' }] };
  }
};

export const validateDeliveryPartners = (storeInfo: StoreForm['storeInfo']): ValidationResult => {
  try {
    deliveryPartnersSchema.parse(storeInfo);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: formatZodErrors(error) };
    }
    return { isValid: false, errors: [{ field: 'unknown', message: 'Validation failed' }] };
  }
};

export const validateBankDetails = (
  bankDetails: StoreForm['storeBankDetails']
): ValidationResult => {
  try {
    bankDetailsSchema.parse(bankDetails);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: formatZodErrors(error) };
    }
    return { isValid: false, errors: [{ field: 'unknown', message: 'Validation failed' }] };
  }
};

// Main validator function that validates the entire form
export const StoreRegisterFormValidator = (formData: StoreForm): ValidationResult => {
  try {
    storeFormSchema.parse(formData);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: formatZodErrors(error) };
    }
    return { isValid: false, errors: [{ field: 'unknown', message: 'Validation failed' }] };
  }
};
