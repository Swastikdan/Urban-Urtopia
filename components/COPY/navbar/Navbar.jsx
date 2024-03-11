import { useState, useEffect } from 'react';
import Image from '../ui/Image';
import { ModeToggle } from './mode-toggle';
import Searchbar from './SearchBar';
import UserProfile from './UserProfile';
import GuestProfile from './GuestProfile';
import CatagoryWithSort from '../placecard/catagory/CatagoryWithSort';
import Sort from '../../sort/Sort';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';
export default function Navbar({ className}) {
  const auth = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isHome, setisHome] = useState(true);
  const { user, logout } = auth;
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
      navigate('/');
    } else {
      toast.error(response.message);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 200;
      if (isScrolled !== scrolled) {
        setScrolled(!scrolled);
      }
    };
    if (location.pathname === '/') {
      setisHome(true);
    } else {
      setisHome(false);
    }

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, location]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 select-none bg-white pt-4 transition-all duration-300 dark:bg-gray-900 sm:select-auto sm:pt-2',
          { 'shadow-md': scrolled }, className
        )}
      >
        <nav className="mx-auto flex max-w-screen-xl items-center justify-center px-2 md:px-5 md:py-2 lg:px-10  ">
          <Link
            to="/"
            className="hidden items-center space-x-2 text-2xl font-bold md:flex xl:text-3xl"
          >
            <img
              src="/Logo_Transparent.png"
              width={50}
              height={50}
              alt="logo"
            />
            <span>Stayz</span>
          </Link>

          <div className="flex-grow pl-2 md:pl-5">
            <Searchbar />
          </div>

          <div className="flex items-center ">
            <div className="hidden items-center px-2  sm:flex md:pl-1 md:pr-5 ">
              {user ? (
                <UserProfile user={user} handleLogout={handleLogout} />
              ) : (
                <GuestProfile />
              )}
            </div>
            <div className="flex items-center px-2  sm:hidden md:pl-1 md:pr-5 ">
              {isHome && <Sort />}
            </div>
          </div>
        </nav>
        <div className="mx-auto max-w-screen-2xl items-center pt-3 md:pt-5  lg:px-10 ">
          {isHome && <CatagoryWithSort />}
        </div>
      </header>
    </>
  );
}
