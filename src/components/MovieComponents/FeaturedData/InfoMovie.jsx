import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setDetails } from "../../../redux/movieSlice/movieSlice";
import ModalMovieInfo from "./ModalMovieInfo";

const InfoMovie = ({ featuredMovieData }) => {
  const details = useSelector((state) => state.movieData.details);
  const dispatch = useDispatch();
  console.log(featuredMovieData);
  return (
    <div
      className="h-60 relative bg-cover bg-no-repeat flex items-center justify-center md:h-96 lg:h-70 xl:h-90"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovieData.backdrop_path})`,
      }}
    >
      <div
        style={{
          background: "linear-gradient(to top, #141414 10%, transparent 20%)",
        }}
        className="w-full h-full mt-24 absolute"
      ></div>

      <ModalMovieInfo featuredMovieData={featuredMovieData} />

      <div className=" w-full flex flex-col justify-center px-3 z-10 md:px-8 xl:ml-24">
        <div className="pt-20">
          <h1 className="movieTitle">{featuredMovieData.title}</h1>
          <div className="flex">
            <Link
              to={`/tv-video/${featuredMovieData.id}`}
              className="playButton pl-5"
            >
              <PlayArrow style={{ fontSize: "30px" }} />
              <span className="ml-2 md:text-2xl xl:text-4xl">Play</span>
            </Link>

            <button
              type="button"
              aria-label="plus d'info"
              className="infoButton"
            >
              <InfoOutlined style={{ fontSize: "30px" }} />

              <span
                className="pl-4 font-semibold xl:text-4xl xl:py-2"
                onClick={() => dispatch(setDetails(!details))}
              >
                More Info
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoMovie;
