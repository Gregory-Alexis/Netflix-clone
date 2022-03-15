import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setToggle, setWidth } from "../../../redux/homeSlice/homeSlice";
import {
  setIsActive,
  setSearch,
} from "../../../redux/tvShowsSlice/tvShowsSlice";
import NotificationDropDown from "../../HomeComponents/NavBar/NotificationDropDown";
import ProfileDropDown from "../../HomeComponents/NavBar/ProfileDropDown";
import SubNavBarTvShows from "./SubNavBarTvShows";

const NavBarTvShows = () => {
  const isActive = useSelector((state) => state.tvShowsData.isActive);
  const search = useSelector((state) => state.tvShowsData.search);
  const quantity = useSelector((state) => state.myListData.quantity);
  const width = useSelector((state) => state.homeData.width);
  const dispatch = useDispatch();

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isActive && ref.current && !ref.current.contains(e.target)) {
        dispatch(setIsActive(false));
      }
    };

    const changeWidth = () => {
      dispatch(setWidth(window.innerWidth));
      if (window.innerWidth >= 1024) {
        dispatch(setToggle(false));
      }
    };
    window.addEventListener("resize", changeWidth);
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
      window.removeEventListener("resize", changeWidth);
    };
  }, [isActive, dispatch]);

  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="navbar">
      <div className="flex items-center justify-between px-3 md:px-8 xl:px-10">
        <div className="flex items-center ">
          <Link to="/home">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt="Netflix"
              className="w-12 md:w-24"
            />
          </Link>
          {width >= 1024 ? (
            <ul className="flex">
              <li className="mr-5 ml-12 text-sm">
                <Link to="/home">Home</Link>
              </li>
              <li className="mr-5 text-sm">
                <Link to="/tv-shows">TV Shows</Link>
              </li>
              <li className="mr-5 text-sm">
                <Link to="/movie">Movies</Link>
              </li>
              <li className="mr-5 text-sm">
                <Link to="/latest">New and Popular</Link>
              </li>
              <div className="relative">
                <li className="mr-5 text-sm">
                  <Link to="/my-list">My List</Link>
                </li>
                {quantity > 0 && (
                  <div className="bg-red-700 rounded-full absolute h-5 w-5 -top-1 right-2 text-sm flex justify-center items-center">
                    <span className="">{quantity}</span>
                  </div>
                )}
              </div>
            </ul>
          ) : (
            <div class="relative inline-block text-center  group">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full text-sm font-medium text-gray-100 ml-4 py-2"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Browse
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div
                className="absolute right-0 -left-14 z-30 border-t border-t-gray-100 mt-2 w-56 invisible group-hover:visible transition-all duration-200 ease-in-out"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div
                  className="py-1 bg-darknet text-gray-400 bg-opacity-95"
                  role="none"
                >
                  <ul className="flex flex-col justify-center items-center text-sm py-3">
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                    <li className="pt-2">
                      <Link to="/tv-shows">TV Shows</Link>
                    </li>
                    <li className="pt-2">
                      <Link to="/movie">Movies</Link>
                    </li>
                    <li className="pt-2">
                      <Link to="/latest">New and Popular</Link>
                    </li>
                    <div className="relative">
                      <li className="pt-2">
                        <Link to="/my-list">My List</Link>
                      </li>
                      {quantity > 0 && (
                        <div className="bg-red-700 rounded-full absolute h-4 w-4 top-1 -right-3 text-sm flex justify-center items-center text-white">
                          <span className="">{quantity}</span>
                        </div>
                      )}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-5 items-center justify-center">
          {width >= 768 && (
            <div className="relative" ref={ref}>
              {isActive && (
                <input
                  type="search"
                  placeholder="Titles, people, genres"
                  className="inputSearchOpen"
                  autoFocus
                  value={search}
                  onChange={handleFilter}
                />
              )}

              {!isActive && (
                <input
                  type="search"
                  placeholder="Titles, people, genres"
                  className="inputSearchClosed"
                />
              )}

              <span
                className="absolute  top-0 bottom-0 flex items-center pl-5"
                onClick={() => dispatch(setIsActive(!isActive))}
              >
                <Search style={{ fontSize: "18px" }} />
              </span>
            </div>
          )}
          <div className="flex justify-center items-center">
            {width >= 768 && (
              <Link to="/kids" className="text-sm">
                Kids
              </Link>
            )}
          </div>
          <div className="relative group flex justify-center items-center">
            <Notifications style={{ fontSize: "18px" }} />
            <NotificationDropDown />
          </div>

          <div className="relative cursor-pointer group flex">
            <div className="flex items-center">
              <img
                src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="profile"
                className="w-10 h-10 rounded object-cover"
              />
              {width >= 1024 && (
                <span className="group-hover:rotate-180 transiton duration-500">
                  <ArrowDropDown />
                </span>
              )}

              <ProfileDropDown />
            </div>
          </div>
        </div>
      </div>
      <SubNavBarTvShows />
    </div>
  );
};

export default NavBarTvShows;
