import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const SuggestionMoviePageItem = ({ url }) => {
  const [index, setIndex] = useState(0);
  const width = useSelector((state) => state.appData.width);

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
    <div className="overflow-hidden pt-12">
      <div className="relative group">
        <div
          className="flex transition duration-500 ease-in-out pl-3 space-x-2 md:pt-4 md:pl-8 md:space-x-5 lg:space-x-2 xl:space-x-7"
          style={{
            transform: `translateX(${
              width >= 1024 ? index * -100 : index * -98
            }vw )`,
          }}
        >
          {url.data.results.map((el) => (
            <Link
              to={`/movie-details/${el.id}`}
              className="relative"
              key={el.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${el.poster_path}`}
                alt={el.title}
                className="moviePosterStyle mr-32 lg:mr-48 xl:mr-52 "
                width="120"
              />
              <div className="text-2xl absolute w-full h-full top-0 transition-all duration-500 ease-in-out flex justify-center items-center opacity-0 text-gray-100 hover:opacity-100 hover:bg-gray-500 hover:bg-opacity-70">
                View More
              </div>
            </Link>
          ))}
        </div>

        {index > 0 && (
          <button
            type="button"
            aria-label="left slide"
            className="absolute top-0 bottom-0 flex items-center justify-center text-white hover:scale-125 backdrop-brightness-75 opacity-0 group-hover:opacity-100 transition duration-100 ease-in-out"
            onClick={() => indexHandler("left")}
          >
            <ArrowBackIos style={{ fontSize: "30px" }} />
          </button>
        )}

        <button
          type="button"
          aria-label="right slide"
          className="absolute top-0 bottom-0 right-0 flex items-center justify-center text-white hover:scale-125 bg-darknet bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-100 ease-in-out"
          onClick={() => indexHandler("right")}
        >
          <ArrowForwardIos style={{ fontSize: "30px" }} />
        </button>
      </div>
    </div>
  );
};

export default SuggestionMoviePageItem;
