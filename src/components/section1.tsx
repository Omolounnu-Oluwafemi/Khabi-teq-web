/** @format */
'use client';
import { section1Data } from '@/data';
import React, { useRef } from 'react';
import { useVisibility } from '@/hooks/useVisibility';

const Section1 = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const countsRef = useRef<HTMLDivElement>(null);

  const isHeadingVisible = useVisibility(headingRef);
  const isTextVisible = useVisibility(textRef);
  const areCountsVisible = useVisibility(countsRef);

  return (
    <section className='lg:min-h-[500px] bg-white flex items-center justify-center'>
      <div className='container py-[30px] lg:py-0 lg:min-h-[400px] flex flex-col gap-[20px] items-center justify-center px-[20px]'>
        <div className='lg:w-[870px] w-full min-h-[173px] lg:min-h-[160px] flex flex-col gap-[24px] justify-center items-center '>
          <h2
            ref={headingRef}
            className={`lg:text-[42px] text-[24px] text-center text-[#09391C] leading-[28px] lg:leading-[49px] font-bold ${
              isHeadingVisible && 'slide-from-right'
            }`}>
            Discover more with Khabi-Teq
          </h2>
          <span
            ref={textRef}
            className={`font-normal lg:text-[18px] text-base leading-[25px] lg:leading-[28px] text-[#5A5D63] tracking-[5%] text-center ${
              isTextVisible && 'slide-from-left'
            }`}>
            Your trusted partner in Lagos&apos; real estate market. Since 2020,
            we&apos;ve been delivering expert solutions with integrity and
            personalized service, helping you navigate property sales, rentals,
            and more. Let us help you find your perfect property today
          </span>
        </div>
        <div
          ref={countsRef}
          className={`min-h-[49px] lg:h-[72px] w-full md:px-0 lg:w-[518px] flex gap-[24px] items-center justify-between ${
            areCountsVisible && 'slide-from-bottom'
          }`}>
          {section1Data.map(
            (item: { name: string; count: number }, idx: number) => {
              const { name, count } = item;
              return (
                <div
                  key={idx}
                  className={`flex flex-col gap-[1px] border-r-[2px] pr-[30px] ${
                    idx === section1Data.length - 1 ? 'border-r-0' : ''
                  }`}>
                  <h2 className='text-[#0B423D] font-bold text-[18px] lg:text-[28px] leading-[28px] lg:leading-[44px]'>
                    {count} +
                  </h2>
                  <span className='text-[#5A5D63] text-[12px] leading-[19.2px] lg:text-base lg:leading-[26px] font-normal'>
                    {name}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default Section1;