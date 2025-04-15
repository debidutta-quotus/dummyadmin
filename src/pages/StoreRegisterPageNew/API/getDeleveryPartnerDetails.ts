import { deliveryPartners } from '../../../assets/DummyData/MockDeleveryPartners';

// const getDeliveryPartnerDetails = async () => {
//   const response = await fetch("http://localhost:3000/deliverypartners"); // Adjust API endpoint
//   return response.json();
// };

// export default getDeliveryPartnerDetails;

const getDeliveryPartnerDetails = async () => {
  return deliveryPartners;
};

export default getDeliveryPartnerDetails;
