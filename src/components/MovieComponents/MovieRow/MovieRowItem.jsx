import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

const MovieRowItem = ({ title, url }) => {
  const [index, setIndex] = useState(0);

  const indexHandler = (direction) => {
    if (direction === "left") {
      setIndex(index > 0 ? index - 1 : 2);
    } else {
      setIndex(index < 2 ? index + 1 : 0);
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="flex pb-5 group">
        <h1 className="movieRowTitleStyle pl-12">
          <a href="!#" className="flex items-center justify-center pt-12">
            {title}
            <span className="exploreAllStyle">Explore All</span>
            <button type="button" className="arrowForwardStyle">
              <ArrowForwardIos />
            </button>
          </a>
        </h1>
      </div>

      <div className="relative group">
        <div
          className="flex transition duration-500 ease-in-out pl-12"
          style={{ transform: `translateX(${index * -58}vw )` }}
        >
          {url.data.results.map((el) => (
            <Link to={`/movie-video/${el.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300${el.poster_path}`}
                alt={el.original_title}
                className="moviePosterStyle mr-52"
                key={el.id}
              />
            </Link>
          ))}
        </div>

        {index > 0 && (
          <button
            type="button"
            aria-label="clique gauche"
            className="absolute top-0 bottom-0 flex items-center justify-center text-white hover:scale-125 backdrop-brightness-75 opacity-0 group-hover:opacity-100 transition duration-100 ease-in-out"
            onClick={() => indexHandler("left")}
          >
            <ArrowBackIos style={{ fontSize: "30px" }} />
          </button>
        )}

        <button
          type="button"
          aria-label="clique droit"
          className="absolute top-0 bottom-0 right-0 flex items-center justify-center text-white hover:scale-125 bg-darknet bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-100 ease-in-out"
          onClick={() => indexHandler("right")}
        >
          <ArrowForwardIos style={{ fontSize: "30px" }} />
        </button>
      </div>
    </div>
  );
};

export default MovieRowItem;
