/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
'use client';
import Button from '@/components/button';
import Loading from '@/components/loading';
import { toast } from 'react-hot-toast';
// import { usePageContext } from '@/context/page-context';
import { useLoading } from '@/hooks/useLoading';
import React, { Fragment, useState } from 'react';
import RadioCheck from '@/components/radioCheck';
import Input from '@/components/Input';
import { usePageContext } from '@/context/page-context';
import { POST_REQUEST } from '@/utils/requests';
import { URLS } from '@/utils/URLS';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { useUserContext } from '@/context/user-context';

//import SubmitPopUp from '@/components/submit';
//import Select from '@/components/select';

// interface Option {
//   value: string;
//   label: string;
// }
const Sell = () => {
  // const { user } = useUserContext(); 
  const isLoading = useLoading();
  const [isLegalOwner, setIsLegalOwner] = useState<boolean>(false);
  const { setIsSubmittedSuccessfully } = usePageContext()

  const docOfTheProperty: string[] = [
    'C of O',
    'Survey Document',
    'Receipt',
    'Governor Consent',
    'Deed of Assignment',
  ];
   const formik = useFormik({
      initialValues: {
        propertyType: '',
        usageOptions: [] as string[],
        price: '',
        documents: [] as string[],
        noOfBedroom: '',
        additionalFeatures: [] as string[],
        selectedState: '',
        // selectedAddress: '',
        selectedCity: '',
        selectedLGA: '',
        ownerFullName: '',
        ownerPhoneNumber: '',
        ownerEmail: '', 
        areYouTheOwner: true,
      },
      validationSchema: Yup.object({
        propertyType: Yup.string().required('Property type is required'),
        usageOptions: Yup.array().min(1, 'At least one usage option is required'),
        price: Yup.string().required('Price is required'),
        documents: Yup.array().min(1, 'At least one document is required'),
        noOfBedroom: Yup.string().required('Number of bedrooms is required'),
        additionalFeatures: Yup.array().of(Yup.string()).min(1, 'At least one additional feature is required'), 
        selectedState: Yup.string().required('State is required'),
        // selectedAddress: Yup.string().required('Address is required'),
        selectedCity: Yup.string().required('City is required'),
        selectedLGA: Yup.string().required('LGA is required'),
        ownerFullName: Yup.string().required('Owner full name is required'),
        ownerPhoneNumber: Yup.string().required('Owner phone number is required'),
        ownerEmail: Yup.string().email('Invalid email').required('Owner email is required'),
      }),
      onSubmit: async (values) => {
        console.log(values);
        try {
          const url = URLS.BASE + URLS.agentCreateBrief;
          const payload = {
            propertyType: values.propertyType,
            usageOptions: values.usageOptions,
            propertyFeatures: {
              noOfBedrooms: values.noOfBedroom,
              additionalFeatures: values.additionalFeatures,
            },
            docOnProperty: values.documents.map((doc) => ({
              docName: doc,
              isProvided: true, // Assuming all selected documents are provided
            })),
            location: {
              state: values.selectedState,
              // address: values.selectedAddress,
              localGovernment: values.selectedLGA,
              area: values.selectedCity,
            },
            price: values.price,
            owner: {
              fullName: values.ownerFullName,
              phoneNumber: values.ownerPhoneNumber,
              email: values.ownerEmail,
            },
            areYouTheOwner: values.areYouTheOwner,
          };
  
          console.log('Payload:', payload);
  
          await toast.promise(
            POST_REQUEST(url, payload).then((response) => {
              console.log('response from brief', response);
              if ((response as any).owner) {
                toast.success('Property submitted successfully');
                // router.push('/success');
                setIsSubmittedSuccessfully(true);
                return 'Property submitted successfully';
              } else {
                const errorMessage = (response as any).error || 'Submission failed';
                toast.error(errorMessage);
                throw new Error(errorMessage);
              }
            }),
            {
              loading: 'Submitting...',
              // success: 'Property submitted successfully',
              // error: 'An error occurred, please try again',
            }
          );
        } catch (error) {
          console.error(error);
          // toast.error('An error occurred, please try again');
        }
      },
    });

  if (isLoading) return <Loading />;
  return (
    <Fragment>
    <section
      className={`min-h-[800px] bg-[#EEF1F1] w-full flex justify-center items-center transition-all duration-500`}>
      <div className='container flex flex-col justify-center items-center gap-[30px] my-[60px] px-[20px]'>
        <h2 className='text-[#09391C] lg:text-[40px] lg:leading-[64px] font-semibold font-display text-center text-[30px] leading-[41px]'>
          Submit Your{' '}
          <span className='text-[#8DDB90] font-display'>Property Brief</span>
        </h2>
        <div className='lg:w-[953px] w-full text-[24px] leading-[38.4px] text-[#5A5D63] font-normal text-center'>
          Khabi-Teq helps you reach a wide network of potential buyers and
          simplifies the property selling process. Our platform ensures your
          property is showcased effectively, connects you with verified buyers,
          and streamlines negotiations for a smooth and successful sale
        </div>
        <div className='lg:w-[877px] w-full'>
          <h3 className='text-[24px] leading-[38.4px] font-semibold text-[#09391C] lg:py-[30px] py-[20px] lg:px-[80px] w-full'>
            Brief Details
          </h3>
          <div className='w-full flex flex-col gap-[15px]'>
          {formik.errors.ownerFullName && (
            <span className='text-red-600 text-sm'>{formik.errors.ownerFullName}</span>
          )}
          {formik.errors.ownerPhoneNumber && (
            <span className='text-red-600 text-sm'>{formik.errors.ownerPhoneNumber}</span>
          )}
          {formik.errors.ownerEmail && (
            <span className='text-red-600 text-sm'>{formik.errors.ownerEmail}</span>
          )}
        </div>
          <form onSubmit={formik.handleSubmit} className='w-full border-t-[1px] border-[#8D909680] min-h-[1177px] flex flex-col'>
            <div className='min-h-[629px] py-[40px] lg:px-[80px] border-[#8D909680] border-y-[1px] w-full'>
              <div className='w-full min-h-[629px] flex flex-col gap-[46px]'>
                {/**Property Type */}
                <div className='min-h-[73px] gap-[15px] flex flex-col lg:w-[535px] w-full'>
                  <h2 className='text-[20px] leading-[32px] font-medium text-[#1E1E1E]'>
                    Property Type
                  </h2>
                  <div className='w-full gap-[20px] lg:gap-[50px] flex flex-row flex-wrap'>
                    <RadioCheck
                      isDisabled={formik.values?.propertyType ? true : false}
                      selectedValue={formik.values?.propertyType}
                      handleChange={() => {
                          formik.setFieldValue('propertyType', 'Residential');
                      }}
                      type='radio'
                      value='Residential'
                      name='propertyType'
                    />
                    <RadioCheck
                      isDisabled={formik.values?.propertyType ? true : false}
                      selectedValue={formik.values?.propertyType}
                      handleChange={() => {
                        formik.setFieldValue('propertyType', 'Commercial');
                      }}
                      type='radio'
                      name='propertyType'
                      value='Commercial'
                    />
                    <RadioCheck
                      isDisabled={formik.values?.propertyType ? true : false}
                      selectedValue={formik.values?.propertyType}
                      handleChange={() => {
                        formik.setFieldValue('propertyType', 'Land');
                      }}
                      type='radio'
                      name='propertyType'
                      value='Land'
                    />
                  </div>
                </div>
                {/**Usage Options */}
                <div className='min-h-[73px] flex flex-col gap-[15px]'>
                  <h2 className='text-[20px] leading-[32px] font-medium text-[#1E1E1E]'>
                    Usage Options
                  </h2>
                  <div className='flex flex-wrap gap-[15px] w-full'>
                  {['All', 'Lease', 'Joint Venture', 'Outright Sale'].map(
                    (item: string, idx: number) => (
                      <RadioCheck
                        type='checkbox'
                        value={item}
                        key={idx}
                        name='Usage Options'
                        handleChange={() => {
                            const usageOptions = formik.values.usageOptions.includes(item)
                              ? formik.values.usageOptions.filter((option) => option !== item)
                              : [...formik.values.usageOptions, item];
                            formik.setFieldValue('usageOptions', usageOptions);
                        }}
                      />
                    )
                  )}
                  </div>
                </div>
                {/**Location */}
                <div className='min-h-[127px] w-full flex flex-col gap-[15px]'>
                  <h2 className='text-[20px] leading-[32px] font-medium text-[#1E1E1E]'>
                    Location
                  </h2>
                  <div className='min-h-[80px] flex gap-[15px] lg:grid lg:grid-cols-2 flex-col'>
                    {/* <Input
                        name='selectedAddress'
                        label='Address'
                        type='text'
                        value={formik.values.selectedAddress}
                        onChange={formik.handleChange}
                      /> */}
                      <Input
                        label='State'
                        name='selectedState'
                        selectedState={{ value: formik.values?.selectedState, label: formik.values?.selectedState }}
                        setSelectedState={(option) => {
                          formik.setFieldValue('selectedState', option?.value);
                        }}
                        forState={true}
                        type='text'
                        placeholder='Select State'
                      />
                      <Input
                        label='Local Government'
                        name='selectedLGA'
                        type='text'
                        value={formik.values?.selectedLGA}
                        onChange={formik.handleChange}
                      />
                      <Input
                        label='Area or Neighbourhood'
                        name='selectedCity'
                        forCity={true}
                        selectedState={{ value: formik.values?.selectedState, label: formik.values?.selectedState }} // Ensure city dropdown receives state
                        setSelectedCity={(option) => {
                          formik.setFieldValue('selectedCity', option?.value);
                        }}
                        type='text'
                      />
                  </div>
                </div>
                {/**Price */}
                <div className='min-h-[50px] flex flex-col gap-[15px]'>
                    <Input
                      label='Price'
                      placeholder='Enter property price'
                      name='price'
                      type='number'
                      className='w-full'
                      value={formik.values?.price}
                      onChange={formik.handleChange}
                    />
                </div>
                {/**Document of the property */}
                <div className='min-h-[50px] flex flex-col gap-[15px]'>
                  <h2 className='text-[20px] leading-[32px] font-medium text-[#1E1E1E]'>
                    Document on the property
                  </h2>
                  <div className='flex flex-wrap gap-[20px] w-full'>
                    {docOfTheProperty.map((item: string, idx: number) => (
                    <RadioCheck
                      type='checkbox'
                      key={idx}
                      value={item}
                      name='documents'
                      handleChange={() => {
                        const documents = formik.values.documents.includes(item)
                          ? formik.values.documents.filter((doc) => doc !== item)
                          : [...formik.values.documents, item];
                        formik.setFieldValue('documents', documents);
                      }}
                    />
                  ))}
                  </div>
                </div>
                {/**Property Features */}
                <div className='min-h-[129px] gap-[15px] flex flex-col w-full'>
                  <h2 className='text-[20px] leading-[32px] font-medium text-[#1E1E1E]'>
                    Property Features
                  </h2>
                  <div className='min-h-[80px] flex gap-[15px] lg:grid lg:grid-cols-2 flex-col'>
                    <Input
                      label='Number of Bedroom'
                      name='noOfBedroom'
                      type='number'
                      className='w-full'
                      // isDisabled={formik.values?.noOfBedroom ? true : false}
                      value={formik.values?.noOfBedroom}
                      onChange={formik.handleChange}
                    />
                      <Input
                      label='Additional Features'
                      name='additionalFeatures'
                      type='text'
                      className='w-full'
                      value={formik.values?.additionalFeatures.join(', ')}
                      onChange={(e) => {
                        const features = e.target.value.split(',').map((feature) => feature.trim());
                        formik.setFieldValue('additionalFeatures', features);
                      }}
                    />
                  </div>
                </div>
                {/**end */}
              </div>
              </div>
              {/**contact detail */}
              <div className='min-h-[348px] py-[40px] lg:px-[80px] border-[#8D909680] border-b-[1px] w-full'>
                <div className='w-full min-h-[348px] flex flex-col gap-[20px]'>
                  <h2 className='text-[#09391C] text-[24px] leading-[38.4px] font-semibold'>
                    Contact Detail
                  </h2>
                  <h3 className='text-[#1E1E1E] text-[18px] leading-[38.4px] font-semibold'>
                    Ownership Declaration
                  </h3>

                  <div className='w-full flex flex-col gap-[15px] min-h-[270px]'>
                    <RadioCheck name='confirm' type='checkbox' onClick={()=>{
                      setIsLegalOwner(!isLegalOwner)
                      //console.log(isLegalOwner)
                    }} value='I confirm that I am the legal owner of this property or authorized to submit this brief'/>
                    <div className='flex lg:flex-row flex-col w-full gap-[15px]'>
                      <Input
                        label='Full name'
                        isDisabled={isLegalOwner}
                        name='ownerFullName'
                        value={formik.values?.ownerFullName}
                        onChange={formik.handleChange}
                        className='lg:w-1/2 w-full'
                        type='text'
                      />
                      <Input
                        label='Phone Number'
                        isDisabled={isLegalOwner}
                        name='ownerPhoneNumber'
                        value={formik.values?.ownerPhoneNumber}
                        onChange={formik.handleChange}
                        className='lg:w-1/2 w-full'
                        type='text'
                      />
                    </div>
                    <Input
                      label='Email' 
                      name='ownerEmail' 
                      isDisabled={isLegalOwner} 
                      className='w-full' 
                      value={formik.values?.ownerEmail}
                      onChange={formik.handleChange}
                      type='email' 
                      />
                  </div>
                </div>
              </div>

            {/**Button */}
            <div className='w-full flex justify-center items-center mt-8'>
              <Button
                value='Submit Brief'
                type='submit'
                className='bg-[#8DDB90] lg:w-[459px] text-white text-base leading-[25.6px] font-bold min-h-[50px] py-[12px] px-[24px]'
              />
            </div>
          </form>
        </div>
      </div>
    </section>
    
    </Fragment>
  );
};

export default Sell;
