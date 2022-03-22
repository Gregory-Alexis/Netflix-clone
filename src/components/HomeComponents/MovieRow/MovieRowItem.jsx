import { ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MovieRowItem = ({ title, url }) => {
  const width = useSelector((state) => state.homeData.width);
  const [index, setIndex] = useState(0);

  // fonction qui prendre en charge le "Slide" des éléments en fonction de la taille de la fenêtre windows
  const indexHandler = (direction) => {
    if (direction === "left") {
      setIndex(index > 0 && index - 1);
    } else if (direction === "right" && width < 768) {
      setIndex(index < 6 ? index + 1 : 0);
    } else if (direction === "right" && width >= 768 && width < 1024) {
      setIndex(index < 3 ? index + 1 : 0);
    } else {
      setIndex(index < 2 ? index + 1 : 0);
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="flex group">
        <h1 className="movieRowTitleStyle pl-3 pt-3 md:pt-8 md:pl-8">
          <a href="#top" className="flex items-center justify-center">
            {title}
            <span className="exploreAllStyle">Explore All</span>
            <button
              type="button"
              aria-label="explore all"
              className="arrowForwardStyle"
            >
              <ArrowForwardIos />
            </button>
          </a>
        </h1>
      </div>

      <div className="relative group ">
        {/*style qui prendra en charge la largeur parcouru du slide lors du clique sur la flèche */}
        <div
          className="flex transition duration-500 ease-in-out pl-3 space-x-2 md:pt-4 md:pl-8 md:space-x-5 lg:space-x-2 xl:space-x-7"
          style={{
            transform: `translateX(${
              width >= 1280 ? index * -100 : index * -98
            }vw )`,
          }}
        >
          {/*Redirige vers les détails du film sélectionné */}
          {url.data.results.map((el) => (
            <>
              <Link
                to={`/movie-details/${el.id}`}
                key={el.id}
                className=" relative"
              >
                {/*affiche les poster des films */}
                <img
                  src={`https://image.tmdb.org/t/p/original${el.poster_path}`}
                  alt={el.poster_path}
                  className="moviePosterStyle mr-32 lg:mr-48 xl:mr-52 "
                  width="120"
                  key={el.id}
                />
                {/*View more, redirigera vers une nouvelle page ou vous aurez plus en détails les informations du poster sélectionné */}
                <div className="text-2xl absolute w-full h-full top-0 transition-all duration-500 ease-in-out flex justify-center items-center opacity-0 text-gray-100 hover:opacity-100 hover:bg-gray-500 hover:bg-opacity-70">
                  View More
                </div>
              </Link>
            </>
          ))}
        </div>
        {/*La flêche pour slider vers la gauche ne sera visible que si l'index est supèrieur à 0 "Si la flêche de droite a au moins été cliqué une fois" */}
      </div>
    </div>
  );
};

export default MovieRowItem;
