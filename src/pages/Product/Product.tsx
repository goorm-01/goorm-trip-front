import React from 'react';
import ProductHeader from './ProductHeader';
import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';
import ProductMap from './ProductMap';
import { COLORS } from '../../styles/Colors';

export default function Product() {
  return (
    <div className='flex justify-end'>
      <div
        className='flex flex-col w-[55%] shadow-2xl min-h-screen'
        style={{ backgroundColor: COLORS.BG_PRIMARY }} // 사용 예시입니다!
      >
        <ProductHeader />
        <div className='px-10'>
          <ProductInfo />
          <ProductDescription />
          <ProductMap />
        </div>
      </div>
    </div>
  );
}
