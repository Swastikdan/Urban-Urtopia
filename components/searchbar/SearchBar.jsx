'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatRangeDate } from '@/utils';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = [
    'location',
    'checkin',
    'checkout',
    'adults',
    'children',
    'infants',
    'pets',
  ];
  const [loading, setLoading] = useState(true);
  const [searchState, setSearchState] = useState({
    location: '',
    checkin: '',
    checkout: '',
    adults: '',
    children: '',
    infants: '',
    pets: '',
  });

  useEffect(() => {
    let newState = {};
    params.forEach((param) => {
      let value = searchParams.get(param);
      if (value) {
        newState[param] = value;
      }
    });
    setSearchState((prevState) => ({ ...prevState, ...newState }));
  }, [searchParams]);

  // add a useeffect if the childen has valur and adults is empty then set the adults to 1

  useEffect(() => {
    if (searchState.children && !searchState.adults) {
      setSearchState((prevState) => ({ ...prevState, adults: '1' }));
    }
  }, [searchState.children]);

  // console.log(searchState);
  // writ a demo code to show how to quary with the searchparams
  // ?location=Helsinki&checkin=2022-01-01&checkout=2022-01-02&adults=2&children=1&infants=0&pets=0

const handleSearch = () => {
  if (!searchState.adults) {
    return;
  }

  let search = '';
  params.forEach((param) => {
    if (searchState[param]) {
      search += `${param}=${searchState[param]}&`;
    }
  });
  router.push(`/?${search}`);
};



    return (
      <>
        {/* Desktop SearchBar   */}
        <div className="hidden w-auto md:flex">
          <div className="hidden w-full  items-center justify-between  rounded-full border-2 border-gray-300 p-1 md:flex ">
            <div className="  flex justify-between text-sm  ">
              <div className="items-center  border-r-2 border-gray-300 px-2 py-1 ">
                <div className="flex  h-8 w-auto min-w-20 items-center justify-center text-center text-[14px]  font-semibold">
                  <span className="">
                    {/* {searchState.location.charAt(0).toUpperCase() +
                    searchState.location.slice(1) || } */}
                    {searchState.location
                      ? searchState.location.charAt(0).toUpperCase() +
                        searchState.location.slice(1)
                      : 'Anywhere'}
                  </span>
                </div>
              </div>

              <div className="items-center  border-r-2 border-gray-300 px-2 py-1 ">
                {' '}
                <div className="flex  h-8 w-auto min-w-20 items-center justify-center text-center text-[14px]  font-semibold">
                  <span className="">
                    {searchState.checkin && searchState.checkout
                      ? formatRangeDate(
                          searchState.checkin,
                          searchState.checkout,
                        )
                      : 'Any Date'}
                  </span>
                </div>
              </div>

              <div className=" items-center border-gray-300  py-1 pl-2 ">
                <div
                  className={`flex  h-8 w-auto min-w-20 items-center justify-center text-center text-[14px] ${searchState.adults || searchState.children ? 'font-semibold' : ''}  `}
                >
                  <span className="">
                    {searchState.adults || searchState.children
                      ? Number(searchState.adults) +
                        Number(searchState.children) +
                        ' guests'
                      : 'Add Guests'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSearch()}
              className="ml-3 rounded-full bg-blue-600 p-2.5 text-white hover:bg-blue-600/90  "
            >
              <Search width={20} height={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Mobile SearchBar   */}
        <div className="flex w-full pt-4 md:hidden">
          <div className="ml-2 flex w-full items-center  rounded-full bg-gray-100  p-1 md:hidden md:w-auto">
            <div className="mr-2 rounded-full bg-white px-3 py-3">
              <Search width={20} height={20} />
            </div>
            <div className="my-1 mr-4 h-8 w-full animate-pulse rounded-sm bg-gray-200"></div>
          </div>
        </div>
      </>
    );


  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   });

  //   return () => clearTimeout(timer);
  // }, []);

  // console.log(searchState);

  // return loading ? (
  //   <>
  //     {/* Desktop SearchBar   */}
  //     <div className="hidden w-auto md:flex">
  //       <div className="hidden w-full  items-center justify-between  rounded-full border-2 border-gray-300 p-1 md:flex ">
  //         <div className="  flex justify-between text-sm  ">
  //           <div className="items-center  border-r-2 border-gray-300 px-2 py-1 ">
  //             <div className="h-6 w-20  animate-pulse   rounded-l-full rounded-r-md bg-gray-200"></div>
  //           </div>

  //           <div className="items-center  border-r-2 border-gray-300 px-2 py-1 ">
  //             <div className="h-6 w-20  animate-pulse rounded-md bg-gray-200"></div>
  //           </div>

  //           <div className=" items-center border-gray-300  py-1 pl-2 ">
  //             <div className="h-6 w-20  animate-pulse rounded-md bg-gray-200"></div>
  //           </div>
  //         </div>

  //         <div className="ml-3 rounded-full bg-blue-600 p-2.5 text-white  ">
  //           <Search width={20} height={20} className="text-white" />
  //         </div>
  //       </div>
  //     </div>
  //     {/* Mobile SearchBar   */}
  //     <div className="flex w-full pt-4 md:hidden">
  //       <div className="ml-2 flex w-full items-center  rounded-full bg-gray-100  p-1 md:hidden md:w-auto">
  //         <div className="mr-2 rounded-full bg-white px-3 py-3">
  //           <Search width={20} height={20} />
  //         </div>
  //         <div className="my-1 mr-4 h-8 w-full animate-pulse rounded-sm bg-gray-200"></div>
  //       </div>
  //     </div>
  //   </>
  // ) : (
  //   <>
  //     {/* Desktop SearchBar   */}
  //     <div className="hidden w-auto md:flex">
  //       <div className="hidden w-full  items-center justify-between  rounded-full border-2 border-gray-300 p-1 md:flex ">
  //         <div className="  flex justify-between text-sm  ">
  //           <div className="items-center  border-r-2 border-gray-300 px-2 py-1 ">
  //             <div className="flex  h-8 w-auto min-w-20 items-center justify-center text-center text-[14px]  font-semibold">
  //               <span className="">
  //                 {/* {searchState.location.charAt(0).toUpperCase() +
  //                   searchState.location.slice(1) || } */}
  //                 {searchState.location
  //                   ? searchState.location.charAt(0).toUpperCase() +
  //                     searchState.location.slice(1)
  //                   : 'Anywhere'}
  //               </span>
  //             </div>
  //           </div>

  //           <div className="items-center  border-r-2 border-gray-300 px-2 py-1 ">
  //             {' '}
  //             <div className="flex  h-8 w-auto min-w-20 items-center justify-center text-center text-[14px]  font-semibold">
  //               <span className="">
  //                 {searchState.checkin && searchState.checkout
  //                   ? formatRangeDate(searchState.checkin, searchState.checkout)
  //                   : 'Any Date'}
  //               </span>
  //             </div>
  //           </div>

  //           <div className=" items-center border-gray-300  py-1 pl-2 ">
  //             <div
  //               className={`flex  h-8 w-auto min-w-20 items-center justify-center text-center text-[14px] ${searchState.adults || searchState.children ? 'font-semibold' : ''}  `}
  //             >
  //               <span className="">
  //                 {searchState.adults || searchState.children
  //                   ? Number(searchState.adults) +
  //                     Number(searchState.children) +
  //                     ' guests'
  //                   : 'Add Guests'}
  //               </span>
  //             </div>
  //           </div>
  //         </div>

  //         <button
  //           onClick={() => handleSearch()}
  //           className="ml-3 rounded-full bg-blue-600 p-2.5 text-white hover:bg-blue-600/90  "
  //         >
  //           <Search width={20} height={20} className="text-white" />
  //         </button>
  //       </div>
  //     </div>

  //     {/* Mobile SearchBar   */}
  //     <div className="flex w-full pt-4 md:hidden">
  //       <div className="ml-2 flex w-full items-center  rounded-full bg-gray-100  p-1 md:hidden md:w-auto">
  //         <div className="mr-2 rounded-full bg-white px-3 py-3">
  //           <Search width={20} height={20} />
  //         </div>
  //         <div className="my-1 mr-4 h-8 w-full animate-pulse rounded-sm bg-gray-200"></div>
  //       </div>
  //     </div>
  //   </>
  // );
}
