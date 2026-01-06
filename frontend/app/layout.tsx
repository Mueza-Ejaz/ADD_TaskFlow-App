import AuthProvider from '@/providers/AuthProvider';
import { ToastProvider } from '@/providers/ToastProvider'; // Import ToastProvider
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ADD TaskFlow App',
  description: 'Task management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider> {/* Wrap children with ToastProvider */}
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}