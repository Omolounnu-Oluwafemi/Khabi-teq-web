/** @format */
'use client';
import { GlobalContextTypes } from '@/types';
import { createContext, useContext, useState } from 'react';

/** @format */
const PageContext = createContext<GlobalContextTypes | undefined>(undefined);

export const PageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isContactUsClicked, setIsContactUsClicked] = useState<boolean>(false);
  const [rentPage, setRentPage] = useState({
    isSubmitForInspectionClicked: false,
  });
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const [selectedNav, setSelectedNav] = useState<string>('Create Brief'); //Agent Navigation

  return (
    <PageContext.Provider
      value={{
        isContactUsClicked,
        setIsContactUsClicked,
        rentPage,
        setRentPage,
        selectedNav,
        setSelectedNav,
        isModalOpened,
        setIsModalOpened,
      }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('');
  }
  return context;
};
