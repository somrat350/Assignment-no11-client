import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { HiMenuAlt1 } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaMoon, FaSun } from "react-icons/fa6";

const Header = () => {
  const { user, userLoading, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const get = localStorage.getItem("assignment-no11-theme");
  const getTheme = JSON.parse(get ? get : "false");

  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    document
      .querySelector("html")
      .setAttribute("data-theme", theme ? "dark" : "light");
    localStorage.setItem("assignment-no11-theme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide header
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsHeaderVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to access this page!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout().then(() => {
          Swal.fire({
            title: "Logged out!",
            text: "Your has been logged out.",
            icon: "success",
          });
        });
      }
    });
  };

  if (userLoading) return;

  const menuLink = (
    <>
      <NavLink className="navLink" to="/">
        Home
      </NavLink>
      <NavLink className="navLink" to="/donationRequests">
        Donation Requests
      </NavLink>
      <Link className="navLink" to="/dashboard/newDonationRequest">
        New Donation Requests
      </Link>
      {user && (
        <>
          <NavLink className="navLink" to="/funding">
            Funding
          </NavLink>
        </>
      )}
    </>
  );

  const rightLink = (
    <>
      <div
        className="tooltip tooltip-bottom"
        data-tip={`${theme ? "Switch To Light Mode" : "Switch To Dark Mode"}`}
      >
        <button
          onClick={() => setTheme(!theme)}
          className="btn btn-sm btn-circle text-lg"
        >
          {theme ? <FaMoon /> : <FaSun className="text-orange-500" />}
        </button>
      </div>

      {user ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="cursor-pointer m-1">
            <img src={user?.photoURL} className="w-10 h-10 rounded-full" />
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-fit min-w-52 p-2 shadow-sm gap-2"
          >
            <li>
              <Link
                to="/dashboard/profile"
                className="btn btn-outline btn-secondary"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="btn btn-outline btn-secondary">
                Dashboard
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link className="btn btn-secondary" to="/auth/login">
          Login
        </Link>
      )}
    </>
  );

  return (
    <header 
      // id="main-tool-bar" 
      className={`sticky w-full shadow-lg left-0 top-0 z-20 backdrop-blur-md bg-base-200/70 h-16 transition-transform duration-300 ease-in-out ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-360 mx-auto px-5 py-3 flex items-center justify-between relative">
        <div className="flex items-center gap-1 sm:gap-10">
          <HiMenuAlt1
            onClick={() => setOpenMenu(true)}
            className="lg:hidden cursor-pointer text-2xl font-bold"
          />
          <Logo />
        </div>
        <div className="hidden lg:flex items-center justify-center gap-1">
          {menuLink}
        </div>
        <div className="flex items-center gap-2">{rightLink}</div>
        <div
          className={`absolute left-0 sm:left-5 top-0 shadow-2xl flex lg:hidden flex-col gap-5 p-8 rounded-b-3xl bg-base-300 w-full sm:max-w-xl z-10 duration-300 ${
            openMenu ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex justify-end">
            <HiXMark
              onClick={() => setOpenMenu(false)}
              className="cursor-pointer text-3xl font-extrabold"
            />
          </div>
          <div className="flex flex-col gap-5">{menuLink}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
