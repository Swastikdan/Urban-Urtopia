import Sort from '@/components/navbar/sort/Sort';
import CatagorySlider from './CatagorySlider';
export default function CatagoryWithSort() {
  return (
    <>
      <div className="mx-auto flex items-center justify-center ">
        <div className="w-full md:w-10/12  ">
          <CatagorySlider />
        </div>
        <div className="mb-2 hidden  md:flex md:w-2/12  ">
          <Sort />
        </div>
      </div>
    </>
  );
}
