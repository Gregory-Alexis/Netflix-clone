import { Search } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setIsActive,
  setScrolled,
  setSearch,
} from "../../../redux/kidsSlice/kidsSlice";

const NavBarKids = () => {
  const search = useSelector((state) => state.kidsData.search);
  const isInputActive = useSelector((state) => state.kidsData.isInputActive);
  const isHomeScrolled = useSelector((state) => state.kidsData.isHomeScrolled);
  const quantity = useSelector((state) => state.myListData.quantity);
  const dispatch = useDispatch();

  const ref = useRef();

  window.onscroll = () => {
    dispatch(setScrolled(window.pageYOffset === 0 ? false : true));
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isInputActive && ref.current && !ref.current.contains(e.target)) {
        dispatch(setIsActive(false));
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isInputActive, dispatch]);

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
    <div
      className={isHomeScrolled ? "navbar scrolledIn" : "navbar scrolledOut"}
    >
      <div className="flex items-center justify-between px-10 h-20">
        <div className="flex items-center ">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt="Netflix"
              className="h-7"
            />
          </Link>
          <ul className="flex">
            <li className="mr-5 ml-12">
              <Link to="/home">Home</Link>
            </li>
            <li className="mr-5">
              <Link to="/tv-shows">TV Shows</Link>
            </li>
            <li className="mr-5">
              <Link to="/movie">Movies</Link>
            </li>
            <li className="mr-5">
              <Link to="/latest">New and Popular</Link>
            </li>
            <div className="relative">
              <li className="mr-5">
                <Link to="/my-list">My List</Link>
              </li>
              {quantity > 0 && (
                <div className="bg-red-700 rounded-full absolute h-5 w-5 -top-1 right-2 text-sm flex justify-center items-center">
                  <span className="">{quantity}</span>
                </div>
              )}
            </div>
          </ul>
        </div>

        <div className="flex space-x-5 items-center">
          <div className="relative" ref={ref}>
            {isInputActive && (
              <input
                type="search"
                placeholder="Titles, people, genres"
                className="inputSearchOpen"
                autoFocus
                value={search}
                onChange={handleFilter}
              />
            )}

            {!isInputActive && (
              <input
                type="search"
                placeholder="Titles, people, genres"
                className="inputSearchClosed"
              />
            )}

            <span
              className="absolute left-0 top-0 bottom-0 flex items-center pl-2"
              onClick={() => dispatch(setIsActive(!isInputActive))}
            >
              <Search style={{ fontSize: "34px" }} />
            </span>
          </div>

          <div className="relative cursor-pointer group flex">
            <div className="flex items-center">
              <img
                src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="profile"
                className="w-10 h-10 rounded object-cover"
              />
            </div>
          </div>
          <Link to="/home" className="bg-red-600 text-sm px-8 py-1 rounded">
            Exit Kids
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBarKids;
