import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './StoreRegisterNew.css';
import countriesData from '../../assets/countries.json';
import {
  validateBasicInfo,
  validateContactInfo,
  validateAddress,
  validateBusinessDetails,
  validateOperatingHours,
  validateDeliveryPartners,
  validateBankDetails,
  StoreRegisterFormValidator,
} from '../../utils/Validator/StoreRegisterFormValidator';
import { showErrorToast, showSuccessToast } from '../../utils/Toast/Toast';
import ConfirmationModal from '../../utils/Modal/ConfirmationModal';
import { StoreForm, DeliveryPartner } from '../../Types/StoreRegister/Index';
import { initialFormState } from './data/initialFormState';
import getDeliveryPartnerDetails from './API/getDeleveryPartnerDetails';
import { registerStore } from './API/storeRegister';
import StoreRegisterConfirmationPage from './Modals/ConfirmRegister/Index';
import { Check } from 'lucide-react';
import { steps } from './data/registrationSteps';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function StoreRegisterNew() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<StoreForm>(initialFormState);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isRegistrationLoading, setIsRegistrationLoading] = useState(false);
  const [deliveryPartners, setDeliveryPartners] = useState<DeliveryPartner[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLDivElement>(null);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeliveryPartners = async () => {
      try {
        const partners = await getDeliveryPartnerDetails();
        setDeliveryPartners(partners);
      } catch (error) {
        console.error('Error fetching delivery partners:', error);
        showErrorToast('Failed to load delivery partners');
      }
    };

    fetchDeliveryPartners();
  }, []);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollTop = 0;
    }
  }, [currentStep]);

  const handleInputChange = (section: string, name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof StoreForm],
        [name]: value,
      },
    }));

    if (fieldErrors.has(name)) {
      const newErrors = new Set(fieldErrors);
      newErrors.delete(name);
      setFieldErrors(newErrors);
    }
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      storeInfo: {
        ...prev.storeInfo,
        operatingDays: prev.storeInfo.operatingDays.includes(day)
          ? prev.storeInfo.operatingDays.filter((d) => d !== day)
          : [...prev.storeInfo.operatingDays, day],
      },
    }));
  };

  const handleDeliveryPartnerToggle = (partnerId: number) => {
    setFormData((prev) => ({
      ...prev,
      storeInfo: {
        ...prev.storeInfo,
        deliveryPartnerID: prev.storeInfo.deliveryPartnerID.includes(partnerId)
          ? prev.storeInfo.deliveryPartnerID.filter((id) => id !== partnerId)
          : [...prev.storeInfo.deliveryPartnerID, partnerId],
      },
    }));
  };

  const validateCurrentStep = (): boolean => {
    let validationResult;

    switch (currentStep) {
      case 0:
        validationResult = validateBasicInfo(formData.storeInfo);
        break;
      case 1:
        validationResult = validateContactInfo(formData.storeInfo);
        break;
      case 2:
        validationResult = validateAddress(formData.storeAddress);
        break;
      case 3:
        validationResult = validateBusinessDetails(formData.storeInfo);
        break;
      case 4:
        validationResult = validateOperatingHours(formData.storeInfo);
        break;
      case 5:
        validationResult = validateDeliveryPartners(formData.storeInfo);
        break;
      case 6:
        validationResult = validateBankDetails(formData.storeBankDetails);
        break;
      default:
        return true;
    }

    if (!validationResult.isValid) {
      showErrorToast(validationResult.errors[0].message);

      const newErrors = new Set(validationResult.errors.map((error) => error.field));
      setFieldErrors(newErrors);

      const errorFields = document.querySelectorAll('.error');
      errorFields.forEach((field) => {
        field.classList.add('shake');
        setTimeout(() => field.classList.remove('shake'), 820);
      });

      return false;
    }

    setFieldErrors(new Set());
    return true;
  };

  const handleSubmit = async () => {
    const validationResult = StoreRegisterFormValidator(formData);

    if (validationResult.isValid) {
      try {
        setIsRegistrationLoading(true);
        const response = await registerStore(formData);
        showSuccessToast(response.message || 'Store registered successfully');
        navigate('/admin/dashboard');
      } catch (error: any) {
        showErrorToast(error.message || 'Registration failed');
      } finally {
        setIsRegistrationLoading(false);
      }
    } else {
      showErrorToast(validationResult.errors[0].message);

      const newErrors = new Set(validationResult.errors.map((error) => error.field));
      setFieldErrors(newErrors);

      const errorFields = document.querySelectorAll('.error');
      errorFields.forEach((field) => {
        field.classList.add('shake');
        setTimeout(() => field.classList.remove('shake'), 820);
      });
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setShowConfirmation(true);
      }
    }
  };

  const prevStep = () => {
    if (showConfirmation) {
      setShowConfirmation(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getFieldClassName = (fieldName: string) => {
    return `store-register-new-field ${fieldErrors.has(fieldName) ? 'error' : ''}`;
  };

  const renderBasicInfo = () => (
    <div className="form-content">
      <h2>Basic Information</h2>
      <div className="store-register-new-grid">
        <div className="form-group">
          <label className="store-register-new-label">Store Name *</label>
          <input
            type="text"
            value={formData.storeInfo.storeName}
            onChange={(e) => handleInputChange('storeInfo', 'storeName', e.target.value)}
            placeholder="Enter store name"
            className={getFieldClassName('storeName')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Brand Name *</label>
          <input
            type="text"
            value={formData.storeInfo.brandName}
            onChange={(e) => handleInputChange('storeInfo', 'brandName', e.target.value)}
            placeholder="Enter brand name"
            className={getFieldClassName('brandName')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Business Type *</label>
          <select
            value={formData.storeInfo.businessType}
            onChange={(e) => handleInputChange('storeInfo', 'businessType', e.target.value)}
            className={getFieldClassName('businessType')}
            autoComplete="off"
          >
            <option value="Restaurant">Restaurant</option>
            <option value="Convenience Store">Convenience Store</option>
            <option value="Coffee Shops">Coffee Shops</option>
            <option value="Bakeries">Bakeries</option>
          </select>
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Cuisine Type *</label>
          <select
            value={formData.storeInfo.cuisineType}
            onChange={(e) => handleInputChange('storeInfo', 'cuisineType', e.target.value)}
            className={getFieldClassName('cuisineType')}
            autoComplete="off"
          >
            <option value="American">American</option>
            <option value="BBQ">BBQ</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Indian">Indian</option>
            <option value="Mexican">Mexican</option>
            <option value="Thai">Thai</option>
            <option value="Korean">Korean</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="form-content">
      <h2>Contact Information</h2>
      <div className="store-register-new-grid">
        <div className="form-group">
          <label className="store-register-new-label">First Name *</label>
          <input
            type="text"
            value={formData.storeInfo.firstName}
            onChange={(e) => handleInputChange('storeInfo', 'firstName', e.target.value)}
            placeholder="Enter first name"
            className={getFieldClassName('firstName')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Last Name *</label>
          <input
            type="text"
            value={formData.storeInfo.lastName}
            onChange={(e) => handleInputChange('storeInfo', 'lastName', e.target.value)}
            placeholder="Enter last name"
            className={getFieldClassName('lastName')}
            autoComplete="off"
            name="store-lastname"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Email *</label>
          <input
            type="email"
            value={formData.storeInfo.email}
            onChange={(e) => handleInputChange('storeInfo', 'email', e.target.value)}
            placeholder="Enter email address"
            className={getFieldClassName('email')}
            autoComplete="off"
            name="store-email"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Contact Number *</label>
          <input
            type="number"
            value={formData.storeInfo.contactNumber}
            onChange={(e) => handleInputChange('storeInfo', 'contactNumber', e.target.value)}
            placeholder="Enter contact number"
            className={getFieldClassName('contactNumber')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Password *</label>
          <input
            type="password"
            value={formData.storeInfo.password}
            onChange={(e) => handleInputChange('storeInfo', 'password', e.target.value)}
            placeholder="Enter password"
            className={getFieldClassName('password')}
            autoComplete="new-password"
            name="store-password"
          />
        </div>
      </div>
    </div>
  );

  const renderAddress = () => (
    <div className="form-content">
      <h2>Address</h2>
      <div className="store-register-new-grid">
        <div className="form-group full-width">
          <label className="store-register-new-label">Street Address *</label>
          <input
            type="text"
            value={formData.storeAddress.streetAddress}
            onChange={(e) => handleInputChange('storeAddress', 'streetAddress', e.target.value)}
            placeholder="Enter street address"
            className={getFieldClassName('streetAddress')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Floor (optional)</label>
          <input
            type="number"
            value={formData.storeAddress.floor || 0}
            onChange={(e) => {
              handleInputChange('storeAddress', 'floor', e.target.value);
            }}
            placeholder="Enter floor number"
            className={getFieldClassName('floor')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Neighbourhood (optional)</label>
          <input
            type="text"
            value={formData.storeInfo.neighbourhood}
            onChange={(e) => handleInputChange('storeInfo', 'neighbourhood', e.target.value)}
            placeholder="Enter neighbourhood"
            className={getFieldClassName('neighbourhood')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">City *</label>
          <input
            type="text"
            value={formData.storeAddress.city}
            onChange={(e) => handleInputChange('storeAddress', 'city', e.target.value)}
            placeholder="Enter city"
            className={getFieldClassName('city')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Region *</label>
          <input
            type="text"
            value={formData.storeAddress.region}
            onChange={(e) => handleInputChange('storeAddress', 'region', e.target.value)}
            placeholder="Enter region"
            className={getFieldClassName('region')}
            autoComplete="address-level1"
            name="address-region"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Country *</label>
          <select
            value={formData.storeAddress.country}
            onChange={(e) => handleInputChange('storeAddress', 'country', e.target.value)}
            className={getFieldClassName('country')}
            autoComplete="off"
          >
            <option value="">Select a Country</option>
            {countriesData.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Postal Code *</label>
          <input
            type="text"
            value={formData.storeAddress.postalCode}
            onChange={(e) => handleInputChange('storeAddress', 'postalCode', e.target.value)}
            placeholder="Enter postal code"
            className={getFieldClassName('postalCode')}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="form-content">
      <h2>Business Details</h2>
      <div className="store-register-new-grid">
        <div className="form-group">
          <label className="store-register-new-label">Number of Locations *</label>
          <input
            type="number"
            value={formData.storeInfo.numberOfLocation}
            onChange={(e) =>
              handleInputChange('storeInfo', 'numberOfLocation', Number(e.target.value))
            }
            min="1"
            className={getFieldClassName('numberOfLocation')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Website URL (optional)</label>
          <input
            type="url"
            value={formData.storeInfo.websiteUrl}
            onChange={(e) => handleInputChange('storeInfo', 'websiteUrl', e.target.value)}
            placeholder="Enter website URL"
            className={getFieldClassName('websiteUrl')}
            autoComplete="off"
          />
        </div>
        <div className="form-group full-width">
          <label className="store-register-new-label">Description (optional) </label>
          <textarea
            value={formData.storeInfo.description}
            onChange={(e) => handleInputChange('storeInfo', 'description', e.target.value)}
            placeholder="Enter business description"
            rows={4}
            className={getFieldClassName('description')}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );

  const renderOperatingHours = () => (
    <div className="form-content">
      <h2>Operating Hours</h2>
      <div className="store-register-new-grid">
        <div className="form-group">
          <label className="store-register-new-label">Opening Time *</label>
          <input
            type="time"
            value={formData.storeInfo.openTime}
            onChange={(e) => handleInputChange('storeInfo', 'openTime', e.target.value)}
            className={getFieldClassName('openTime')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Closing Time *</label>
          <input
            type="time"
            value={formData.storeInfo.closeTime}
            onChange={(e) => handleInputChange('storeInfo', 'closeTime', e.target.value)}
            className={getFieldClassName('closeTime')}
            autoComplete="off"
          />
        </div>
        <div className="form-group full-width">
          <label className="store-register-new-label">Operating Days *</label>
          <div
            className={`store-register-new-checkbox-group ${fieldErrors.has('operatingDays') ? 'error' : ''}`}
          >
            {days.map((day) => (
              <label key={day} className="store-register-new-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.storeInfo.operatingDays.includes(day)}
                  onChange={() => handleDayToggle(day)}
                  className="store-register-new-checkbox"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeliveryPartners = () => (
    <div className="form-content">
      <div className="store-register-new-delivery-partners-header">
        <h2 className="store-register-new-delivery-partners-title">Delivery partners</h2>
        <span className="store-register-new-delivery-partners-count">
          {formData.storeInfo.deliveryPartnerID.length} selected
        </span>
      </div>
      <p className="store-register-new-devivery-partners-paragraph">
        Select your prefered delivery partners *
      </p>
      <div
        className={`store-register-new-delivery-partner-grid ${fieldErrors.has('deliveryPartnerID') ? 'error' : ''}`}
      >
        {deliveryPartners.map((partner) => (
          <div
            key={partner.id}
            className={`store-register-new-delivery-partner-card ${
              formData.storeInfo.deliveryPartnerID.includes(partner.id) ? 'selected' : ''
            }`}
            onClick={() => handleDeliveryPartnerToggle(partner.id)}
          >
            <div className="store-register-new-delivery-partner-logo-container">
              <img
                src={partner.logo}
                alt={`${partner.id} logo`}
                className="store-register-new-delivery-partner-logo"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBankDetails = () => (
    <div className="form-content">
      <h2>Bank Details</h2>
      <div className="store-register-new-grid">
        <div className="form-group">
          <label className="store-register-new-label">Bank Name *</label>
          <input
            type="text"
            value={formData.storeBankDetails.bankName}
            onChange={(e) => handleInputChange('storeBankDetails', 'bankName', e.target.value)}
            placeholder="Enter bank name"
            className={getFieldClassName('bankName')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Account Holder Name *</label>
          <input
            type="text"
            value={formData.storeBankDetails.accountHolder}
            onChange={(e) => handleInputChange('storeBankDetails', 'accountHolder', e.target.value)}
            placeholder="Enter account holder name"
            className={getFieldClassName('accountHolder')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">Account Number *</label>
          <input
            type="text"
            value={formData.storeBankDetails.accountNumber}
            onChange={(e) => handleInputChange('storeBankDetails', 'accountNumber', e.target.value)}
            placeholder="Enter account number"
            className={getFieldClassName('accountNumber')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">IFSC Code *</label>
          <input
            type="text"
            value={formData.storeBankDetails.ifscCode}
            onChange={(e) => handleInputChange('storeBankDetails', 'ifscCode', e.target.value)}
            placeholder="Enter IFSC code"
            className={getFieldClassName('ifscCode')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">IBAN *</label>
          <input
            type="text"
            value={formData.storeBankDetails.iban}
            onChange={(e) => handleInputChange('storeBankDetails', 'iban', e.target.value)}
            placeholder="Enter IBAN"
            className={getFieldClassName('iban')}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="store-register-new-label">SWIFT Code *</label>
          <input
            type="text"
            value={formData.storeBankDetails.swiftCode}
            onChange={(e) => handleInputChange('storeBankDetails', 'swiftCode', e.target.value)}
            placeholder="Enter SWIFT code"
            className={getFieldClassName('swiftCode')}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );

  if (showConfirmation) {
    return (
      <StoreRegisterConfirmationPage
        formData={formData}
        onPrevious={prevStep}
        onRegister={handleSubmit}
        isLoading={isRegistrationLoading}
      />
    );
  }

  return (
    <div className={`store-register-new-page ${isDarkMode ? 'dark' : ''}`}>
      <div className="store-register-new-header">
        <h1>Register Your Store</h1>
        <p>Connect your POS system with food delivery partners</p>
      </div>

      <div className="store-register-new-mobile-step-indicator">
        <div className="store-register-new-mobile-step-title">{steps[currentStep].title}</div>
        <div className="store-register-new-mobile-step-description">
          {steps[currentStep].description}
        </div>
        <div className="store-register-new-progress-bar">
          <div
            className="store-register-new-progress-fill"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="store-register-new-container">
        <div className="store-register-new-sidebar">
          <div className="store-register-new-steps-list">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`store-register-new-step-item ${index === currentStep ? 'active' : ''} ${
                  index < currentStep ? 'completed' : ''
                }`}
              >
                <div className="store-register-new-step-indicator">
                  {index < currentStep && (
                    <div className="check-icon">
                      {' '}
                      <Check size={12} strokeWidth={4} />{' '}
                    </div>
                  )}
                </div>
                <div className="store-register-new-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="store-register-new-main" ref={formRef}>
          <form className="store-register-new-form" autoComplete="off">
            {(() => {
              switch (currentStep) {
                case 0:
                  return renderBasicInfo();
                case 1:
                  return renderContactInfo();
                case 2:
                  return renderAddress();
                case 3:
                  return renderBusinessDetails();
                case 4:
                  return renderOperatingHours();
                case 5:
                  return renderDeliveryPartners();
                case 6:
                  return renderBankDetails();
                default:
                  return null;
              }
            })()}
            <div className="store-register-new-button-group">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="store-register-new-button-secondary"
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={nextStep}
                className="store-register-new-button-primary"
              >
                {currentStep === steps.length - 1 ? 'Review' : 'Next'}
              </button>
            </div>
          </form>
        </div>
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onRequestClose={() => setIsConfirmationOpen(false)}
          header="Skip Registration?"
          message="Want to skip store registration for now?"
          onConfirm={() => {
            setIsConfirmationOpen(false);
            navigate('/');
          }}
          onCancel={() => setIsConfirmationOpen(false)}
          proceedBtnText="Yes"
          closeBtnText="No"
        />
      </div>
    </div>
  );
}
