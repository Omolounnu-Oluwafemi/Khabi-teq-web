/** @format */

'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import closeModalIcon from '@/svgs/cancelIcon.svg';
import { usePageContext } from '@/context/page-context';
import Input from '../Input';
import AttachFile from '../attach_file';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const OnUpgradeNotification = () => {
  const { settings, setSettings } = usePageContext();

  const validationSchema = Yup.object({
    companyName: Yup.string().required('Company name is required'),
    registrationNumber: Yup.number().required(
      'Registration number is required'
    ),
  });

  const formik = useFormik({
    initialValues: {
      companyName: '',
      registrationNumber: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      //simulating
      setSettings({
        ...settings,
        isUpgradeButtonClicked: false,
        upgradeStatus: {
          isAwatingUpgrade: true,
          isUpgraded: false,
          isYetToUpgrade: false,
        },
      });
    },
  });
  return (
    <motion.section className='w-full h-screen fixed z-50 top-0 px-[20px] flex justify-center items-center'>
      <motion.form
        initial={{ y: 80, opacity: 0 }}
        viewport={{ once: true }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        onSubmit={formik.handleSubmit}
        className='lg:w-[662px] w-full flex flex-col'>
        <div className='h-[90px] flex justify-end items-start'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            title='Close'
            onClick={() => {
              setSettings({ ...settings, isUpgradeButtonClicked: false });
            }}
            className='flex items-center justify-center rounded-full bg-[#FFFFFF] w-[51px] h-[51px] cursor-pointer'>
            <Image
              src={closeModalIcon}
              width={51}
              height={51}
              className='w-[24px] h-[24px]'
              alt='Close'
            />
          </motion.button>
        </div>
        <div className='w-full min-h-[389.47px] p-[20px] md:p-[30px] gap-[40px] bg-[#FFFFFF] border-[1px] border-[#C7CAD0] flex flex-col'>
          {/**First div */}
          <div className='lg:h-[239.47px] w-full flex flex-col gap-[20px]'>
            {/**Heading div */}
            <div className='w-full h-[63px] flex flex-col gap-[5px]'>
              <h2 className='text-[#09391C] text-[20px] font-medium leading-[160%]'>
                Upgrade to Corporate Agent{' '}
              </h2>
              <h3 className='text-[#09391C] text-base font-normal'>
                upgrade to Corporate Agent
              </h3>
            </div>
            {/**Input */}
            <div className='w-full lg:h-[156.47px] flex flex-col md:grid md:grid-cols-2 gap-[20px]'>
              <Input
                name='companyName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Joint venture'
                label='Business/Company Name'
                type='text'
              />
              <Input
                name='registrationNumber'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='3i458568686787'
                label='Registration Number'
                type='number'
              />
              <div className='col-span-2 flex justify-between items-center w-full'>
                <h2 className='text-nowrap text-[#202430] text-base font-semibold'>
                  Upload image
                </h2>
                <AttachFile heading=''  id="image-upload"/>
              </div>
            </div>
          </div>
          {/**Button to submit */}
          <div className='flex flex-col'>
            <button
              type='submit'
              className={`bg-[#8DDB90] gap-[10px] h-[50px] w-full text-base font-bold text-[#FAFAFA]`}>
              Submit
            </button>
            {(formik.errors.companyName || formik.touched.companyName) && (
              <span className='text-xs text-red-600'>
                {formik.errors.companyName}
              </span>
            )}
            {(formik.errors.registrationNumber ||
              formik.touched.registrationNumber) && (
              <span className='text-xs text-red-600'>
                {formik.errors.registrationNumber}
              </span>
            )}
          </div>
        </div>
      </motion.form>
    </motion.section>
  );
};

export default OnUpgradeNotification;
