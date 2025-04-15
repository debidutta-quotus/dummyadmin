export const Routes = {
  AuthRoutes: {
    Signup: '/signup',
    Login: '/login',
    Logout: '/logout',
    StoreRegister: '/register',
  },
  StaticRoutes: {
    Success: '/success',
    Welcome: '/welcome',
    Root: '/',
    NotFound: '*',
  },
  RestoRoutes: {
    Menu: '/menu',
    Menus: '/menus',
    Orders: '/orders',
  },
  AdminRoutes: {
    Dashboard: '/admin/dashboard',
    StoreRegisterNew: '/admin/storeregisternew',
    OutletList: '/admin/outletlist',
    AddChannel: '/admin/addchannel',
    IntegrationStatus: '/admin/integrationstatus',
    ActiveOrders: '/admin/active-orders',
    OrderHistory: '/admin/order-history',
  },
} as const;
