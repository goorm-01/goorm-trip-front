import React from 'react';
import { IoClose } from 'react-icons/io5';
import { COLORS } from '../../styles/Colors';

export default function ProductHeader() {
  return (
    <div
      className='flex items-center justify-between w-full px-10 py-4 border-b-[1px] font-medium'
      style={{ borderColor: COLORS.SEARCH_BG }}
    >
      <div className='flex text-[16px]'>상품 구매하기</div>
      <IoClose className='flex text-[24px]' />
    </div>
  );
}
