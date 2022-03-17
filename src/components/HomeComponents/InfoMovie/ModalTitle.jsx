import { ArrowDropDown } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Circle from "../../../images/circle.svg";
import Check from "../../../images/check.svg";
import ThumbUp from "../../../images/thumbs-up.svg";
import ThumbUpWhite from "../../../images/thumbs-up-white.svg";
import ThumbDown from "../../../images/thumbs-down.svg";
import ThumbDownWhite from "../../../images/thumbs-down-white.svg";
import Play from "../../../images/play.svg";
import {
  addToList,
  removeToList,
} from "../../../redux/myListSlice/myListSlice";
import { setDisLike, setLike } from "../../../redux/homeSlice/homeSlice";

const ModalTitle = ({ featuredData }) => {
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
    <div className="absolute mt-24 ml-5 xl:ml-10 xl:mt-56">
      <h1 className="text-white mb-5 text-xl md:text-2xl lg:text-3xl xl:w-40 xl:text-5xl xl:mb-5">
        {featuredData.name}
      </h1>
      <div className="flex">
        <div className="playButtonModal mb-1 xl:py-2">
          <img src={Play} alt="play" width="28" height="28" />
          {/*Redirige vers un lien vidéo correspondant au film ou à la série sélectionné, si la vidéo n'existe pas, un message apparaîtra */}
          <Link to={`/tv-video/${featuredData.id}`}>Play</Link>
        </div>
        <div className="group flex items-center justify-center">
          {/*Si le tableau "newList" contient déjà l'id du film sélectionné alors, le bouton permettra de supprimer le film en question sinon il l'ajoutera  */}
          <div className="relative">
            {newList.includes(featuredData.id) ? (
              <button
                type="button"
                className="iconesStyle ml-1  border-gray-200"
                onClick={() => dispatch(removeToList(featuredData.id))}
              >
                <img src={Check} alt="check" width="36" height="36" />
              </button>
            ) : (
              <button
                type="button"
                className="iconesStyle ml-1"
                onClick={() =>
                  dispatch(
                    addToList({
                      poster: featuredData.poster_path,
                      name: featuredData.original_name,
                      id: featuredData.id,
                    })
                  )
                }
              >
                <img src={Circle} alt="circle" width="36" height="36" />
              </button>
            )}
          </div>
          <div className="modalIcons text-xs w-56 -top-0 ml-1 xl:text-base xl:top-3 xl:left-18">
            <span>
              {/*Si le tableau "newList" contient déjà l'id du film sélectionné alors, le message "Remove from my list" apparaîtra sinon ce sera "Add to my list" */}
              {newList.includes(featuredData.id)
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
              onClick={likeHandler}
            >
              {/*Si un like est effectué le message "Rated" sera affiché sinon "I like this" sera affiché*/}
              <img
                src={like ? ThumbUpWhite : ThumbUp}
                alt="circle"
                width="24"
              />
            </button>
          </div>
          {/*Si un like est effectué le pouce aura un bacnground blanc sinon il aura un background transparent*/}
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
              className="iconesStyle borderThumbIcons ml-2 mb-2"
              onClick={disLikeHandler}
            >
              {/*Si un like est effectué le pouce aura un background blanc sinon il aura un background transparent*/}
              <img
                src={disLike ? ThumbDownWhite : ThumbDown}
                alt="circle"
                width="24"
              />
            </button>
          </div>
          <div className="modalIcons text-xs w-36 -top-0 left-46 ml-2 xl:top-3 xl:ml-4 xl:w-44 xl:text-base">
            {/*Si un dislike est effectué le message "Rated" sera affiché sinon "Not for me" sera affiché*/}
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

export default ModalTitle;
