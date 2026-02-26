import { useParams } from 'react-router-dom';
import { COLORS } from '../../styles/Colors';
import { useGetProductDetail } from '../../hooks/api/useProductApi';
import ProductHeader from './components/ProductHeader';
import ProductInfo from './components/ProductInfo';
import ProductDescription from './components/ProductDescription';
import ProductMap from './components/ProductMap';

export default function Product() {
  // URL 파라미터에서 productId 받아오기
  const { productId } = useParams<{ productId: string }>();

  // API 호출
  const { data, isLoading, error } = useGetProductDetail(Number(productId));

  if (isLoading) {
    return (
      <div className='flex justify-end'>
        <div
          className='flex flex-col w-[55%] shadow-2xl min-h-screen items-center justify-center'
          style={{ backgroundColor: COLORS.BG_PRIMARY }}
        >
          <div style={{ color: COLORS.TEXT_PRIMARY }}>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className='flex justify-end'>
        <div
          className='flex flex-col w-[55%] shadow-2xl min-h-screen items-center justify-center'
          style={{ backgroundColor: COLORS.BG_PRIMARY }}
        >
          <div style={{ color: COLORS.REQUIRED }}>
            상품 정보를 불러올 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  const productData = data.data;

  return (
    <div className='flex justify-end'>
      <div
        className='flex flex-col w-[55%] shadow-2xl min-h-screen'
        style={{ backgroundColor: COLORS.BG_PRIMARY }}
      >
        <ProductHeader />
        <div className='px-10'>
          <ProductInfo product={productData} product_id={Number(productId)} />
          <ProductDescription description={productData.description} />
          <ProductMap addr={productData.addr} />
        </div>
      </div>
    </div>
  );
}
