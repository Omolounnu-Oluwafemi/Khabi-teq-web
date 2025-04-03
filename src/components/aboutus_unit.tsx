/** @format */

import React, { FC } from 'react';

interface HeadingProps {
  heading: string;
  description: string;
}

const AboutUsUnit: FC<HeadingProps> = ({ heading, description }) => {
  return (
    <div className='flex flex-col gap-[24px] w-full lg:w-[870px] min-h-[129px] py-[30px] lg:py-[50px] border-y-[1px] border-[border-[#D9D9D9]'>
      <h2 className='font-bold lg:text-[35px] text-[24px] leading-[28px] lg:leading-[41px] text-[#09391C]'>
        {heading}
      </h2>
      <span className='font-normal lg:text-[20px] lg:leading-[32px] text-base leading-[25.6px] tracking-[5%] text-[#5A5D63]'>
        {description}
      </span>
    </div>
  );
};

export default AboutUsUnit;
