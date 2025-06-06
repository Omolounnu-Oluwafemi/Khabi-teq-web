/** @format */
'use client';
import React, { ChangeEvent } from 'react';
import { useFormik } from 'formik';
import RadioCheck from '../general-components/radioCheck';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useVisibility } from '@/hooks/useVisibility';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { featuresData } from '@/data/landlord';

const Filter = ({
  closeModal,
  setPayloadFromFilter,
  selectedType,
  payloadFromFilter,
}: {
  closeModal: (type: boolean) => void;
  payloadFromFilter: any;
  setPayloadFromFilter: (type: any) => void;
  selectedType: string;
}) => {
  const [radioValue, setRadioValue] = useState<string>('');
  const formik = useFormik({
    initialValues: {
      minPrice: payloadFromFilter?.prices?.minPrice || 0,
      maxPrice: payloadFromFilter?.prices?.maxPrice || 0,
    },
    onSubmit: (values) => console.log(values),
  });
  const [buildingTypeValues, setBuildingTypeValues] = useState<string[]>([]);
  const [docValues, setDocValues] = useState<string[]>([]);
  const [bedroom, setBedroom] = useState<number>(0);
  const [bathroom, setBathroom] = useState<string | number>('');
  const [landSize, setLandSize] = useState<{
    type: string;
    size: undefined | number;
  }>({
    type: '',
    size: undefined,
  });
  const [selectedLandType, setSelectedLandType] =
    React.useState<string>('plot');
  const [desirerFeatures, setDesirerFeatures] = useState<string[]>([]);
  const lastDivRef = useRef<HTMLDivElement>(null);
  const visible = useVisibility(lastDivRef);

  const handleSubmit = () => {
    const payload = {
      ...landSize,
      desirer_features: desirerFeatures,
      actualPrice: radioValue,
      prices: {
        minPrice: formik.values.minPrice,
        maxPrice: formik.values.maxPrice,
      },
      building: buildingTypeValues,
      doc: docValues,
      bedroom: Number(bedroom),
      bathroom,
    };
    console.log(payload);
    setPayloadFromFilter(payload);

    toast.success('Changes applied');
    closeModal(false);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      viewport={{ once: true }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      exit={{ opacity: 0, y: 20 }}
      className='w-full h-full bg-[#EEF1F1] z-20 fixed top-0 left-0 overflow-y-scroll hide-scrollbar px-[20px] pt-[40px] pb-[150px] flex flex-col gap-[20px]'>
      <div className='flex justify-between items-end pb-[20px] border-b-[1px] border-[#5A5D63]'>
        <h2 className='font-medium text-[#000000] text-xl'>Filter</h2>
        <FontAwesomeIcon
          icon={faClose}
          onClick={() => closeModal(false)}
          size='sm'
          className='w-[24px] h-[24px]'
          color='#504F54'
        />
      </div>
      {/**Price Range */}
      <div className='bg-white w-full min-h-fit p-[19px] flex flex-col gap-[25px] shadow-sm'>
        <h2 className='text-base font-medium text-black'>Price Range</h2>
        <div className='h-[47px] w-full flex justify-between'>
          <label
            htmlFor='min'
            className='w-[50%] border-[1px] border-[#D6DDEB] px-[12px] flex items-center justify-evenly'>
            <span className='text-base text-black'>min</span>
            <input
              type='number'
              name='minPrice'
              value={formik.values.minPrice}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id='minPrice'
              className='h-full w-[50px] text-center outline-none'
            />
            <span className='text-base text-black'>N</span>
          </label>
          <label
            htmlFor='maxPrice'
            className='w-[50%] border-[1px] border-[#D6DDEB] px-[12px] flex items-center justify-evenly'>
            <span className='text-base text-black'>max</span>
            <input
              type='number'
              name='maxPrice'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.maxPrice}
              id='max'
              className='h-full w-[50px] text-center outline-none'
            />
            <span className='text-base text-black'>N</span>
          </label>
        </div>
        {/**Radios */}
        <div className='flex gap-[5px] flex-wrap w-full'>
          {[
            '500k - 1million',
            '2million - 4million',
            '5million - 6million',
            '10million above',
          ].map((item: string, idx: number) => (
            <RadioCheck
              modifyStyle={{
                fontSize: '14px',
              }}
              key={idx}
              type='radio'
              isChecked={
                item === payloadFromFilter?.actualPrice || item === radioValue
              }
              handleChange={() => {
                setRadioValue(item);
                // formik.setFieldValue('minPrice', '');
                // formik.setFieldValue('maxPrice', '');
              }}
              value={item}
              name='prices'
            />
          ))}
        </div>
      </div>
      {/**Building Type */}
      {selectedType === 'Buy a property' && (
        <SimilarComponent
          heading='Building Type'
          type='checkbox'
          data={[
            'Bungalow',
            'Duplex',
            'Semi detach',
            'Deed of Assignment',
            'Land certificate',
          ]}
          selectedValues={buildingTypeValues}
          setSelectedValues={setBuildingTypeValues}
        />
      )}
      {/**Document type */}
      <SimilarComponent
        heading='Document Type'
        type='checkbox'
        data={[
          'C of O',
          'Government Consent',
          'Receipt',
          'Deed of Assignment',
          'Land certificate',
          'Registered deed of conveyance',
        ]}
        selectedValues={docValues}
        setSelectedValues={setDocValues}
      />
      {/**Bedroom count */}
      <div className='w-full bg-white min-h-fit p-[19px] flex flex-col gap-[13px] shadow-sm'>
        <h2 className='text-black font-medium text-base'>Bedroom</h2>
        <div className='flex gap-[10px] flex-wrap'>
          <RadioCheck
            modifyStyle={{
              fontSize: '14px',
            }}
            type='radio'
            value='1'
            isChecked={bedroom === 1}
            handleChange={() => setBedroom(1)}
            name='bedroom'
          />
          <RadioCheck
            modifyStyle={{
              fontSize: '14px',
            }}
            type='radio'
            value='2'
            isChecked={bedroom === 2}
            handleChange={() => setBedroom(2)}
            name='bedroom'
          />
          <RadioCheck
            modifyStyle={{
              fontSize: '14px',
            }}
            type='radio'
            value='3'
            isChecked={bedroom === 3}
            handleChange={() => setBedroom(3)}
            name='bedroom'
          />
          <RadioCheck
            modifyStyle={{
              fontSize: '14px',
            }}
            type='radio'
            value='4'
            isChecked={bedroom === 4}
            handleChange={() => setBedroom(4)}
            name='bedroom'
          />
          <RadioCheck
            modifyStyle={{
              fontSize: '14px',
            }}
            type='radio'
            value='5+'
            isChecked={bedroom === 5}
            handleChange={() => setBedroom(5)}
            name='bedroom'
          />
        </div>
      </div>
      {/* {Array.from({ length: 10 }).map((__, idx: number) => (
        <SimilarComponent
          key={idx}
          type='radio'
          heading='Bedroom'
          value={idx + 1}
          setValue={setBedroom}
        />
      ))} */}
      {/**More filter */}
      <div className='w-full min-h-fit flex flex-col p-[19px] gap-[25px] bg-white shadow-sm'>
        <h2 className='text-black text-base font-medium'>More Filter</h2>
        {/**Bathroom */}
        <div className='min-h-[90px] w-full flex flex-col gap-[10px]'>
          <h2 className='font-medium text-sm text-[#5A5D63]'>Bathroom</h2>
          <div className='flex gap-[10px] flex-wrap'>
            {Array.from({ length: 10 }).map((__, idx: number) => {
              if (idx === 9) {
                return (
                  <RadioCheck
                    modifyStyle={{
                      fontSize: '14px',
                    }}
                    type='radio'
                    value={'more'}
                    key={idx + 1}
                    name='bathroom'
                    isChecked={bathroom === 'more'}
                    handleChange={() => setBathroom('more')}
                  />
                );
              }
              return (
                <RadioCheck
                  modifyStyle={{
                    fontSize: '14px',
                  }}
                  type='radio'
                  value={Number(idx + 1).toLocaleString()}
                  key={idx + 1}
                  name='bathroom'
                  isChecked={bathroom === idx + 1}
                  handleChange={() => setBathroom(idx + 1)}
                />
              );
            })}
          </div>
        </div>

        {/**Land Size */}
        <div
          ref={lastDivRef}
          className='h-[135px] w-full flex flex-col gap-[15px]'>
          <h2 className='text-sm text-[#5A5D63] font-medium'>Land Size</h2>
          <div className='flex gap-[15px]'>
            {['plot', 'Acres', 'Sqr Meter'].map((item: string, idx: number) => (
              <button
                type='button'
                key={idx}
                onClick={() => setSelectedLandType(item)}
                className={`w-1/3 px-[15px] text-xs h-[36px] ${
                  selectedLandType === item
                    ? 'bg-[#8DDB90] font-medium text-white'
                    : 'bg-transparent text-[#5A5D63]'
                } border-[1px] border-[#C7CAD0]`}>
                {item}
              </button>
            ))}
          </div>
          <div className='h-[47px] border-[1px] border-[#D6DDEB] w-full flex justify-between items-center px-[12px] py-[16px]'>
            <span>min</span>
            <label htmlFor='landSize'>
              <input
                type='number'
                name='landSize'
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setLandSize({
                    type: selectedLandType,
                    size: Number(event.target.value),
                  });
                }}
                id='landSize'
                value={landSize.size}
                title='Land size'
                className='outline-none h-full w-full text-center'
              />
            </label>
            <span className='text-sm text-black'>{selectedLandType}</span>
          </div>
        </div>
        <div className='flex flex-col gap-[15px]'>
          <h2 className='text-[#5A5D63] text-sm font-medium'>
            Desired Features
          </h2>
          <div className='flex flex-col gap-[10px]'>
            {featuresData.map((item: string, idx: number) => (
              <RadioCheck
                key={idx}
                modifyStyle={{
                  fontSize: '14px',
                }}
                value={item}
                type='checkbox'
                name='features'
                isChecked={
                  payloadFromFilter?.desirer_features.some(
                    (text: string) => text === item
                  ) || desirerFeatures.some((text: string) => text === item)
                }
                handleChange={() => {
                  const uniqueFeatures: Set<string> = new Set([
                    ...desirerFeatures,
                  ]);
                  if (uniqueFeatures.has(item)) {
                    uniqueFeatures.delete(item);
                  }
                  uniqueFeatures.add(item);
                  setDesirerFeatures(Array.from(uniqueFeatures));
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/**Reset all features and apply features button */}
      <AnimatePresence>
        {
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.4 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className='fixed border-[1px] border-[#5A5D63] left-0 w-full bottom-0 bg-white px-[18px] py-[26px] flex gap-[20px] items-center justify-center'>
            <button
              onClick={() => {
                console.log('resetted');
                formik.setFieldValue('minPrice', '');
                formik.setFieldValue('maxPrice', '');
                setDesirerFeatures([]);
                setLandSize({
                  size: 0,
                  type: '',
                });
                setBathroom('');
                setBedroom(1);
                setDocValues([]);
                setBuildingTypeValues([]);
                setRadioValue('');
              }}
              className='w-[145px] h-[50px] border-[1px] border-[#5A5D63] text-base font-medium text-[#1E1E1E]'
              type='button'>
              Reset all filter
            </button>
            <button
              onClick={handleSubmit}
              type='button'
              className='border-[1px] border-[#8DDB90] bg-[#8DDB90] h-[50px] w-[231px] text-white text-base font-medium'>
              Apply
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </motion.div>
  );
};

const SimilarComponent = ({
  heading,
  data,
  selectedValues,
  setSelectedValues,
  type,
}: {
  heading: string;
  data?: string[];
  selectedValues?: string[];
  setSelectedValues?: (type: string[]) => void;
  type: 'checkbox' | 'radio';
}) => {
  const renderData = () => {
    if (data?.['length'] !== 0) {
      return data;
    }
    throw new Error('Array has no content');
  };

  return (
    <div className='w-full bg-white min-h-fit p-[19px] flex flex-col gap-[13px] shadow-sm'>
      <h2 className='text-black font-medium text-base'>{heading}</h2>
      <div className='flex gap-[10px] flex-wrap'>
        {data &&
          renderData()?.map((item: string, idx: number) => (
            <RadioCheck
              isChecked={
                Array.isArray(selectedValues) &&
                selectedValues.some((text: string) => item === text)
              }
              modifyStyle={{
                fontSize: '14px',
              }}
              type={type}
              handleChange={() => {
                if (Array.isArray(selectedValues)) {
                  if (type === 'checkbox') {
                    const uniqueValues = new Set([...selectedValues]);
                    if (uniqueValues.has(item)) {
                      uniqueValues.delete(item);
                      setSelectedValues?.(Array.from(uniqueValues));
                    } else {
                      uniqueValues.add(item);
                      setSelectedValues?.(Array.from(uniqueValues));
                    }
                  } else if (type === 'radio') {
                    setSelectedValues?.([(idx + 1).toString()]);
                  } else {
                    return null;
                  }
                }
              }}
              key={idx}
              value={item ?? idx + 1}
              name={heading}
            />
          ))}
      </div>
    </div>
  );
};

export default Filter;
