import AuthProvider from '@/providers/AuthProvider';
import { ToastProvider } from '@/providers/ToastProvider'; // Import ToastProvider
import ReactQueryProvider from '@/providers/ReactQueryProvider'; // Import ReactQueryProvider
import PageTransition from '@/components/ui/PageTransition'; // Import PageTransition
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
    <html lang="en" className="h-full">
      <body className="font-sans h-full w-full">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!CSS.supports('backdrop-filter', 'blur(1px)')) {
                document.documentElement.classList.add('no-backdrop-filter');
              }
            `,
          }}
        />
        <ReactQueryProvider>
          <AuthProvider>
            <ToastProvider> {/* Wrap children with ToastProvider */}
              {children}
            </ToastProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}