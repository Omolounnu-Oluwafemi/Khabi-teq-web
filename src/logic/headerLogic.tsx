/** @format */

'use client';
import React, { Fragment } from 'react';
import Header from '@/components/header';
import AgentHeader from '@/components/agent_header';
import { usePathname } from 'next/navigation';

const HeaderLogic = () => {
  const pathname = usePathname();
  return (
    <Fragment>
      {pathname.includes('form') || pathname.includes('createBrief') ? (
        <AgentHeader />
      ) : (
        <Header />
      )}
    </Fragment>
  );
};

export default HeaderLogic;
