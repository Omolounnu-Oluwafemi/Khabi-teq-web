/** @format */

import { cardData } from '@/data';
import React, { useEffect, useState } from 'react';
import arrowDown from '@/svgs/arrowDown.svg';
import Image from 'next/image';
import Button from './button';

const Card = ({ isRed }: { isRed?: boolean }) => {
  const [count, setCount] = useState<number>(4);
  const [text, setText] = useState<string>('View more');

  useEffect(() => {
    if (count === 6) {
      setText('View less');
    } else if (count === 4) {
      setText('View more');
    }
  }, [count]);
  return (
    <div className='md:w-[266px] w-full min-h-[446px] bg-white border-[1px] py-[21px] px-[19px] gap-[10px] transition-all duration-500'>
      <div className='flex flex-col gap-[3px] w-full'>
        <BreadCrumb limit={count} />
        <button
          type='button'
          className='min-h-[42px] border-[1px] py-[10px] px-[20px] bg-[#F3F8FC] flex justify-center items-center text-[14px] leading-[22.4px] text-[#1976D2] tracking-[0.1px]'>
          View Image
        </button>
        <button
          type='button'
          onClick={() => {
            setCount((count: number) => count + 2);
            if (count === 6) {
              setCount(4);
            }
          }}
          className='min-h-[37px] border-[1px] py-[10px] px-[20px] bg-[#F7F7F8] flex justify-center items-center text-[12px] leading-[19.2px] text-[#5A5D63] tracking-[0.1px] gap-1'>
          <span>{text}</span>
          <Image
            src={arrowDown}
            alt=''
            width={16}
            height={16}
            className={`w-[16px] h-[16px] transition-all duration-500 ${
              count === 6 && 'transform rotate-180'
            }`}
          />
        </button>
        {/* <button
          type='button'
          className='min-h-[50px] py-[12px] px-[24px] bg-[#8DDB90] text-[#FFFFFF] text-base leading-[25.6px] font-bold'>
          Select of Inspection
        </button> */}
        <Button
          value='Select of Inspection'
          type='button'
          green={isRed ? false : true}
          red={isRed}
          className='min-h-[50px] py-[12px] px-[24px] bg-[#8DDB90] text-[#FFFFFF] text-base leading-[25.6px] font-bold'
        />
      </div>
    </div>
  );
};

const BreadCrumb = ({ limit }: { limit: number }) => {
  return (
    <>
      {cardData.map((item, idx: number) => {
        if (idx < limit) {
          return (
            <div
              key={idx}
              className='min-h-[60px] w-full py-[5px] px-[20px] gap-[6px] flex flex-row justify-between items-center lg:items-start lg:flex-col bg-[#F7F7F8]'>
              <h2 className='text-[14px] leading-[22.4px] tracking-[0.1px] text-[#707281]'>
                {item.header}
              </h2>
              <span
                dangerouslySetInnerHTML={{ __html: item.value }}
                className='font-medium text-[14px] leading-[22.4px] tracking-[0.1px] text-[#0B0D0C]'
              />
            </div>
          );
        }
      })}
    </>
  );
};

export default Card;
