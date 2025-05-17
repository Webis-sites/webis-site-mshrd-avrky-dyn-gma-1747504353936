import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import SectionHeader from '@/components/SectionHeader';

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

        </div>
      </body>
    </html>
  );
}
