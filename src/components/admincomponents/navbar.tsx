/** @format */

'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment } from 'react';
import {
  faUserGroup,
  faFileAlt,
  faMoneyCheckAlt,
  faChartBar,
  faBullhorn,
  faUserShield,
  faBorderAll,
} from '@fortawesome/free-solid-svg-icons';
import khabiteqIcon from '@/svgs/khabi-teq.svg';
import { archivo } from '@/styles/font';

const navItems = [
  {
    href: '/admin/agent_management',
    label: 'Agent Management',
    icon: faUserGroup,
    disabled: false,
  },
  {
    href: '/admin/agent_management',
    label: 'Dashboard Overview',
    icon: faBorderAll,
    disabled: true,
  },
  {
    href: '/admin/brief_management',
    label: 'Briefs Management',
    icon: faFileAlt,
    disabled: true,
  },
  {
    href: '/admin/transactions',
    label: 'Transaction Management',
    icon: faMoneyCheckAlt,
    disabled: true,
  },
  {
    href: '/admin/analytics',
    label: 'Advance Analytics',
    icon: faChartBar,
    disabled: true,
  },
  {
    href: '/admin/notifications',
    label: 'Notifications and Alerts',
    icon: faBullhorn,
    disabled: true,
  },
  {
    href: '/admin/roles',
    label: 'Role and Permission',
    icon: faUserShield,
    disabled: true,
  },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter(); // Added useRouter hook

  return (
    <Fragment>
      {/* <button
        type='button'
        className='flex py-6 px-8 min-h-full align-top '
        onClick={() => setIsOpen(!isOpen)}>
        {''}
        <FontAwesomeIcon
          icon={faBars}
          color='#fff'
          className='  bg-[#8DDB90] p-4 rounded-full shadow-md'
        />
      </button> */}

      <div
        className={`relative z-50 min-h-screen w-[270px] bg-white transition-transform duration-300 md:flex flex-col hidden`}>
        <Image
          src={khabiteqIcon}
          width={1000}
          height={1000}
          className='md:w-[169px] md:h-[40px] w-[144px] h-[40px] m-8 cursor-pointer'
          alt='Khabiteq Logo '
          onClick={() => router.push('/')} // Fixed navigation to landing page
        />
        <nav className='flex flex-col space-y-2 border-t-2 p-2 pt-4'>
          {navItems.map(({ href, label, icon, disabled }) => {
            const isActive = pathname === href;
            return (
              <div
                key={href}
                className={`flex items-center ${
                  archivo.className
                } p-4 rounded-md transition-all duration-200 text-base font-medium ${
                  isActive
                    ? 'text-[#8DDB90]'
                    : disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#515B6F] hover:bg-gray-200'
                }`}>
                <FontAwesomeIcon
                  width={24}
                  height={24}
                  icon={icon}
                  className='mr-3 text-lg w-[24px] h-[24px]'
                />
                {disabled ? (
                  <span>{label}</span>
                ) : (
                  <Link href={href}>
                    <span>{label}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </Fragment>
  );
}
