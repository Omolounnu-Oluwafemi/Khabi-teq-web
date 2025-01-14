/** @format */

import type { Metadata } from 'next';
import './globals.css';
import { PageContextProvider } from '@/context/page-context';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { epilogue, roboto, archivo } from '@/styles/font';

export const metadata: Metadata = {
  title: 'Khabiteq',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageContextProvider>
      <html lang='en'>
        <body
          className={`${roboto.variable} ${archivo.variable} ${epilogue.variable} antialiased`}>
          {' '}
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </PageContextProvider>
  );
}
