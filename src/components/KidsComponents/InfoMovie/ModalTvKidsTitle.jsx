import { ArrowDropDown } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Circle from "../../../images/circle.svg";
import Check from "../../../images/check.svg";
import ThumbUp from "../../../images/thumbs-up.svg";
import ThumbDown from "../../../images/thumbs-down.svg";
import Play from "../../../images/play.svg";
import {
  addToList,
  removeToList,
} from "../../../redux/myListSlice/myListSlice";

const ModalTvKidsTitle = ({ featuredKidsData }) => {
  const dispatch = useDispatch();
  const myList = useSelector((state) => state.myListData.myList);
  const newList = myList.map((element) => {
    return element.id;
  });

  return (
    <div className="absolute mt-24 ml-5 xl:ml-10 xl:mt-56">
      <h1 className="text-white mb-5 text-xl md:text-2xl lg:text-3xl xl:w-40 xl:text-5xl xl:mb-5">
        {featuredKidsData.name}
      </h1>
      <div className="flex">
        <div className="playButtonModal mb-1 xl:py-2">
          <img src={Play} alt="play" className="w-10" />
          <Link to={`/tv-video/${featuredKidsData.id}`}>Play</Link>
        </div>
        <div className="group flex items-center justify-center">
          <div className="relative">
            {newList.includes(featuredKidsData.id) ? (
              <button
                type="button"
                className="iconesStyle ml-1  border-gray-200"
                onClick={() => dispatch(removeToList(featuredKidsData.id))}
              >
                <img src={Check} alt="check" className="w-10 " />
              </button>
            ) : (
              <button
                type="button"
                className="iconesStyle ml-1"
                onClick={() =>
                  dispatch(
                    addToList({
                      poster: featuredKidsData.poster_path,
                      name: featuredKidsData.original_name,
                      id: featuredKidsData.id,
                    })
                  )
                }
              >
                <img src={Circle} alt="circle" className="w-10 " />
              </button>
            )}
          </div>
          <div className="modalIcons text-xs w-56 -top-0 ml-1 xl:text-base xl:top-3 xl:left-18">
            <span>
              {newList.includes(featuredKidsData.id)
                ? "Remove From My List"
                : "Add to My List"}
            </span>
            <span className="absolute left-20 top-1  text-gray-200 flex xl:top-3 xl:left-18">
              <ArrowDropDown style={{ fontSize: "65px" }} />
            </span>
          </div>
        </div>

        <div className="group flex items-center justify-center">
          <div className="relative">
            <button
              type="button"
              className="iconesStyle borderThumbIcons ml-2 mb-2"
            >
              <img src={ThumbUp} alt="circle" className="w-7" />
            </button>
          </div>
          <div className="modalIcons text-xs w-36 -top-0 xl:top-3 xl:left-30 xl:ml-4 xl:w-44 xl:text-base">
            <span>I like this</span>
            <span className="absolute text-gray-200 flex left-8 ml-3 top-1 xl:top-3 xl:left-10">
              <ArrowDropDown style={{ fontSize: "65px" }} />
            </span>
          </div>
        </div>

        <div className="group flex items-center justify-center">
          <div className="relative">
            <button
              type="button"
              className="iconesStyle borderThumbIcons ml-2 mb-2"
            >
              <img src={ThumbDown} alt="circle" className="w-7" />
            </button>
          </div>
          <div className="modalIcons text-xs w-36 -top-0 left-46 ml-2 xl:top-3 xl:ml-4 xl:w-44 xl:text-base">
            <span>Not for me</span>
            <span className="absolute text-gray-200 flex left-8 ml-3 top-1 xl:top-3 xl:left-10">
              <ArrowDropDown style={{ fontSize: "65px" }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTvKidsTitle;
