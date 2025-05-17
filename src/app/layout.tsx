import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'משרד עורכי דין גמא',
  description: 'אנחנו משרד עורכי דין מוביל בתחום המשפטים עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4ECDC4" />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          {/* Navbar will be inserted here */}
          <Navbar />

          {children}


          <footer className="py-6 bg-gray-100 dark:bg-gray-800 mt-10">
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
              &copy; 2025 משרד עורכי דין גמא. webis
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
