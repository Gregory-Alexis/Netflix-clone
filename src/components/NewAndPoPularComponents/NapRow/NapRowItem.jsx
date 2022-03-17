import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NapRowItem = ({ title, url }) => {
  const [index, setIndex] = useState(0);
  const width = useSelector((state) => state.homeData.width);

  const indexHandler = (direction) => {
    if (direction === "left") {
      setIndex(index > 0 && index - 1);
    } else if (direction === "right" && width < 768) {
      setIndex(index < 6 ? index + 1 : 0);
    } else if (direction === "right" && width >= 768 && width < 1024) {
      setIndex(index < 6 ? index + 1 : 0);
    } else {
      setIndex(index < 2 ? index + 1 : 0);
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="flex group">
        <h1 className="movieRowTitleStyle pl-3 pt-3 md:pt-8 md:pl-8">
          <a href="!#" className="flex items-center justify-center">
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
          className="flex transition duration-500 ease-in-out space-x-2 pl-3 md:pt-4 md:pl-8 md:space-x-10 lg:space-x-2 xl:space-x-4"
          style={{
            transform: `translateX(${
              width >= 1024 ? index * -59 : index * -98
            }vw )`,
          }}
        >
          {url.data.results.map((el) => (
            <Link to={`/movie-video/${el.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/original${el.poster_path}`}
                alt={el.original_title}
                className="moviePosterStyle mr-32 xl:mr-48"
                key={el.id}
                width="120"
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

export default NapRowItem;
