import React from 'react';
import { COLORS } from '../../styles/Colors';

export default function ProductDescription() {
  return (
    <div
      className='p-5 my-8 whitespace-pre-line rounded-2xl'
      style={{ backgroundColor: COLORS.DESCRIPTION_BG }}
    >
      <div>제주도 3박 4일 투어에 대한 간단 설명{'\n'}description</div>
    </div>
  );
}
