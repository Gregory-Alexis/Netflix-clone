import { GridViewRounded, MenuOpenRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setFilter,
  setIsLinkActive,
  setIsScrolled,
} from "../../../redux/movieSlice/movieSlice";
import { tvShowsId } from "../../../TvShowsIdData";

const SubNavBarMovie = () => {
  const filter = useSelector((state) => state.movieData.filter);
  const isScrolled = useSelector((state) => state.movieData.isScrolled);
  const isLinkActive = useSelector((state) => state.movieData.isLinkActive);
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
        <h1 className="text-4xl font-semibold text-white">MOVIE</h1>

        <div className="flex-1 ml-16">
          <select
            className="bg-darknet bg-opacity-90 text-white flex flex-col flex-wrap border p-2 border-white hover:bg-transparent w-32"
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
          >
            <option value="all" className="bg-darknet">
              Genres
            </option>
            {tvShowsId.map((el) => (
              <option className="my-1 hover:underline bg-darknet" key={el.id}>
                {el.genre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex">
          <a
            href="/movie"
            className="border py-1 px-3 text-white flex items-center justify-center"
            onClick={() => dispatch(setIsLinkActive(!isLinkActive))}
          >
            <MenuOpenRounded style={{ fontSize: "20px" }} />
          </a>
          <Link
            to="/movie-suggestion"
            className="border px-3 text-gray-500 border-gray-500 flex items-center justify-center"
            onClick={() => dispatch(setIsLinkActive(!isLinkActive))}
          >
            <GridViewRounded style={{ fontSize: "18px" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubNavBarMovie;
