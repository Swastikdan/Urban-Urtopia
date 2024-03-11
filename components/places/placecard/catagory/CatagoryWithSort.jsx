import Sort from '@/components/sort/Sort';
import CatagorySlider from './CatagorySlider';
export default function CatagoryWithSort() {
  return (
    <>
      <div className="mx-auto flex items-center justify-center max-w-screen-2xl md:px-8 ">
        <div className="w-full md:w-11/12 md:pr-5  ">
          <CatagorySlider />
        </div>
        <div className="mb-2 hidden md:flex md:w-1/12  ">
          <Sort />
        </div>
      </div>
    </>
  );
}
