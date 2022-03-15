import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setFeaturedDetails } from "../../../redux/kidsSlice/kidsSlice";
import ModalTvKidsInfo from "./ModalTvKidsInfo";

const InfoTvKids = ({ featuredKidsData }) => {
  const details = useSelector((state) => state.kidsData.featuredDetails);
  const dispatch = useDispatch();

  return (
    <div
      className="h-90 relative bg-cover bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredKidsData.backdrop_path})`,
      }}
    >
      <div
        style={{
          background: "linear-gradient(to top, #141414 10%, transparent 20%)",
        }}
        className="absolute w-full h-full mt-24"
      ></div>
      <ModalTvKidsInfo featuredKidsData={featuredKidsData} />
      <div className="w-full h-full flex flex-col justify-center ml-24 z-10">
        <h1 className="movieTitle">{featuredKidsData.original_name}</h1>
        <div className="flex">
          <Link to={`/tv-video/${featuredKidsData.id}`} className="playButton">
            <PlayArrow style={{ fontSize: "50px" }} />
            Play
          </Link>

          <button type="button" aria-label="plus d'info" className="infoButton">
            <svg className="w-10 h-10">
              <InfoOutlined />
            </svg>
            <span
              className="text-2xl px-4 font-semibold"
              onClick={() => dispatch(setFeaturedDetails(!details))}
            >
              More Info
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoTvKids;
