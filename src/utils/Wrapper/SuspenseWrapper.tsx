import React, { Suspense } from 'react';
import SuspenseLoader from '../../common/SuspenseLoader/AuthPages/Index';

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<SuspenseLoader />}>{children}</Suspense>
);

export default SuspenseWrapper;
