/** @format */

'use client';
import React, { FC } from 'react';
import Image, { StaticImageData } from 'next/image';

import lineStyle from '@/svgs/linestyle.svg';
import Button from './button';

interface HeroSectionProps {
  image: StaticImageData;
  headingText: string;
  description: string;
  buttonText: string;
  bgColor: string;
  borderColor: string;
}

const HeroSection: FC<HeroSectionProps> = ({
  image,
  headingText,
  description,
  buttonText,
  bgColor,
  borderColor,
}) => {
  return (
    /**#0A3E72 */
    <section className='flex items-center justify-center min-h-[536px] w-full overflow-hidden pt-[20px]'>
      <div className='container h-full flex md:flex-row flex-col px-[20px] slide-from-bottom'>
        <div
          style={{ backgroundColor: bgColor }}
          className={`md:w-[50%] lg:w-[40%] w-full lg:h-[536px] flex flex-col gap-[20px] flex-grow-1 px-[20px] lg:px-[40px] py-[20px] lg:py-[40px] border-[1px] border-[${borderColor}`}>
          <h2 className='lg:text-[60px] font-semibold text-[50px] leading-[55px] font-display lg:leading-[66px] text-[#FFFFFF]'>
            {headingText}{' '}
            <span className='text-[#8DDB90] font-display'>Khabiteq</span>
          </h2>
          <Image
            src={lineStyle}
            width={1000}
            height={1000}
            alt=''
            className='w-[455px] h-[40px]'
          />
          <p className='font-normal text-[20px] lg:leading-[32px] leading-[25px] text-[#FFFFFF]'>
            {description}
          </p>
          <Button
            green={true}
            className='h-[66px] w-full lg:w-[393px] py-[12px] px-[24px] text-white text-[20px] leading-[32px] font-bold'
            value={buttonText}
            onClick={() => {
              window.location.href = '/auth/agent';
            }}
          />
        </div>
        <Image
          src={image}
          className='md:w-[50%] lg:w-[60%] w-full h-[294px] md:h-[536px] object-cover'
          alt=''
          width={1000}
          height={1000}
        />
      </div>
    </section>
  );
};

export default HeroSection;
