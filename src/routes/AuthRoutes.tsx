import { Route } from 'react-router-dom';
import AuthRoutesGuard from '../guards/AuthRoutes';
import { lazy } from 'react';
import SuspenseWrapper from '../utils/Wrapper/SuspenseWrapper';

const Signup = lazy(() => import('../pages/AuthPage/signup/Index'));
const Login = lazy(() => import('../pages/AuthPage/login/Index'));
const StoreRegister = lazy(() => import('../pages/StoreRegisterPage/Index'));

export const AuthRoutes = (
  <Route element={<AuthRoutesGuard />}>
    <Route
      path="/signup"
      element={
        <SuspenseWrapper>
          <Signup />
        </SuspenseWrapper>
      }
    />
    <Route
      path="/login"
      element={
        <SuspenseWrapper>
          <Login />
        </SuspenseWrapper>
      }
    />
    <Route
      path="/register"
      element={
        <SuspenseWrapper>
          <StoreRegister />
        </SuspenseWrapper>
      }
    />
  </Route>
);
