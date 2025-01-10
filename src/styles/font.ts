/** @format */

// styles/font.js
import { Roboto, Open_Sans, Epilogue } from 'next/font/google';

export const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights you want to use (optional)
});

export const epilogue = Epilogue({
  subsets: ['latin'], // Specify subsets
  weight: ['400', '700'], // Specify weights
  style: ['normal', 'italic'], // Specify styles
  variable: '--font-epilogue', // Define a custom CSS variable
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-open-sans',
});
