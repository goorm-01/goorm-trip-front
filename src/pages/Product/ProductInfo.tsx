import React from 'react';
import { COLORS } from '../../styles/Colors';

export default function ProductInfo() {
  return (
    <div
      className='py-8 border-b-[2px]'
      style={{ borderColor: COLORS.SEARCH_BG }}
    >
      <div id='Top' className='flex justify-between'>
        <div id='TopLeft'>
          <div className='font-semibold text-[20px]'>제주도 3박 4일</div>
          <div className='flex items-center gap-3 mt-2'>
            <div
              className='flex px-2 font-medium text-[14px] py-1 rounded-[5px]'
              style={{
                backgroundColor: COLORS.CATEGORY_BG,
                color: COLORS.CATEGORY_TEXT,
              }}
            >
              제주도
            </div>
            <div
              className='flex px-2 font-medium text-[14px] py-1 rounded-[5px]'
              style={{
                backgroundColor: COLORS.CATEGORY_BG,
                color: COLORS.CATEGORY_TEXT,
              }}
            >
              투어
            </div>
          </div>
        </div>

        <div id='Right' className='flex'>
          <img
            src='/assets/images/jeju.png'
            className='w-40'
            alt='제주도 이미지'
          />
        </div>
      </div>

      <div
        id='Bottom'
        className='flex items-center justify-between w-full mt-10'
      >
        <div id='Left' className='flex items-center gap-6'>
          {/* 개수 조절 */}
          <div
            className='flex gap-2 font-medium'
            style={{ color: COLORS.QUANTITY_TEXT }}
          >
            <div>-</div>
            <div>2</div>
            <div>+</div>
          </div>

          <div className='flex font-bold text-[25px]'>₩ 890,000</div>
        </div>

        <div id='Right' className='flex w-[35%] items-center'>
          <div
            className='flex justify-center w-full py-1.5'
            style={{ backgroundColor: COLORS.CATEGORY_BG }}
          >
            버튼 컴포넌트 자리
          </div>
        </div>
      </div>
    </div>
  );
}
