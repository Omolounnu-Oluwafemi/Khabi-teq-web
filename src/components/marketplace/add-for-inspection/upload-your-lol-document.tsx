/** @format */

'use client';
import React, { useEffect, useState } from 'react';
import { archivo } from '@/styles/font';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import Input from '@/components/general-components/Input';
import AttachFile from '@/components/general-components/attach_file';

type UploadLolDocumentProps = {
  closeModal?: (type: boolean) => void;
  allNegotiation: any[];
  getID: string | null;
  closeSelectPreferableModal: (type: boolean) => void;
  setIsProvideTransactionDetails: (type: boolean) => void;
  actionTracker: { lastPage: 'SelectPreferableInspectionDate' | '' }[];
  setActionTracker: React.Dispatch<
    React.SetStateAction<{ lastPage: 'SelectPreferableInspectionDate' | '' }[]>
  >;
};

type DetailsProps = {
  selectedDate: string;
  selectedTime: string;
};

type ContactProps = {
  fullName: string;
  phoneNumber: string;
  email: string;
};

type SelectedPropertyProps = {
  id: string | null;
  document: string | null;
};

const UploadLolDocumentModal: React.FC<UploadLolDocumentProps> = ({
  closeModal,
  allNegotiation,
  getID,
  setIsProvideTransactionDetails,
  setActionTracker,
  actionTracker,
  closeSelectPreferableModal,
}): React.JSX.Element => {
  const [selectedProperty, setSelectedProperty] =
    useState<SelectedPropertyProps>({
      id: null,
      document: null,
    });

  const [details, setDetails] = useState<DetailsProps>({
    selectedDate: 'Jan 1, 2025',
    selectedTime: '9:00 AM',
  });
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });
  const formik = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values: ContactProps) => {
      console.log(values);
      setActionTracker([
        ...actionTracker,
        { lastPage: 'SelectPreferableInspectionDate' },
      ]);
      setIsProvideTransactionDetails(true);
      closeSelectPreferableModal(false);
      closeModal?.(false);
    },
  });
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const allFilled = Object.values(formik.values).every((value) => value !== '');

  useEffect(() => {
    const findSelectedCard = allNegotiation.find((item) => item.id === getID);

    if (!findSelectedCard) {
      throw new Error('Not found');
    }

    console.log(findSelectedCard);
    console.warn(selectedProperty);
    // setSelectedProperty({
    //   id: findSelectedCard.id,
    //   askingPrice: findSelectedCard?.price ?? findSelectedCard?.rentalPrice,
    //   yourPrice: '',
    //   isOpened: false,
    // });
  }, []);

  return (
    <div className='w-full h-full border-black border-[1px] fixed top-0 left-0 transition-all duration-500 flex items-center justify-center bg-[#000000]/[30%]'>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className='lg:w-[615px] w-full flex flex-col gap-[26px]'>
        <div className='flex items-center justify-end'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            type='button'
            className='w-[51px] h-[51px] rounded-full bg-white flex items-center justify-center'>
            <FontAwesomeIcon
              icon={faClose}
              width={24}
              height={24}
              onClick={() => {
                closeModal?.(false);
                //setCurrentIndex(allNegotiation.length + 1); //just to close the modal
              }}
              className='w-[24px] h-[24px]'
              color='#181336'
            />
          </motion.button>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className='w-[95%] md:w-full mx-auto rounded-[4px] h-[437px] overflow-y-auto hide-scrollbar bg-[#FFFFFF] shadow-md py-[40px] px-[20px] md:px-[50px]'>
          <div className='w-full flex flex-col gap-[20px]'>
            <div className='flex flex-col gap-[10px]'>
              <h2
                className={`${archivo.className} font-bold text-2xl text-black text-center`}>
                Upload your LOI document
              </h2>
              <p
                className={`${archivo.className} text-[#5A5D63] text-base font-medium text-center`}>
                Please address your letter to{' '}
                <span className='text-base font-medium text-black'>
                  Khabi-Teq Limited
                </span>{' '}
                and include our office address: Goldrim Plaza Mokuolu Street,
                Ifako Agege Lagos 101232, Nigeria
              </p>
            </div>
            {/**Upload your Lol section */}
            <div className='lg:w-[534px]'>
              <AttachFile
                style={{
                  width: '283px',
                }}
                id='attach_file'
                setFileUrl={setFileUrl}
                heading='Upload your LOI'
              />
            </div>
            <p className='text-[#1976D2] font-medium text-lg'>
              A fee of{' '}
              <span className='text-[#FF3D00] text-lg font-medium'>
                ₦10,000
              </span>{' '}
              will be charged for inspection and negotiation before your request
              is sent to the seller.
            </p>

            <div className='flex flex-col gap-[20px]'>
              {/**First div */}
              <div className='flex justify-between items-center gap-[18px] border-b-[1px] pb-[10px] border-black'>
                <h2
                  className={`font-bold text-black ${archivo.className} text-xl`}>
                  Select preferable inspection Date
                </h2>
                <FontAwesomeIcon
                  icon={isModalOpened ? faCaretUp : faCaretDown}
                  onClick={() => setIsModalOpened(!isModalOpened)}
                  size='sm'
                  width={24}
                  height={24}
                  className='w-[24px] h-[24px] transition-all duration-300'
                />
              </div>
              <AnimatePresence>
                {isModalOpened && (
                  <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    exit={{ y: 20, opacity: 0 }}
                    className='flex flex-col gap-[20px]'>
                    {/**Second div */}
                    <div className=' overflow-x-auto w-full flex gap-[21px] hide-scrollbar border-b-[1px] border-[#C7CAD0]'>
                      {[
                        'Jan 1, 2025',
                        'Jan 2, 2025',
                        'Jan 3, 2025',
                        'Jan 4, 2025',
                        'Jan 5, 2025',
                        'Jan 6, 2025',
                      ].map((date: string, idx: number) => (
                        <button
                          type='button'
                          onClick={() => {
                            setDetails({
                              ...details,
                              selectedDate: date,
                            });
                          }}
                          className={`h-[42px] ${
                            details.selectedDate === date &&
                            'bg-[#8DDB90] text-white'
                          } min-w-fit px-[10px] ${
                            archivo.className
                          } text-sm font-medium text-[#5A5D63]`}
                          key={idx}>
                          {date}
                        </button>
                      ))}
                    </div>
                    <h3
                      className={`text-xl font-medium ${archivo.className} text-black`}>
                      Select preferable inspection time
                    </h3>
                    <h4
                      className={`text-lg font-medium ${archivo.className} text-black`}>
                      {details.selectedDate}
                    </h4>
                    {/**third div */}
                    <div className='grid grid-cols-3 gap-[14px]'>
                      {[
                        '9:00 AM',
                        '11:00 AM',
                        '1:00 PM',
                        '3:00 PM',
                        '5:00 PM',
                        '7:00 PM',
                        '9:00 PM',
                        '11:00 PM',
                        '1:00 AM',
                      ].map((time, idx: number) => (
                        <button
                          onClick={() => {
                            setDetails({
                              ...details,
                              selectedTime: time,
                            });
                          }}
                          className={`border-[1px] border-[#A8ADB7] h-[57px] ${
                            details.selectedTime === time && 'bg-[#8DDB90]'
                          } text-lg font-medium ${
                            archivo.className
                          } text-black`}
                          type='button'
                          key={idx}>
                          {time}
                        </button>
                      ))}
                    </div>
                    {/**fourth div */}
                    <div className='h-[103px] py-[28px] w-full bg-[#8DDB90]/[20%] flex justify-center flex-col gap-[5px] px-[28px]'>
                      <h3
                        className={`text-lg font-medium ${archivo.className} text-black font-semibold`}>
                        Booking details
                      </h3>
                      <p
                        className={`text-lg font-medium ${archivo.className} text-black`}>
                        Date:{' '}
                        <time
                          className={`text-lg font-medium ${archivo.className} text-black`}>
                          {details.selectedDate}
                        </time>{' '}
                        Time:{' '}
                        <time
                          className={`text-lg font-medium ${archivo.className} text-black`}>
                          {details.selectedTime}
                        </time>
                      </p>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
              {/**fifth div */}
              <div className='p-[20px] bg-[#EEF1F1] flex flex-col gap-[25px]'>
                <div className='flex flex-col gap-[4px]'>
                  <h3 className='text-[#0B0D0C] text-xl font-bold'>
                    Contact information
                  </h3>
                  <span className='text-base text-[#515B6F]'>
                    Provide your contact information to schedule an inspection
                    and take the next step toward your dream property
                  </span>
                </div>
                <div className='grid grid-cols-2 gap-[15px]'>
                  <Input2
                    id='fullName'
                    name='fullName'
                    placeholder='Full name of the buyer'
                    type='text'
                    heading='Full Name'
                    formikType={formik}
                  />
                  <Input2
                    id='phoneNumber'
                    name='phoneNumber'
                    placeholder='Active phone number for follow-up'
                    type='text'
                    heading='Phone Number'
                    formikType={formik}
                  />
                  <Input2
                    id='email'
                    name='email'
                    placeholder='Optional, for communication'
                    type='email'
                    heading='Email'
                    formikType={formik}
                    className='col-span-2'
                  />
                </div>
              </div>
              {/**buttons */}
              <div className=' w-full flex gap-[15px] h-[57px]'>
                <button
                  type='submit'
                  className={`w-1/2 h-[57px] ${
                    allFilled ? 'bg-[#8DDB90]' : 'bg-[#5A5D63]'
                  } text-[#FFFFFF] font-bold text-lg ${archivo.className}`}>
                  Submit
                </button>
                <button
                  //onClick={() => closeModal(false)}
                  type='button'
                  className={`w-1/2 h-[57px] bg-transparent border-[1px] border-[#5A5D63] text-[#414357] font-medium text-lg ${archivo.className}`}>
                  Close
                </button>
              </div>
            </div>
            {/** Submit and Cancel buttons */}
            {/* <div className='w-full flex gap-[15px]'>
              <button
                //onClick={handleSubmit}
                className={`h-[57px] bg-[#8DDB90] w-[260px] text-lg text-[#FFFFFF] font-bold ${archivo.className}`}
                type='submit'>
                Submit
              </button>
              <button
                //onClick={() => setCurrentIndex(allNegotiation.length + 1)}
                className={`h-[57px] bg-white border-[1px] border-[#5A5D63] w-[260px] text-lg text-[#5A5D63] font-bold ${archivo.className}`}
                type='button'>
                Cancel
              </button>
            </div> */}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

type InputProps = {
  id: 'fullName' | 'email' | 'phoneNumber';
  placeholder?: string;
  type: 'email' | 'number' | 'text';
  name: string;
  heading: string;
  // value?: string | number;
  // onChange?: (type: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  formikType: FormikProps<ContactProps>;
  className?: string;
};

const Input2: React.FC<InputProps> = ({
  id,
  heading,
  type,
  placeholder,
  name,
  isDisabled,
  formikType,
  className,
}) => {
  return (
    <label
      htmlFor={id}
      className={`w-full flex flex-col gap-[4px] ${className}`}>
      <span
        className={`text-base text-[#24272C] ${archivo.className} font-medium`}>
        {heading}
      </span>
      <input
        name={name}
        onChange={formikType.handleChange}
        id={id}
        type={type}
        onBlur={formikType.handleBlur}
        value={formikType.values[id]}
        disabled={isDisabled}
        placeholder={placeholder ?? 'This is a placeholder'}
        className={`px-[12px] h-[50px] bg-[#FFFFFF] border-[1px] border-[#E9EBEB] w-full text-base placeholder:text-[#A7A9AD] text-black ${archivo.className} rounded-[5px] outline-none disabled:bg-[#FAFAFA]`}
      />
      {(formikType.errors[id] || formikType.touched[id]) && (
        <span className={`${archivo.className} text-xs text-red-500`}>
          {formikType.errors[id]}
        </span>
      )}
    </label>
  );
};

export default UploadLolDocumentModal;
