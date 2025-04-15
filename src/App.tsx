import { BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import AppRoutes from './routes/index';
import { ToastContainer } from 'react-toastify';
import useNetworkStatus from './services/useNetworkStatus';
import { useDispatch } from 'react-redux';
import { loadTokenFromCookies } from './store/features/auth/authUtils';
import { setToken } from './store/features/auth/authSlice';
import WentWrong from './pages/Static/ErrorBoundary/Index';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <WentWrong />;
    return this.props.children;
  }
}

function App() {
  const dispatch = useDispatch();
  useNetworkStatus();

  useEffect(() => {
    const token = loadTokenFromCookies();
    if (token) dispatch(setToken(token));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppRoutes />
        <ToastContainer />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
