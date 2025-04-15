import { useEffect } from 'react';
import { removeNetworkErrorToast, showNetworkErrorToast } from '../utils/Toast/Toast';

const useNetworkStatus = () => {
  useEffect(() => {
    if (!navigator.onLine) {
      showNetworkErrorToast(); // Show error if offline on load
    }

    const handleOffline = () => showNetworkErrorToast();
    const handleOnline = () => removeNetworkErrorToast();

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);
};

export default useNetworkStatus;
