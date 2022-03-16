import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFeaturedDetails } from "../../../redux/homeSlice/homeSlice";
import ModalInfo from "./ModalInfo";
import Play from "../../../images/play.svg";
import Info from "../../../images/info.svg";

const InfoMovie = ({ featuredData }) => {
  const featuredDetails = useSelector(
    (state) => state.homeData.featuredDetails
  );
  const dispatch = useDispatch();

  return (
    // Composant qui affiche l'image d'un film ou d'une série de manière aléatoire
    <div
      className="h-60 relative bg-cover bg-no-repeat flex items-center justify-center md:h-96 lg:h-70 xl:h-90"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredData.backdrop_path})`,
      }}
    >
      <div
        style={{
          background: "linear-gradient(to top, #141414 10%, transparent 20%)",
        }}
        className="w-full h-full mt-24 absolute"
      ></div>

      <ModalInfo featuredData={featuredData} />

      <div className="w-full flex flex-col justify-center ml-5 z-10 xl:ml-24">
        <div>
          <h1 className="movieTitle">{featuredData.name}</h1>
          <div className="flex">
            <Link
              to={`/tv-video/${featuredData.id}`}
              className="playButton pl-5"
            >
              <img src={Play} alt="play" className="w-8 xl:w-14" />
              <span className="ml-2 md:text-2xl xl:text-4xl">Play</span>
            </Link>

            <button
              type="button"
              aria-label="plus d'info"
              className="infoButton"
            >
              <img src={Info} alt="info" className="xl:w-10" />

              <span
                className="pl-4 font-semibold xl:text-4xl xl:py-2"
                onClick={() => dispatch(setFeaturedDetails(!featuredDetails))}
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
