export type FilterCategory = '전체' | '자연관광' | '역사탐방' | '음식여행' | '도시여행' | '문화예술';

const FILTER_CATEGORIES: FilterCategory[] = ['전체', '자연관광', '역사탐방', '음식여행', '도시여행', '문화예술'];

interface FilterTabsProps {
    selected: FilterCategory;
    onSelect: (category: FilterCategory) => void;
}

export default function FilterTabs({ selected, onSelect }: FilterTabsProps) {
    return (
        <div className="flex gap-2 overflow-x-auto py-2">
            {FILTER_CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap transition-colors cursor-pointer ${selected === cat
                            ? 'text-blue-500 border-blue-500 bg-blue-50'
                            : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`
                    }>
                    {cat}
                </button>
            ))}
        </div>
    );
}