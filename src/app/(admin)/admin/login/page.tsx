import { Suspense } from 'react';
import AdminLoginPage from './login-client';

export default function AdminLoginRoute() {
  return (
    <Suspense fallback={null}>
      <AdminLoginPage />
    </Suspense>
  );
}
