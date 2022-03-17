import Play from "../../../images/play.svg";
import Info from "../../../images/info.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setDetails } from "../../../redux/movieSlice/movieSlice";
import ModalMovieInfo from "./ModalMovieInfo";

const InfoMovie = ({ featuredMovieData }) => {
  const details = useSelector((state) => state.movieData.details);
  const dispatch = useDispatch();

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

      <div className=" w-full flex flex-col justify-center ml-5 z-10 xl:ml-24">
        <div>
          <h1 className="movieTitle">{featuredMovieData.title}</h1>
          <div className="flex">
            <Link
              to={`/movie-video/${featuredMovieData.id}`}
              className="playButton pl-5"
            >
              <img src={Play} alt="play" className="xl:w-14" width="28" />
              <span className="ml-2 md:text-2xl xl:text-4xl">Play</span>
            </Link>

            <button type="button" aria-label="more info" className="infoButton">
              <img src={Info} alt="info" className="xl:w-10" width="20" />

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
