import { Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import SuspenseWrapper from '../utils/Wrapper/SuspenseWrapper';

const SuccessAnimation = lazy(() => import('../pages/Static/SuccessAnimationPage/Index'));
const WelcomePage = lazy(() => import('../pages/Static/WelcomePage/Index'));
const NotFound = lazy(() => import('../pages/Static/NotFoundPage/Index'));
const Logout = lazy(() => import('../pages/AuthPage/logout/Index'));

export const StaticRoutes = (
  <>
    <Route
      path="/success"
      element={
        <SuspenseWrapper>
          <SuccessAnimation />
        </SuspenseWrapper>
      }
    />
    <Route
      path="/welcome"
      element={
        <SuspenseWrapper>
          <WelcomePage />
        </SuspenseWrapper>
      }
    />
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route
      path="*"
      element={
        <SuspenseWrapper>
          <NotFound />
        </SuspenseWrapper>
      }
    />
    <Route
      path="/logout"
      element={
        <SuspenseWrapper>
          <Logout />
        </SuspenseWrapper>
      }
    />
  </>
);
