import { ArrowDropDown } from "@mui/icons-material";
import Circle from "../../../images/circle.svg";
import Check from "../../../images/check.svg";
import ThumbUp from "../../../images/thumbs-up.svg";
import ThumbUpWhite from "../../../images/thumbs-up-white.svg";
import ThumbDown from "../../../images/thumbs-down.svg";
import ThumbDownWhite from "../../../images/thumbs-down-white.svg";
import Play from "../../../images/play.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToList,
  removeToList,
} from "../../../redux/myListSlice/myListSlice";
import { setDisLike, setLike } from "../../../redux/homeSlice/homeSlice";

const ModalTvShowsTitle = ({ featuredTvShowsData }) => {
  const dispatch = useDispatch();
  const like = useSelector((state) => state.homeData.like);
  const disLike = useSelector((state) => state.homeData.disLike);
  const myList = useSelector((state) => state.myListData.myList);
  const newList = myList.map((element) => {
    return element.id;
  });

  /* Lors du clique sur le bouton, like passera à true ou false selon son état actuel.Si "like = true" alors le bouton dislike passera à false ce qui
     nous empêchera d'avoir les boutons activé simultanément... Un seul d'entre eux ne peut être actif à la fois.
  */
  const likeHandler = () => {
    dispatch(setLike(!like));
    dispatch(setDisLike(false));
  };

  const disLikeHandler = () => {
    dispatch(setDisLike(!disLike));
    dispatch(setLike(false));
  };

  return (
    <div className="absolute mt-24 ml-5 md:mt-72 xl:ml-10 xl:mt-56">
      <h1 className="text-white mb-5 text-xl md:text-2xl lg:text-3xl xl:w-40 xl:text-5xl xl:mb-5">
        {/*Titre du film ou série */}
        {featuredTvShowsData.name}
      </h1>
      <div className="flex">
        <div className="playButtonModal mb-1 xl:py-2">
          <img src={Play} alt="play" width="28" />
          {/*Redirige vers une la vidéo de la série sélectionné */}
          <Link to={`/tv-video/${featuredTvShowsData.id}`}>Play</Link>
        </div>
        <div className="group flex items-center justify-center">
          <div className="relative">
            {newList.includes(featuredTvShowsData.id) ? (
              /*Bouton qui supprime votre film ou série du tableau "My List", si l'id est déjà présent dans le tableau un bouton suprimé s'affichera sinon un bouton ajouter */
              <button
                type="button"
                aria-label="remove to my list"
                className="iconesStyle ml-1  border-gray-200"
                onClick={() => dispatch(removeToList(featuredTvShowsData.id))}
              >
                <img src={Check} alt="check" width="36" />
              </button>
            ) : (
              /*Bouton qui ajoute votre film ou série dans le tableau "My List" */
              <button
                type="button"
                aria-label="add to my list"
                className="iconesStyle ml-1"
                onClick={() =>
                  dispatch(
                    addToList({
                      poster: featuredTvShowsData.poster_path,
                      name: featuredTvShowsData.original_name,
                      id: featuredTvShowsData.id,
                    })
                  )
                }
              >
                <img src={Circle} alt="circle" width="36" />
              </button>
            )}
          </div>
          <div className="modalIcons text-xs w-56 -top-0 ml-1 xl:text-base xl:top-3 xl:left-18 xl:w-64">
            <span>
              {/*Si l'id et déjà présent, le texte "Remove from my list" sera affiché, sinon "Add to my list" */}
              {newList.includes(featuredTvShowsData.id)
                ? "Remove From My List"
                : "Add to My List"}
            </span>
            <span className="absolute left-20 top-1  text-gray-200 flex xl:top-3 xl:left-24">
              <ArrowDropDown style={{ fontSize: "65px" }} />
            </span>
          </div>
        </div>

        <div className="group flex items-center justify-center">
          <div className="relative">
            <button
              type="button"
              aria-label="like"
              className="iconesStyle borderThumbIcons ml-2 mb-2"
              onClick={likeHandler}
            >
              {/*Si le film ou série est liké, alors le pouce aura un background color blanc sinon son background sera transparent */}
              <img
                src={like ? ThumbUpWhite : ThumbUp}
                alt="circle"
                width="24"
              />
            </button>
          </div>
          {/*Si le film ou série est liké, alors le texte "rated" sera affiché sinon ce sera "I like this" */}
          <div className="modalIcons text-xs w-36 -top-0 xl:top-3 xl:left-30 xl:ml-4 xl:w-44 xl:text-base">
            {like ? <span>Rated</span> : <span>I like this</span>}
            <span className="absolute text-gray-200 flex left-8 ml-3 top-1 xl:top-3 xl:left-10">
              <ArrowDropDown style={{ fontSize: "65px" }} />
            </span>
          </div>
        </div>

        <div className="group flex items-center justify-center">
          <div className="relative">
            <button
              type="button"
              aria-label="dislike"
              className="iconesStyle borderThumbIcons ml-2 mb-2"
              onClick={disLikeHandler}
            >
              {/*Si le film ou série est disliké, alors le pouce aura un background color blanc sinon son background sera transparent */}
              <img
                src={disLike ? ThumbDownWhite : ThumbDown}
                alt="circle"
                width="24"
              />
            </button>
          </div>
          {/*Si le film ou série est disliké, alors le texte "rated" sera affiché sinon ce sera "Not for me" */}
          <div className="modalIcons text-xs w-36 -top-0 left-46 ml-2 xl:top-3 xl:ml-4 xl:w-44 xl:text-base">
            {disLike ? <span>Rated</span> : <span>Not for me</span>}
            <span className="absolute text-gray-200 flex left-8 ml-3 top-1 xl:top-3 xl:left-10">
              <ArrowDropDown style={{ fontSize: "65px" }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTvShowsTitle;
