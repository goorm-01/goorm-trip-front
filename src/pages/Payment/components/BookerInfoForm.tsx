import type { PaymentFormData, PaymentInputChange } from '../types';

interface BookerInfoFormProps {
  formData: PaymentFormData;
  onInputChange: PaymentInputChange;
}

export default function BookerInfoForm({
  formData,
  onInputChange,
}: BookerInfoFormProps) {
  return (
    <form className='rounded-xl border border-[#e5e7eb] p-6'>
      <h3 className='mb-6 text-xl font-semibold'>예약자 정보</h3>
      <div className='grid gap-5 md:grid-cols-[90px_1fr] md:items-center'>
        <label htmlFor='lastName' className='text-base text-[#3a3a3a]'>
          성 <span className='text-[#ff7474]'>*</span>
        </label>
        <input
          id='lastName'
          name='lastName'
          value={formData.lastName}
          onChange={onInputChange}
          placeholder='성을 입력해주세요.'
          className='h-12 rounded-xl border border-[#d9d9d9] px-4 text-base'
        />

        <label htmlFor='firstName' className='text-base text-[#3a3a3a]'>
          이름 <span className='text-[#ff7474]'>*</span>
        </label>
        <input
          id='firstName'
          name='firstName'
          value={formData.firstName}
          onChange={onInputChange}
          placeholder='이름을 입력해주세요.'
          className='h-12 rounded-xl border border-[#d9d9d9] px-4 text-base'
        />

        <label htmlFor='phone' className='text-base text-[#3a3a3a]'>
          전화번호 <span className='text-[#ff7474]'>*</span>
        </label>
        <div className='flex h-12 items-center gap-2 rounded-xl border border-[#d9d9d9] px-4'>
          <span className='text-base text-[#727272]'>+82</span>
          <input
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={onInputChange}
            placeholder='전화번호를 입력해주세요.'
            className='w-full text-base'
          />
        </div>

        <label htmlFor='email' className='text-base text-[#3a3a3a]'>
          이메일 <span className='text-[#ff7474]'>*</span>
        </label>
        <input
          id='email'
          name='email'
          value={formData.email}
          onChange={onInputChange}
          placeholder='groom@example.com'
          className='h-12 rounded-xl border border-[#d9d9d9] px-4 text-base'
        />
      </div>
    </form>
  );
}
