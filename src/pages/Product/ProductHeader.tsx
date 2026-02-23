import React from 'react';
import { IoClose } from 'react-icons/io5';

export default function ProductHeader() {
  return (
    <div className='flex items-center justify-between w-full px-10 py-4 border-b-[1px] color-[#E1E1E1]'>
      <div className='flex text-[16px] font-medium'>상품 구매하기</div>
      <IoClose className='flex text-[24px] font-medium' />
    </div>
  );
}
