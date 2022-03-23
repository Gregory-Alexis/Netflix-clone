import { ArrowDropDown } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import Search from "../../images/search.svg";
import Bell from "../../images/bell.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setActive,
  setScrolled,
  setSearch,
  setToggle,
  setWidth,
} from "../../redux/appSlice/appSlice";

import NotificationDropDown from "../HomeComponents/NavBar/NotificationDropDown";
import ProfileDropDown from "../HomeComponents/NavBar/ProfileDropDown";

const NavBarCustom = ({ active }) => {
  const isActive = useSelector((state) => state.appData.isInputActive);
  const search = useSelector((state) => state.appData.search);
  const width = useSelector((state) => state.appData.width);
  const quantity = useSelector((state) => state.myListData.quantity);
  const scrolled = useSelector((state) => state.appData.isScrolled);
  const dispatch = useDispatch();

  const ref = useRef();

  window.onscroll = () => {
    dispatch(setScrolled(window.pageYOffset === 0 ? false : true));
    return () => (window.onscroll = null);
  };

  /* 
  useEffect prend en charge la fermeture d'un fenêtre modale en cliquant à l'extèrieur de celle ci.
  Il prend aussi en charge la largeur de la page.
  */
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isActive && ref.current && !ref.current.contains(e.target)) {
        dispatch(setActive(false));
      }
    };
    /* Si la largeur de la page est inférieur à 1024px alors une nouvelle navbar créé pour petit écrans sera affiché */
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

  /* Fonction qui gère l'affichage du texte saisie dans la barre de recherche */
  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(setSearch(e.target.value));
  };

  return (
    /* Sur la page Movie, la navbar de base à un background color noir. 
       Une fois qu'un scroll aura été effectué vers le bas, la sous navbar prendra la place de la navbar.
    */
    <div className={scrolled ? "navbar scrolledIn" : "navbar scrolledOut"}>
      <div className="flex items-center justify-between text-gray-100 py-2 px-5 md:px-8 xl:px-10 relative w-full">
        <div className="flex items-center">
          <Link to="/home">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt="Netflix"
              className="md:w-24"
              width="48"
            />
          </Link>
          {/*Ici, "width" prend en charge l'apparence du modal de la navbar selon la taille de la page */}

          {/*nabar pour grands écrans */}
          {width >= 1024 ? (
            <ul className="flex relative">
              <li
                className={
                  active === "home"
                    ? "mr-5 ml-12 text-sm active"
                    : "mr-5 ml-12 text-sm hover:text-gray-300 transition-all duration-200 ease-in-out"
                }
              >
                <Link to="/home">Home</Link>
              </li>
              <li
                className={
                  active === "tv"
                    ? "mr-5 text-sm active"
                    : "mr-5 text-sm hover:text-gray-300 transition-all duration-200 ease-in-out"
                }
              >
                <Link to="/tv-shows">TV Shows</Link>
              </li>
              <li
                className={
                  active === "movies"
                    ? "mr-5 text-sm active"
                    : "mr-5 text-sm hover:text-gray-300 transition-all duration-200 ease-in-out"
                }
              >
                <Link to="/movie">Movies</Link>
              </li>
              <li
                className={
                  active === "Nap"
                    ? "mr-5 text-sm active"
                    : "mr-5 text-sm hover:text-gray-300 transition-all duration-200 ease-in-out"
                }
              >
                <Link to="/latest">New & Popular</Link>
              </li>

              <li
                className={
                  active === "myList"
                    ? "mr-5 text-sm active"
                    : "mr-5 text-sm hover:text-gray-300 transition-all duration-200 ease-in-out"
                }
              >
                <Link to="/my-list">My List</Link>
              </li>
              {quantity > 0 && (
                <div className="bg-red-700 rounded-full absolute h-5 w-5 -top-3 right-1 text-sm flex justify-center items-center">
                  <span className="">{quantity}</span>
                </div>
              )}
            </ul>
          ) : (
            /*nabar pour petits écrans */
            <div className="relative inline-block text-center group">
              <div>
                <button
                  type="button"
                  aria-label="browse pages"
                  className="inline-flex justify-center w-full text-sm font-medium text-gray-100 ml-4 py-2 md:text-2xl"
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
                className="absolute z-30 right-0 -left-14 border-t border-t-gray-100 mt-2 w-56 invisible group-hover:visible transition-all duration-200 ease-in-out"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
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
                      <Link to="/latest">New & Popular</Link>
                    </li>
                    <div className="relative">
                      <li className="pt-2">
                        <Link to="/my-list">My List</Link>
                      </li>
                      <li className="pt-2 hover:text-gray-100 hover:underline">
                        <Link to="/kids">Kids</Link>
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
        {/*
        Le bouton search de la navbar est de base "une icone de loupe", lorsqu'on cliquera dessus une barre de recherche apparaîtra.
        La barre de recherche ne sera affiché que si la taille de la page est supèrieur ou égale à 768px
        */}
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
                onClick={() => dispatch(setActive(!isActive))}
              >
                <img
                  src={Search}
                  alt="search"
                  width="24"
                  data-testid="searchInput"
                />
              </span>
            </div>
          )}
          {/*Lien qui redirige vers la page "Kids" */}
          <div className="flex justify-center items-center">
            {width >= 768 && (
              <Link
                to="/kids"
                className="text-lg hover:text-gray-300 transition-all duration-200 ease-in-out"
              >
                Kids
              </Link>
            )}
          </div>

          {/*Icone d'une cloche qui gère les notifications utilisateur, lorsqu'on passera la souris sur l'icône,
          une fenêtre apparaîtra avec toute les récentes notifications <<< Le comportement à juste été simulé >>>

          voir composant "NotificationDropDown"
           */}
          <div className="relative group flex justify-center items-center">
            <img src={Bell} alt="notification" width="20" />
            <NotificationDropDown />
          </div>

          <div className="relative cursor-pointer group flex">
            <div className="flex items-center">
              <img
                src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="profile"
                className="h-10 rounded object-cover"
                width="40"
              />
              {/*En dessous de 1024px, la petite flêche animée situé à droite de la photo de profil ne sera pas visible */}
              {width >= 1024 && (
                <span className="group-hover:rotate-180 transiton duration-500">
                  <ArrowDropDown />
                </span>
              )}
              {/* Icone de profil qui gère les options utilisateur, lorsqu'on passera la souris sur l'icône,
                  une fenêtre apparaîtra avec toute les options disponible <<< Le comportement à juste été simulé >>>
                  
                  voir composant "ProfileDropDown"
              */}
              <ProfileDropDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarCustom;
