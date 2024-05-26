'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCityNames } from '@/utils/cities';
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
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatRangeDate } from '@/utils';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Share,
  Heart,
  MapPin,
  X,
} from 'lucide-react';
import { addDays, isBefore, startOfDay } from 'date-fns';
// import { title } from 'process';
// import { filter } from 'indian-cities-database/cities';
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
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const setAdults = (value) => {
    setSearchState((prevState) => ({ ...prevState, adults: value }));
  };

  const setChildren = (value) => {
    setSearchState((prevState) => ({ ...prevState, children: value }));
  };

  const setInfants = (value) => {
    setSearchState((prevState) => ({ ...prevState, infants: value }));
  };

  const setPets = (value) => {
    setSearchState((prevState) => ({ ...prevState, pets: value }));
  };

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

  useEffect(() => {
    if (Number(searchState.children) > 0 && Number(searchState.adults) === 0) {
      setSearchState((prevState) => ({
        ...prevState,
        adults: Number(searchState.adults) + 1,
      }));
    }
  }, [searchState.children, searchState.adults]);

  const [date, setDate] = useState({
    from: null,
    to: null,
  });

  useEffect(() => {
    let from = date?.from;
    let to = date?.to;

    // If from or to is null, display as null
    if (!from || !to) {
      setSearchState((prevState) => ({
        ...prevState,
        checkin: null,
        checkout: null,
      }));
    } else {
      // If from and to are the same, add one day to to
      if (from.getTime() === to.getTime()) {
        to = addDays(to, 1);
      }

      // If from is less than the current date, set it to the current date
      if (isBefore(from, startOfDay(new Date()))) {
        from = startOfDay(new Date());
      }

      // Format dates
      from = new Date(from).toISOString();
      to = new Date(to).toISOString();

      setSearchState((prevState) => ({
        ...prevState,
        checkin: from,
        checkout: to,
      }));
    }
  }, [date]);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    });

    return () => clearTimeout(timer);
  }, []);

  const topcities = [
    {
      title: "I'm Flexiable",
      img: 'https://res.cloudinary.com/debewnh29/image/upload/v1716749383/nestly/public/pictures/cities/anywhere.jpg',
      value: '',
    },
    {
      title: 'Mumbai',
      img: 'https://res.cloudinary.com/debewnh29/image/upload/nestly/public/pictures/cities/mumbai.avif',
      value: 'mumbai',
    },
    {
      title: 'Delhi',
      img: 'https://res.cloudinary.com/debewnh29/image/upload/nestly/public/pictures/cities/delhi.avif',
      value: 'delhi',
    },
    {
      title: 'Bangalore',
      img: 'https://res.cloudinary.com/debewnh29/image/upload/nestly/public/pictures/cities/bengaluru.webp',
      value: 'bangalore',
    },

    {
      title: 'Chennai',
      img: 'https://res.cloudinary.com/debewnh29/image/upload/nestly/public/pictures/cities/chennai.avif',
      value: 'chennai',
    },
    {
      title: 'Kolkata',
      img: 'https://res.cloudinary.com/debewnh29/image/upload/nestly/public/pictures/cities/kolkata.avif',
      value: 'kolkata',
    },
  ];

  let cities = getCityNames();

  const [searchCities, setSearchCities] = useState([]);
  const [inputValue, setInputValue] = useState('');
 const handleLLocationSearch = (value) => {
  if (!value) {
    setSearchCities([]);
    return;
  }
  const filteredCities = cities.filter((city) =>
    city.city.toLowerCase().includes(value.toLowerCase()) ||
    city.state.toLowerCase().includes(value.toLowerCase())
  );
  setSearchCities(filteredCities);
};

  console.log(searchCities);

  return loading ? (
    <>
      {/* Desktop SearchBar   */}
      <div className="hidden w-auto md:flex">
        <div className="hidden w-full  items-center justify-between  rounded-full border-2 border-gray-300 p-1 md:flex ">
          <div className="  flex justify-between text-sm  ">
            <div className="items-center  border-r-2 border-gray-300 px-2 py-1 ">
              <div className="h-6 w-28  animate-pulse   rounded-l-full rounded-r-md bg-gray-200"></div>
            </div>

            <div className="items-center  border-r-2 border-gray-300 px-2 py-1 ">
              <div className="h-6 w-28  animate-pulse rounded-md bg-gray-200"></div>
            </div>

            <div className=" items-center border-gray-300  py-1 pl-2 ">
              <div className="h-6 w-28  animate-pulse rounded-md bg-gray-200"></div>
            </div>
          </div>

          <div className="ml-3 rounded-full bg-blue-600 p-2.5 text-white  ">
            <Search width={20} height={20} className="text-white" />
          </div>
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
  ) : (
    <>
      {/* Desktop SearchBar   */}
      <div className="hidden w-auto select-none md:flex">
        <div className="hidden w-full  items-center justify-between  rounded-full border-2 border-gray-300  md:flex ">
          <div className="  flex justify-between text-sm  ">
            <DropdownMenu>
              <DropdownMenuTrigger className="m-0 w-full    " asChild>
                <div className="cursor-pointer   items-center rounded-full px-3 py-2 hover:bg-gray-100 focus:bg-gray-100  ">
                  <div className="flex  h-8 w-max min-w-28 items-center justify-center text-center text-[14px]  font-semibold">
                    <span className="">
                      {searchState.location
                        ? searchState.location.charAt(0).toUpperCase() +
                          searchState.location.slice(1)
                        : 'Anywhere'}
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[424px]  rounded-3xl p-5 "
              >
                <div className="mb-3 flex w-full items-center rounded-full border-2 focus:border-black border-gray-300 text-[13px] font-medium text-black placeholder:text-[13px] placeholder:text-black ">
                  <input
                    type="text"
                    name="search-location"
                    id="search-location"
                    value={inputValue}
                    onInput={(e) => {
                      const value = e.target.value;
                      setInputValue(value);
                      handleLLocationSearch(value);
                    }}
                    placeholder="Search Destinations"
                    className="w-full rounded-full p-2 text-black placeholder-black outline-none "
                  />
                  <div>
                  {
                    inputValue ? (
                      <X size={32} className="cursor-pointer p-1 rounded-3xl bg-gray-200 mr-1" onClick={() => {
                        setInputValue('');
                        setSearchCities([]);
                      }} />
                    ) : null
                  }
               

                  </div>
                </div>
                {inputValue ? (
                  <ScrollArea className="mr-2 h-80 w-full select-none">
                    <div className="flex flex-col p-1">
                      {/* <div className='flex items-center text-sm font-semibold p-2 hover:bg-gray-200/70 rounded-xl space-x-3'>
                        <MapPin size={32} className='p-1 rounded-3xl bg-gray-300 ' />
                        <span>Kolkata , West Bengal</span>
                      </div> */}

                      {searchCities.length >= 1 ? (
                        searchCities.map((city, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setSearchState((prevState) => ({
                                ...prevState,
                                location: city.city,
                              }));
                              // Force component to re-render
                              setSearchState((prevState) => ({ ...prevState }));
                            }}
                            className={`flex cursor-pointer items-center space-x-3 rounded-xl p-2 text-sm font-semibold hover:bg-gray-200/70  ${searchState.location == city.city ? 'bg-gray-200' : ''} `}
                          >
                            <MapPin
                              size={32}
                              className="rounded-3xl bg-gray-100 p-1 text-gray-600 "
                            />
                            <span>{`${city.city} , ${city.state}`}</span>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center space-x-3 rounded-xl p-2 text-sm font-semibold ">
                          <MapPin
                            size={32}
                            className="rounded-3xl bg-gray-300 p-1 "
                          />
                          <span>No Results Found</span>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="grid grid-cols-3 gap-5 ">
                    {topcities.map((city, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSearchState((prevState) => ({
                            ...prevState,
                            location: city.value,
                          }));
                        }}
                        className="group flex cursor-pointer flex-col space-y-1 rounded-xl p-2 hover:bg-gray-200/70"
                      >
                        {/* <div className="h-24 w-24 rounded-xl bg-gray-200"></div> */}
                        <img
                          src={city.img}
                          alt={city.title}
                          className="h-24 w-24 rounded-xl border-2 border-gray-300 bg-gray-100 object-cover object-center group-active:scale-95 "
                        />
                        <span className="text-sm font-semibold">
                          {city.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-12 w-[5px]  bg-gray-300"></div>
            <DropdownMenu>
              <DropdownMenuTrigger className="m-0 w-full    " asChild>
                <div className="cursor-pointer   items-center rounded-full px-3 py-2 hover:bg-gray-100 focus:bg-gray-100  ">
                  {' '}
                  <div className="flex  h-8 w-max min-w-28 items-center justify-center text-center text-[14px]  font-semibold">
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
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-full space-y-3 rounded-3xl p-3"
              >
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="h-12 w-[5px]  bg-gray-300"></div>
            <div className="flex items-center space-x-1 rounded-full pr-1 hover:bg-gray-100 focus:bg-gray-100 ">
              <DropdownMenu>
                <DropdownMenuTrigger className="z-0 m-0 w-full   " asChild>
                  <div className=" cursor-pointer   items-center  py-2 pl-3 ">
                    <div
                      className={`flex  h-8 w-max min-w-28 items-center justify-center text-center text-[14px] ${Number(searchState.adults) + Number(searchState.children) > 0 ? 'font-semibold' : ''}  `}
                    >
                      <span className="">
                        {Number(searchState.adults) +
                          Number(searchState.children) >=
                        16
                          ? `16+  Guests`
                          : Number(searchState.adults) +
                                Number(searchState.children) >
                              1
                            ? Number(searchState.adults) +
                              Number(searchState.children) +
                              ' Guests'
                            : Number(searchState.adults) +
                                  Number(searchState.children) ===
                                1
                              ? '1 Guest'
                              : 'Add Guests'}
                      </span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className=" -mr-[44px] w-[30vw] space-y-3 rounded-3xl lg:w-[20vw]"
                >
                  <div className=" space-y-3 p-3">
                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                          <span className="text-base font-medium">Adults</span>
                          <span className="text-sm font-light">Age 13+</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            disabled={searchState.adults === 0}
                            className="hover:text-accent-foregroun rounded-full border border-input bg-background p-2 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => {
                              if (searchState.adults > 0) {
                                setAdults(searchState.adults - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center text-base font-light tabular-nums">
                            {searchState.adults}
                          </span>
                          <button
                            disabled={
                              searchState.adults + searchState.children >= 16
                            }
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => setAdults(searchState.adults + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                          <span className="text-base font-medium">
                            Children
                          </span>
                          <span className="text-sm font-light">Ages 2-12</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            disabled={searchState.children === 0}
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => {
                              if (searchState.children > 0) {
                                setChildren(searchState.children - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center text-base font-light tabular-nums">
                            {searchState.children}
                          </span>
                          <button
                            disabled={
                              searchState.adults + searchState.children >= 16
                            }
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() =>
                              setChildren(searchState.children + 1)
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                          <span className="text-base font-medium">Infants</span>
                          <span className="text-sm font-light">Under 2</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            disabled={searchState.infants === 0}
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => {
                              if (searchState.infants > 0) {
                                setInfants(searchState.infants - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center text-base font-light tabular-nums">
                            {searchState.infants}
                          </span>
                          <button
                            disabled={searchState.infants >= 5}
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => {
                              if (searchState.infants < 5) {
                                setInfants(searchState.infants + 1);
                              }
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                          <span className="text-base font-medium">Pets</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            disabled={searchState.pets === 0}
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => {
                              if (searchState.pets > 0) {
                                setPets(searchState.pets - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center text-base font-light tabular-nums">
                            {searchState.pets}
                          </span>
                          <button
                            disabled={searchState.pets >= 5}
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => {
                              if (searchState.pets < 5) {
                                setPets(searchState.pets + 1);
                              }
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                onClick={() => handleSearch()}
                className="ml-3 rounded-full bg-blue-600 p-2.5 text-white hover:bg-blue-700  "
              >
                <Search width={20} height={20} className="text-white" />
              </button>
            </div>
          </div>
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
}
