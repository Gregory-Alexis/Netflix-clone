import { GridViewRounded, MenuOpenRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLinkActive,
  setIsScrolled,
} from "../../../redux/tvShowsSlice/suggestionTvShowsSlice";

const SubNavBarTvShowsSuggestion = () => {
  const isScrolled = useSelector(
    (state) => state.suggestionTvShowsData.isScrolled
  );
  const isLinkActive = useSelector(
    (state) => state.suggestionTvShowsData.isLinkActive
  );
  const width = useSelector((state) => state.homeData.width);
  const dispatch = useDispatch();

  window.onscroll = () => {
    dispatch(setIsScrolled(window.pageYOffset === 0 ? false : true));
    return () => (window.onscroll = null);
  };

  return (
    <div
      className={
        isScrolled ? "subNavbarScrolled scrolledIn" : "subNavbar scrolledOut"
      }
    >
      <div className="relative flex items-center">
        <h1 className=" font-semibold text-white xl:text-4xl">TV SHOWS</h1>

        <div className="flex-1 ml-5">
          <select className="bg-darknet bg-opacity-90 text-white flex flex-col flex-wrap border p-2 border-white hover:bg-transparent text-xs w-24 lg:text-base xl:w-32">
            <option value="all" className="bg-darknet">
              Genres
            </option>
          </select>
        </div>
        {width < 768 ? (
          <div class="relative inline-block text-center  group">
            <div className="flex">
              <a
                href="/tv-shows"
                className="border px-3 text-gray-500 border-gray-500 flex items-center justify-center"
                onClick={() => dispatch(setIsLinkActive(!isLinkActive))}
              >
                <MenuOpenRounded style={{ fontSize: "20px" }} />
              </a>

              <div className="relative flex items-center">
                <div
                  className="border py-1 px-3 text-white border-white bg-darknet flex items-center justify-center text-xs xl:text-sm"
                  onClick={() => dispatch(setIsLinkActive(!isLinkActive))}
                >
                  <button
                    type="button"
                    aria-label="grid view"
                    className="inline-flex justify-center w-full text-sm font-medium text-gray-100"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    <GridViewRounded style={{ fontSize: "26px" }} />
                    <svg
                      className="-mr-1 h-7 w-5"
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
              </div>
            </div>

            <div
              className="absolute right-0  z-30 border-t border-t-gray-100 mt-2 w-56 invisible group-hover:visible transition-all duration-200 ease-in-out"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div
                className="py-1 bg-darknet text-gray-400 bg-opacity-95"
                role="none"
              >
                <ul className="flex flex-col justify-center items-center text-sm py-3 ">
                  <li>
                    <span className="hover:text-gray-100 hover:underline">
                      Suggestion pour vous
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-gray-100 hover:underline">
                      Année de sortie
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-gray-100 hover:underline">
                      A-Z
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-gray-100 hover:underline">
                      Z-A
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex">
            <a
              href="/tv-shows"
              className="border px-3 text-gray-500 border-gray-500 flex items-center justify-center"
              onClick={() => dispatch(setIsLinkActive(!isLinkActive))}
            >
              <MenuOpenRounded style={{ fontSize: "20px" }} />
            </a>

            <div className="relative flex items-center">
              <span className="absolute pl-3">
                <GridViewRounded style={{ fontSize: "26px" }} />
              </span>
              <select
                className="border py-1 pl-12 text-white border-white bg-darknet flex items-center justify-center text-xs xl:text-sm"
                onClick={() => dispatch(setIsLinkActive(!isLinkActive))}
              >
                <option>Suggestion pour vous</option>
                <option>Année de sortie</option>
                <option>A-Z</option>
                <option>Z-A</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubNavBarTvShowsSuggestion;
