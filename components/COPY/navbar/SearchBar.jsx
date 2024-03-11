import { useNavigate, useLocation, Link } from 'react-router-dom';

import { Search, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
export default function Searchbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSearchText = params.get('q') || '';
  let isSearch = false ;
  if (params.get('q')) {
    isSearch = true;
  } 

  const [searchText, setSearchText] = useState(initialSearchText);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.q.value;
    if (query.trim() === '') {
      return;
    } else {
      const fullUrl = new URL(window.location.href);
      fullUrl.searchParams.set('q', query);
      navigate(`/${fullUrl.search}`);
    }
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="mx-auto  w-full max-w-lg">
        <label
          htmlFor="quary"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          {searchText ? (
            <div
              className="absolute inset-y-0 start-0 flex cursor-pointer items-center px-3 py-2 pr-5"
              onClick={() => setSearchText('')}
            >
              {isSearch ? (
                <Link to="/" className="flex items-center">
                  <ArrowLeft width={24} height={24} />
                </Link>
              ) : (
                <div className="flex items-center">
                  <ArrowLeft width={24} height={24} />
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-y-0 start-0 flex cursor-pointer items-center px-3 py-2 pr-5">
              <Search width={24} height={24} />
            </div>
          )}

          <input
            type="search"
            id="quary"
            name="q"
            className="block w-full   rounded-full border border-gray-300 bg-gray-50 p-3 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 md:p-4 md:ps-10"
            placeholder=" Search for places to stay"
            required
            value={searchText}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="absolute bottom-2.5 end-2.5 hidden rounded-full  bg-primary px-4 py-2 text-sm font-medium  text-white hover:opacity-95 focus:outline-none focus:ring-4 md:flex"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
}
