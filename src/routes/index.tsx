import { Routes as Router } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes';
import { AdminRoutes } from './AdminRoutes';
import { RestoRoutes } from './RestoRoutes';
import { StaticRoutes } from './StaticRoutes';

const AppRoutes = () => (
  <Router>
    {AuthRoutes}
    {AdminRoutes}
    {RestoRoutes}
    {StaticRoutes}
  </Router>
);

export default AppRoutes;
