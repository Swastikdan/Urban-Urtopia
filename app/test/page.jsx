'use client'
// page.jsx
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Indian_states_cities_list from 'indian-states-cities-list';

export default function Page() {
  const states = Indian_states_cities_list.STATES_OBJECT;
  const [selectedState, setSelectedState] = useState('');


  const handleValueChnage = (value) => {
    setSelectedState(value);
  }
  const stateData = Indian_states_cities_list.STATE_WISE_CITIES[selectedState] || [];

  console.log(selectedState);
  console.log(stateData);
  return (
    <>
      <Select onValueChange={handleValueChnage} >
        <SelectTrigger className="w-full ">
          <SelectValue placeholder="Select a state" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>States</SelectLabel>
            {states.map((state) => (
              <SelectItem key={state.value} value={state.name}>
                {state.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

// <Select onSelect={handleSelect}>
    //   <SelectTrigger className="w-full ">
    //     <SelectValue placeholder="Select a timezone" />
    //   </SelectTrigger>
    //   <SelectContent>
    //     <SelectGroup>
    //       <SelectLabel>North America</SelectLabel>
    //       <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
    //       <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
    //       <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
    //       <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
    //       <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
    //       <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
    //     </SelectGroup>
    //   </SelectContent>
    // </Select>
// 'use client';
// import { cn } from '@/lib/utils';
// import Indian_states_cities_list from "indian-states-cities-list";
// import React, { useState, useEffect, useRef } from 'react';
// import { ScrollArea } from '@/components/ui/scroll-area';

// import { Input } from '@/components/Input';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// export default function Page() {
//    const [searchTerm, setSearchTerm] = useState('');
//    const [selectedOption, setSelectedOption] = useState('');
//    const [isOpen, setIsOpen] = useState(false);
//    const ref = useRef(null);

//    const options = Indian_states_cities_list.STATES_OBJECT;

//    const filteredOptions = options.filter((option) =>
//      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
//    );

//    const handleChange = (option) => {
//      setSelectedOption(option);
//      setSearchTerm(option.label);
//      setIsOpen(false);
//      console.log(`Option selected:`, option);
//    };

//    const toggleOpen = () => setIsOpen(!isOpen);

//    useEffect(() => {
//      const checkIfClickedOutside = (e) => {
//        if (isOpen && ref.current && !ref.current.contains(e.target)) {
//          setIsOpen(false);
//        }
//      };

//      document.addEventListener('mousedown', checkIfClickedOutside);

//      return () => {
//        document.removeEventListener('mousedown', checkIfClickedOutside);
//      };
//    }, [isOpen]);

//   return (
//     <div className="relative" ref={ref}>
//       <Input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(event) => setSearchTerm(event.target.value)}
//         onClick={toggleOpen}
//       />
//       {isOpen && (
//         <ul className="fixed z-10 mt-1 w-full rounded border border-gray-200 bg-white">
//           {filteredOptions.map((option) => (
//             <li
//               key={option.value}
//               onClick={() => handleChange(option)}
//               className="cursor-pointer p-2 hover:bg-gray-200"
//             >
//               {option.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// // import React from 'react'
// // import { Input } from '@/components/Input';
// // export default function page() {
// //   return (
// //     <>
// //       <label for="cars">Choose a car:</label>
// //     <Input type="text" placeholder="Enter your name" className='w-full' />
// //       <select name="cars" id="cars" className='w-full '>
// //         <option value="volvo">Volvo</option>
// //         <option value="saab">Saab</option>
// //         <option value="mercedes">Mercedes</option>
// //         <option value="audi">Audi</option>
// //       </select>
// //     </>
// //   );
// // }
