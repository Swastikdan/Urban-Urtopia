import { ArrowDownUp } from 'lucide-react';

export default function SortTrigger() {
  return (
    <>
      <div className="rounded-full border-2 border-gray-300 bg-gray-50 p-4 md:hidden">
        <ArrowDownUp strokeWidth={3} width={15} height={15} />
      </div>

      <div className="hidden items-center space-x-2 rounded-xl bg-gray-50 p-3 text-xs font-medium ring-1 ring-gray-400 md:flex">
        <ArrowDownUp strokeWidth={3} width={15} />
        <span>Sort By</span>
      </div>
    </>
  );
}
