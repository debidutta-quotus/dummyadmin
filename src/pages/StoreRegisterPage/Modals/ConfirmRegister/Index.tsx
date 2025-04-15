import { PulseLoader } from 'react-spinners';
import './StoreRegisterConfirmationPage.css';
import { StoreForm } from '../../../../Types/StoreRegister/Index';

interface StoreRegisterConfirmationPageProps {
  formData: StoreForm;
  onPrevious: () => void;
  //   onCancel: () => void;
  onRegister: () => void;
  isLoading: boolean;
}

export default function StoreRegisterConfirmationPage({
  formData,
  onPrevious,
  //   onCancel,
  onRegister,
  isLoading,
}: StoreRegisterConfirmationPageProps) {
  const formatEmptyValue = (value: any) => {
    if (Array.isArray(value)) return value.length === 0 ? 'None selected' : value.join(', ');
    if (value === null || value === undefined || value === '') return '';
    return value;
  };

  return (
    <div className="store-register-confirmation-overlay">
      <div className="store-register-confirmation">
        <div className="store-register-confirmation-header">
          <h1>Review Your Information</h1>
          <p>Please verify all details before submitting</p>
        </div>

        <div className="store-register-confirmation-content">
          <section className="confirmation-section">
            <h2>Basic Information</h2>
            <div className="confirmation-grid">
              <div className="confirmation-item">
                <label>Store Name</label>
                <p>{formatEmptyValue(formData.storeInfo.storeName)}</p>
              </div>
              <div className="confirmation-item">
                <label>Brand Name</label>
                <p>{formatEmptyValue(formData.storeInfo.brandName)}</p>
              </div>
              <div className="confirmation-item">
                <label>Business Type</label>
                <p>{formatEmptyValue(formData.storeInfo.businessType)}</p>
              </div>
              <div className="confirmation-item">
                <label>Cuisine Type</label>
                <p>{formatEmptyValue(formData.storeInfo.cuisineType)}</p>
              </div>
              <div className="confirmation-item full-width">
                <label>Description</label>
                <p>{formatEmptyValue(formData.storeInfo.description)}</p>
              </div>
            </div>
          </section>

          <section className="confirmation-section">
            <h2>Contact Information</h2>
            <div className="confirmation-grid">
              <div className="confirmation-item">
                <label>Full Name</label>
                <p>
                  {formatEmptyValue(
                    `${formData.storeInfo.firstName} ${formData.storeInfo.lastName}`
                  )}
                </p>
              </div>
              <div className="confirmation-item">
                <label>Email</label>
                <p>{formatEmptyValue(formData.storeInfo.email)}</p>
              </div>
              <div className="confirmation-item">
                <label>Contact Number</label>
                <p>{formatEmptyValue(formData.storeInfo.contactNumber)}</p>
              </div>
              <div className="confirmation-item">
                <label>Website</label>
                <p>{formatEmptyValue(formData.storeInfo.websiteUrl)}</p>
              </div>
            </div>
          </section>

          <section className="confirmation-section">
            <h2>Store Address</h2>
            <div className="confirmation-grid">
              <div className="confirmation-item full-width">
                <label>Street Address</label>
                <p>{formatEmptyValue(formData.storeAddress.streetAddress)}</p>
              </div>
              <div className="confirmation-item">
                <label>Floor</label>
                <p>{formatEmptyValue(formData.storeAddress.floor)}</p>
              </div>
              <div className="confirmation-item">
                <label>Neighbourhood</label>
                <p>{formatEmptyValue(formData.storeInfo.neighbourhood)}</p>
              </div>
              <div className="confirmation-item">
                <label>City</label>
                <p>{formatEmptyValue(formData.storeAddress.city)}</p>
              </div>
              <div className="confirmation-item">
                <label>Region</label>
                <p>{formatEmptyValue(formData.storeAddress.region)}</p>
              </div>
              <div className="confirmation-item">
                <label>Country</label>
                <p>{formatEmptyValue(formData.storeAddress.country)}</p>
              </div>
              <div className="confirmation-item">
                <label>Postal Code</label>
                <p>{formatEmptyValue(formData.storeAddress.postalCode)}</p>
              </div>
            </div>
          </section>

          <section className="confirmation-section">
            <h2>Business Details</h2>
            <div className="confirmation-grid">
              <div className="confirmation-item">
                <label>Number of Locations</label>
                <p>{formatEmptyValue(formData.storeInfo.numberOfLocation)}</p>
              </div>
              <div className="confirmation-item">
                <label>Website URL</label>
                <p>{formatEmptyValue(formData.storeInfo.websiteUrl)}</p>
              </div>
              <div className="confirmation-item full-width">
                <label>Description</label>
                <p>{formatEmptyValue(formData.storeInfo.description)}</p>
              </div>
            </div>
          </section>

          <section className="confirmation-section">
            <h2>Operating Hours</h2>
            <div className="confirmation-grid">
              <div className="confirmation-item">
                <label>Opening Time</label>
                <p>{formatEmptyValue(formData.storeInfo.openTime)}</p>
              </div>
              <div className="confirmation-item">
                <label>Closing Time</label>
                <p>{formatEmptyValue(formData.storeInfo.closeTime)}</p>
              </div>
              <div className="confirmation-item full-width">
                <label>Operating Days</label>
                <p>{formatEmptyValue(formData.storeInfo.operatingDays)}</p>
              </div>
            </div>
          </section>

          <section className="confirmation-section">
            <h2>Delivery Partners</h2>
            <div className="confirmation-grid">
              <div className="confirmation-item full-width">
                <label>Selected Partners</label>
                <p>{formatEmptyValue(formData.storeInfo.deliveryPartnerID)}</p>
              </div>
            </div>
          </section>

          <section className="confirmation-section">
            <h2>Bank Details</h2>
            <div className="confirmation-grid">
              <div className="confirmation-item">
                <label>Bank Name</label>
                <p>{formatEmptyValue(formData.storeBankDetails.bankName)}</p>
              </div>
              <div className="confirmation-item">
                <label>Account Holder</label>
                <p>{formatEmptyValue(formData.storeBankDetails.accountHolder)}</p>
              </div>
              <div className="confirmation-item">
                <label>Account Number</label>
                <p>
                  {formData.storeBankDetails.accountNumber
                    ? '•'.repeat(formData.storeBankDetails.accountNumber.length - 4) +
                      formData.storeBankDetails.accountNumber.slice(-4)
                    : 'Optional'}
                </p>
              </div>
              <div className="confirmation-item">
                <label>IFSC Code</label>
                <p>{formatEmptyValue(formData.storeBankDetails.ifscCode)}</p>
              </div>
              <div className="confirmation-item">
                <label>IBAN</label>
                <p>{formatEmptyValue(formData.storeBankDetails.iban)}</p>
              </div>
              <div className="confirmation-item">
                <label>SWIFT Code</label>
                <p>{formatEmptyValue(formData.storeBankDetails.swiftCode)}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="store-register-confirmation-actions">
          {/* <button 
            onClick={onCancel}
            className="store-register-confirmation-button-secondary"
          >
            Cancel
          </button> */}
          <button onClick={onPrevious} className="store-register-confirmation-button-secondary">
            Edit
          </button>
          <button
            onClick={onRegister}
            className="store-register-confirmation-button-primary"
            disabled={isLoading}
          >
            {isLoading ? <PulseLoader color="#ffffff" size={8} margin={4} /> : 'Register Store'}
          </button>
        </div>
      </div>
    </div>
  );
}
