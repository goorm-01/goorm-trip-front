import React from 'react';
import { Map } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../hooks/useKakaoLoader';

export default function ProductMap() {
  useKakaoLoader();

  return (
    <div className='mb-8'>
      <Map
        id='map'
        center={{
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          width: '100%',
          height: '350px',
          borderRadius: '15px',
        }}
        level={3}
      />
    </div>
  );
}
