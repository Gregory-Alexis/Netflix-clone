import { ArrowDropDown } from "@mui/icons-material";
import React, { useRef } from "react";
import { useEffect } from "react";
import { tvShowsId } from "../../TvShowsIdData";

const FilterGenre = ({
  activeHandler,
  active,
  setActive,
  filter,
  setFilter,
}) => {
  const ref = useRef();
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (active && ref.current && !ref.current.contains(e.target)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [active, setActive]);

  return (
    <div className="absolute top-24 left-16 flex z-30">
      <div className="relative flex items-center">
        <h1 className="text-5xl font-semibold text-white">TV SHOWS</h1>

        <div className="flex-1 ml-16" ref={ref}>
          <button
            type="button"
            className="bg-darknet text-white border border-white w-32 py-1 text-xl font-medium mr-4 flex items-center justify-center hover:bg-button"
            onClick={activeHandler}
          >
            Genres
            <span className="ml-6">
              <ArrowDropDown />
            </span>
          </button>

          {active && (
            <select
              className="origin-top-right absolute w-80 h-40 rounded-md shadow-lg bg-darknet bg-opacity-90 text-white flex flex-col flex-wrap p-2"
              value={filter}
              onChange={filterHandler}
            >
              {tvShowsId.map((el) => (
                <option className="my-1 hover:underline">{el.genre}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterGenre;
