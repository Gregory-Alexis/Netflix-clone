import { GridViewRounded, MenuOpenRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLinkActive,
  setIsScrolled,
} from "../../../redux/movieSlice/suggestionMovieSlice";

const SubNavBarMovieSuggestion = () => {
  const isScrolled = useSelector(
    (state) => state.suggestionMovieData.isScrolled
  );
  const isLinkActive = useSelector(
    (state) => state.suggestionMovieData.isLinkActive
  );
  const dispatch = useDispatch();

  window.onscroll = () => {
    dispatch(setIsScrolled(window.pageYOffset === 0 ? false : true));
    return () => (window.onscroll = null);
  };

  return (
    <div
      className={
        isScrolled
          ? "subNavbarScrolled scrolledIn bg-darknet"
          : "subNavbar scrolledOut bg-darknet"
      }
    >
      <div className="relative flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-white">MOVIE</h1>
        </div>
        <div className="flex">
          <a
            href="/movie"
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
              className="border py-1 pl-12 text-white border-white bg-darknet flex items-center justify-center text-sm"
              onClick={() => dispatch(setIsLinkActive(!isLinkActive))}
            >
              <option>Suggestion pour vous</option>
              <option>Année de sortie</option>
              <option>A-Z</option>
              <option>Z-A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubNavBarMovieSuggestion;
