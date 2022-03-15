import React from "react";
const SuggestionMoviePageItem = ({ url, title }) => {
  return (
    <div className="overflow-hidden pt-12 mr-10">
      <div>
        <div className="flex transition duration-500 ease-in-out pl-12">
          {url.data.results.map((el) => (
            <img
              src={`https://image.tmdb.org/t/p/w300${el.poster_path}`}
              alt={el.original_title}
              className="moviePosterStyle flex"
              key={el.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionMoviePageItem;
