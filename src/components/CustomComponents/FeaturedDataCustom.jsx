import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFeaturedDetails } from "../../redux/appSlice/appSlice";
import Play from "../../images/play.svg";
import Info from "../../images/info.svg";
import ModalInfo from "./ModalInfoCustom";

const FeaturedDataCustom = ({ props, link }) => {
  const dispatch = useDispatch();
  const featuredDetails = useSelector((state) => state.appData.featuredDetails);

  return (
    <div
      className="h-60 relative bg-cover bg-no-repeat flex items-center justify-center  md:h-96 lg:h-70 xl:h-90"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.backdrop_path})`,
      }}
    >
      <div
        style={{
          background: "linear-gradient(to top, #141414 10%, transparent 20%)",
        }}
        className="w-full h-full mt-24 absolute"
      ></div>
      {/*Le Component Modal ouvre une fenêtre qui affiche les informations du film ou série lorsque le bouton "More Info" est cliqué */}

      <div className="w-full flex flex-col justify-center ml-5 z-10 mt-24 md:mt-48 lg:mt-72 xl:ml-24">
        <div>
          <h1 className="movieTitle">{props.name}</h1>
          <div className="flex">
            {/*Redirige vers un lien vidéo du poster cliqué */}
            <Link to={`/${link}/${props.id}`} className="playButton pl-5">
              <img
                src={Play}
                alt="play"
                className="xl:w-14"
                width="24"
                height="24"
              />
              <span className="ml-2 md:text-2xl xl:text-4xl">Play</span>
            </Link>
            <ModalInfo props={props} link={link} />
            <button
              type="button"
              aria-label="plus d'info"
              className="infoButton"
            >
              <img
                src={Info}
                alt="info"
                className="xl:w-10"
                width="16"
                height="16"
              />

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

export default FeaturedDataCustom;
