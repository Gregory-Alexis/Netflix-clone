import { GridViewRounded, MenuOpenRounded } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setFilter,
  setIsLinkActive,
  setIsScrolled,
} from "../../../redux/tvShowsSlice/tvShowsSlice";
import { tvShowsId } from "../../../TvShowsIdData";

const SubNavBarTvShows = () => {
  const isScrolled = useSelector((state) => state.tvShowsData.isScrolled);
  const isLinkActive = useSelector((state) => state.tvShowsData.isLinkActive);
  const filter = useSelector((state) => state.tvShowsData.filter);
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

        <div className="flex-1 ml-10">
          <select
            className="bg-darknet bg-opacity-90 text-white flex flex-col flex-wrap border p-2 border-white hover:bg-transparent text-xs w-24 lg:text-base xl:w-32"
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
            href="/tv-shows"
            className="border py-1 px-3 text-white flex items-center justify-center"
            onClick={() => dispatch(setIsLinkActive(!isLinkActive))}
          >
            <MenuOpenRounded style={{ fontSize: "20px" }} />
          </a>
          <Link
            to="/tv-suggestion"
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

export default SubNavBarTvShows;
