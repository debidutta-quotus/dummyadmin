// src/utils/toast.ts
import { toast, Id } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showWarningToast = (message: string) => {
  toast.warn(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Store the toast ID for the persistent network error toast
let networkToastId: Id | null = null;

// Function to show a persistent network error toast
export const showNetworkErrorToast = () => {
  if (!networkToastId) {
    networkToastId = toast.error('No Internet Connection!', {
      position: 'bottom-left',
      autoClose: false, // Stay until network is restored
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      hideProgressBar: true,
      toastId: 'network-error', // Unique ID for this toast
    });
  }
};

// Function to remove the network error toast and show success message
export const removeNetworkErrorToast = () => {
  if (networkToastId !== null) {
    toast.dismiss(networkToastId); // Remove the error toast
    networkToastId = null;

    // Show success toast for 3 seconds
    toast.success('Back Online!', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  }
};
