import {
  AddCircleOutline,
  ArrowDropDown,
  Done,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToList,
  removeToList,
} from "../../../redux/myListSlice/myListSlice";

const ModalMovieTitle = ({ featuredMovieData }) => {
  const quantity = useSelector((state) => state.myListData.quantity);
  const dispatch = useDispatch();
  return (
    <div className="absolute mt-72 ml-10">
      <h1 className="text-white text-5xl w-40">{featuredMovieData.title}</h1>
      <div className="flex ">
        <Link
          to={`/movie-video/${featuredMovieData.id}`}
          className="playButtonModal"
        >
          <PlayArrow style={{ fontSize: "50px" }} />
          Play
        </Link>

        <div className="group group flex items-center justify-center">
          <div className="relative">
            {quantity > 0 ? (
              <button
                type="button"
                className="iconesStyle ml-1 border-2 border-gray-200"
                onClick={() => dispatch(removeToList(featuredMovieData.id))}
              >
                <Done style={{ fontSize: "40px" }} />
              </button>
            ) : (
              <button
                type="button"
                className="iconesStyle ml-1"
                onClick={() =>
                  dispatch(
                    addToList({
                      poster: featuredMovieData.poster_path,
                      name: featuredMovieData.original_name,
                      id: featuredMovieData.id,
                    })
                  )
                }
              >
                <AddCircleOutline style={{ fontSize: "50px" }} />
              </button>
            )}
          </div>
          <div className="modalIcons top-0 left-20 ml-2">
            <span>
              {quantity > 0 ? "Remove From My List" : "Add to My List"}
            </span>
            <span className="absolute text-gray-200 flex left-14 ml-3 top-4">
              <ArrowDropDown style={{ fontSize: "65px" }} />
            </span>
          </div>
        </div>

        <div className="group flex items-center justify-center">
          <div className="relative">
            <button type="button" className="iconesStyle borderThumbIcons ml-1">
              <ThumbUpAltOutlined style={{ fontSize: "30px" }} />
            </button>
          </div>
          <div className="modalIcons top-0 left-40">
            <span>I like this</span>
            <span className="absolute text-gray-200 flex left-8 ml-3 top-4">
              <ArrowDropDown style={{ fontSize: "65px" }} />
            </span>
          </div>
        </div>

        <div className="group flex items-center justify-center">
          <div className="relative">
            <button type="button" className="iconesStyle borderThumbIcons ml-2">
              <ThumbDownAltOutlined style={{ fontSize: "30px" }} />
            </button>
          </div>
          <div className="modalIcons top-0 left-50 ml-4">
            <span>Not for me</span>
            <span className="absolute text-gray-200 flex left-10 ml-3 top-4">
              <ArrowDropDown style={{ fontSize: "65px" }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMovieTitle;
