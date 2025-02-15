/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import Loading from '@/components/loading';
import { useLoading } from '@/hooks/useLoading';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import mailIcon from '@/svgs/envelope.svg';
import phoneIcon from '@/svgs/phone.svg';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@/components/button';
import RadioCheck from '@/components/radioCheck';
import { RegisterWith } from '@/components/registerWith';
import googleIcon from '@/svgs/googleIcon.svg';
import facebookIcon from '@/svgs/facebookIcon.svg';
import Link from 'next/link';
import { usePageContext } from '@/context/page-context';
import { useUserContext } from '@/context/user-context';
import { POST_REQUEST } from '@/utils/requests';
import { URLS } from '@/utils/URLS';
import toast from 'react-hot-toast';
// import { resolve } from 'path';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Login = () => {
  const isLoading = useLoading();
  const { isContactUsClicked } = usePageContext();
  const { setUser } = useUserContext();
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required('enter email'),
    password: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validationSchema,
    onSubmit: async (values) => {
      try {
        const url = URLS.BASE + URLS.agentLogin;
        const { ...payload } = values;
        await toast.promise(
          POST_REQUEST(url, { ...payload }).then((response) => {
            console.log('response from signin', response);
            if ((response as any).user.id) {
              toast.success('Sign in successful');
              Cookies.set('token', (response as any).token);
              setUser((response as any).user);
              router.push('/auth/agent/createBrief');
              return 'Sign in successful';
            } else {
              const errorMessage = (response as any).error || 'Sign In failed';
              toast.error(errorMessage);
              throw new Error(errorMessage);
            }
          }),
          {
            loading: 'Logging in...',
            success: 'Welcome Back!',
          }
        );
      } catch (error) {
        // console.log(error);
        // toast.error('Sign In failed, please try again!');
      }
    },
  });

  if (isLoading) return <Loading />;
  return (
    <section
      className={`flex items-center justify-center bg-[#EEF1F1] w-full ${
        isContactUsClicked && 'filter brightness-[30%]'
      } transition-all duration-500`}
    >
      <div className='container flex items-center justify-center py-[30px] mt-[60px] px-[25px] lg:px-0'>
        <form
          onSubmit={formik.handleSubmit}
          className='lg:w-[600px] w-full min-h-[700px] flex flex-col items-center gap-[20px]'
        >
          <h2 className='text-[24px] font-display leading-[38.4px] font-semibold text-[#09391C]'>
            Sign In To Your Account
          </h2>
          <div className='w-full flex flex-col gap-[15px] lg:px-[60px]'>
            <Input
              formik={formik}
              title='Email'
              id='email'
              icon={mailIcon}
              type='email'
              placeholder='Enter your email'
            />
            <Input
              formik={formik}
              title='Password'
              id='password'
              icon={''}
              type='password'
              placeholder='Enter your password'
            />
          </div>
          {/**Button */}
          <Button
            value='Sign In'
            isDisabled
            className='min-h-[65px] w-full py-[12px] px-[24px] bg-[#8DDB90] text-[#FAFAFA] text-base leading-[25.6px] font-bold mt-6'
            type='submit'
            onSubmit={formik.handleSubmit}
            green={true}
          />
          {/**Already have an account */}
          <span className='text-base leading-[25.6px] font-normal'>
            Don&apos;t have an account?{' '}
            <Link className='font-semibold text-[#09391C]' href={'/auth/agent/register'}>
              Sign Up
            </Link>
          </span>
          {/**Google | Facebook */}
          <div className='flex justify-between w-full lg:flex-row flex-col gap-[15px]'>
            <RegisterWith icon={googleIcon} text='Continue with Google' />
            <RegisterWith icon={facebookIcon} text='Continue with Facebook' />
          </div>
        </form>
      </div>
    </section>
  );
};

interface InputProps {
  title: string;
  placeholder?: string;
  type: string;
  className?: string;
  id?: string;
  icon: StaticImport | string;
  formik: any;
}

const Input: FC<InputProps> = ({ className, id, title, type, placeholder, icon, formik }) => {
  return (
    <label htmlFor={id} className={`min-h-[80px] ${className} flex flex-col gap-[4px]`}>
      <span className='text-base leading-[25.6px] font-medium text-[#1E1E1E]'>{title}</span>
      <div className='flex'>
        <input
          name={id}
          type={type}
          value={formik.values[title]}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={placeholder ?? 'This is placeholder'}
          className='w-full outline-none min-h-[50px] border-[1px] py-[12px] px-[16px] bg-[#FAFAFA] border-[#D6DDEB] placeholder:text-[#A8ADB7] text-black text-base leading-[25.6px] hide-scrollbar'
        />
        {/* {icon ? (
          <Image
            src={icon}
            alt=''
            width={20}
            height={20}
            className='w-[20px] h-[20px] absolute ml-[330px] lg:ml-[440px] z-20 mt-[15px]'
          />
        ) : null} */}
      </div>
      {formik.touched[title] ||
        (formik.errors[title] && <span className='text-red-600 text-sm'>{formik.errors[title]}</span>)}
    </label>
  );
};

export default Login;
