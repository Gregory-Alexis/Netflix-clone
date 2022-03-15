import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setDetails } from "../../../redux/movieSlice/movieSlice";
import ModalMovieInfo from "./ModalMovieInfo";

const InfoMovie = ({ featuredMovieData }) => {
  const details = useSelector((state) => state.movieData.details);
  const dispatch = useDispatch();

  return (
    <div
      className="h-90 relative bg-cover bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovieData.backdrop_path})`,
      }}
    >
      <div
        style={{
          background: "linear-gradient(to top, #141414 10%, transparent 20%)",
        }}
        className="absolute w-full h-full mt-24"
      ></div>
      <ModalMovieInfo
        featuredMovieData={featuredMovieData}
        details={details}
        dispatch={dispatch}
      />
      <div className="w-full h-full flex flex-col justify-center ml-24 z-10">
        <h1 className="movieTitle">{featuredMovieData.original_title}</h1>
        <div className="flex">
          <Link
            to={`/movie-video/${featuredMovieData.id}`}
            className="font-semibold playButton px-8"
          >
            <svg className="w-14 h-16">
              <PlayArrow />
            </svg>
            Play
          </Link>

          <button type="button" aria-label="plus d'info" className="infoButton">
            <svg className="w-10 h-10">
              <InfoOutlined />
            </svg>
            <span
              className="text-2xl px-4 font-semibold"
              onClick={() => dispatch(setDetails(!details))}
            >
              More Info
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoMovie;
