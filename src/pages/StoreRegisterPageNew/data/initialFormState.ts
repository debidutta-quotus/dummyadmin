import { StoreForm } from '../../../Types';

export const initialFormState: StoreForm = {
  storeInfo: {
    // posId: 1,
    deliveryPartnerID: [],
    storeName: '',
    brandName: '',
    businessType: 'Restaurant',
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    password: '',
    neighbourhood: '',
    cuisineType: 'American',
    numberOfLocation: 1,
    description: '',
    websiteUrl: '',
    status: 'ACTIVE',
    available: true,
    openTime: '',
    closeTime: '',
    operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  storeAddress: {
    streetAddress: '',
    floor: 0,
    city: '',
    region: '',
    country: '',
    postalCode: '',
    latitude: 0,
    longitude: 0,
  },
  storeBankDetails: {
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    ifscCode: '',
    iban: '',
    swiftCode: '',
    isPrimary: true,
  },
};
