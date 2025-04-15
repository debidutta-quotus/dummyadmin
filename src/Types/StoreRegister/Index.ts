type BusinessType = 'Restaurant' | 'Convenience Store' | 'Coffee Shops' | 'Bakeries';
type Status = 'ACTIVE' | 'INACTIVE';
type CuisineType =
  | 'American'
  | 'BBQ'
  | 'Asian'
  | 'Italian'
  | 'Chinese'
  | 'Indian'
  | 'Mexican'
  | 'Thai'
  | 'Korean';

export interface StoreForm {
  storeInfo: {
    posId?: number;
    deliveryPartnerID: number[];
    storeName: string;
    brandName: string;
    businessType: BusinessType;
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
    password: string;
    neighbourhood: string;
    cuisineType: CuisineType;
    numberOfLocation: number;
    description?: string;
    websiteUrl?: string;
    status: Status;
    available: boolean;
    openTime: string;
    closeTime: string;
    operatingDays: string[];
  };
  storeAddress: {
    streetAddress: string;
    floor: number;
    city: string;
    region: string;
    country: string;
    postalCode: string;
    latitude?: number;
    longitude?: number;
  };
  storeBankDetails: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    ifscCode: string;
    iban: string;
    swiftCode: string;
    isPrimary: boolean;
  };
}

export interface DeliveryPartner {
  id: number;
  logo: string;
}

export interface RenderAddressProps {
  formData: StoreForm;
  handleInputChange: (section: string, name: string, value: any) => void;
}
