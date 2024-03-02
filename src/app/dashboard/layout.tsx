import { AuthConsumer, AuthProvider } from '@/auth/context';
import DashboardLayout from '@/layouts/dashboard/layout';
import React, { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <AuthConsumer>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthConsumer>
    </AuthProvider>
  );
}
