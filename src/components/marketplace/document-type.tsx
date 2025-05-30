/** @format */
'use client';
import useClickOutside from '@/hooks/clickOutside';
import React, { useRef } from 'react';
import RadioCheck from '../general-components/radioCheck';
import { motion } from 'framer-motion';

interface DocumentTypeComponentProps {
  closeModal: (type: boolean) => void;
  setDocsSelected: (type: string[]) => void;
  docsSelected: string[];
  style?: React.CSSProperties;
}

const DocumentTypeComponent: React.FC<DocumentTypeComponentProps> = ({
  closeModal,
  setDocsSelected,
  docsSelected,
  style,
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(divRef, () => closeModal(false));
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      viewport={{ once: true }}
      ref={divRef}
      style={style}
      className='absolute mt-[100px] bg-white w-[286px] h-[327px] p-[19px] shadow-md flex flex-col gap-[13px] border-[1px] border-black'>
      <h2 className='text-base font-medium text-[#000000]'>Document type</h2>
      <div className='flex flex-col gap-[10px] mt-4'>
        {[
          'C of O',
          'Government Consent',
          'Deed of Assignment',
          'Receipt',
          'Land certificate',
          'Registered deed of conveyance',
        ].map((text: string, idx: number) => (
          <RadioCheck
            key={idx}
            type='checkbox'
            isChecked={docsSelected.some((item: string) => item === text)}
            onClick={() => {
              const uniqueItemsSelected = new Set([...docsSelected]);
              if (uniqueItemsSelected.has(text)) {
                uniqueItemsSelected.delete(text);
              } else {
                uniqueItemsSelected.add(text);
              }
              setDocsSelected(Array.from(uniqueItemsSelected));
            }}
            name='doc'
            value={text}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DocumentTypeComponent;
