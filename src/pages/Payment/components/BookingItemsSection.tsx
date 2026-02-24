import type { BookingItem } from '../types';

interface BookingItemsSectionProps {
  items: BookingItem[];
  selectedItems: Record<number, boolean>;
  quantities: Record<number, number>;
  onToggleItem: (itemId: number) => void;
  onQuantityChange: (itemId: number, delta: number) => void;
}

export default function BookingItemsSection({
  items,
  selectedItems,
  quantities,
  onToggleItem,
  onQuantityChange,
}: BookingItemsSectionProps) {
  const selectedCount = items.filter((item) => selectedItems[item.id]).length;

  return (
    <section className='flex flex-col gap-6'>
      <h2 className='text-base text-[#7f7f7f]'>총 {selectedCount}개</h2>
      <div className='flex gap-6 overflow-x-auto pb-2'>
        {items.map((item) => (
          <article
            key={item.id}
            className='w-[360px] shrink-0 rounded-xl bg-white p-4 shadow-[0px_2px_8px_#0000000f]'
          >
            <div className='flex gap-4'>
              <img
                src={item.image}
                alt={item.title}
                className='h-[120px] w-[120px] rounded-lg object-cover'
              />
              <div className='flex min-w-0 flex-1 flex-col justify-between'>
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <h3 className='truncate text-[15px] font-bold'>
                      {item.title}
                    </h3>
                    <time className='text-xs text-[#7f7f7f]'>{item.date}</time>
                  </div>
                  <div
                    className={`relative mt-1 h-[18px] w-[18px] rounded-sm ${
                      selectedItems[item.id]
                        ? 'bg-[#008cf5]'
                        : 'border border-neutral-300 bg-white'
                    }`}
                  >
                    <input
                      type='checkbox'
                      checked={selectedItems[item.id] ?? false}
                      onChange={() => onToggleItem(item.id)}
                      className='absolute -left-[3px] -top-[3px] h-6 w-6'
                    />
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='text-base font-bold'>{item.price}</div>
                  <div className='flex items-center'>
                    <button
                      type='button'
                      onClick={() => onQuantityChange(item.id, -1)}
                      className='h-5 w-5 rounded-sm text-sm font-bold text-[#7f7f7f] hover:bg-neutral-100'
                      aria-label='수량 감소'
                    >
                      -
                    </button>
                    <span className='min-w-7 text-center text-xs text-[#7f7f7f]'>
                      {quantities[item.id] ?? item.quantity}
                    </span>
                    <button
                      type='button'
                      onClick={() => onQuantityChange(item.id, 1)}
                      className='h-5 w-5 rounded-sm text-sm font-bold text-[#7f7f7f] hover:bg-neutral-100'
                      aria-label='수량 증가'
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
