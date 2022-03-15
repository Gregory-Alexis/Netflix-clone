import { useEffect, useRef } from "react";
import { setDetails } from "../../../redux/movieSlice/movieSlice";
import ModalMovieTitle from "./ModalMovieTitle";

const ModalMovieInfo = ({ featuredMovieData, details, dispatch }) => {
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (details && ref.current && !ref.current.contains(e.target)) {
        dispatch(setDetails(false));
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [details, dispatch]);

  return (
    <>
      {details && (
        <div
          data-aos="fade-zoom-in"
          // baisse la clarté du fond lors lors de l'ouverture de la modal en cliquant sur "More Info" ====> voir index.css
          className="backDrop"
          style={{
            background: "linear-gradient(to top, #141414 10%, transparent 20%)",
          }}
        >
          <div ref={ref}>
            <div className="flex items-center">
              <ModalMovieTitle featuredMovieData={featuredMovieData} />
              <img
                src={`https://image.tmdb.org/t/p/original${featuredMovieData.backdrop_path}`}
                alt={featuredMovieData.original_title}
                className="w-40 rounded-t-xl"
              />
            </div>

            <div className="p-10 flex bg-darknet flex-col w-40">
              <div className="flex items-center  ">
                <p className="text-green-400">
                  {featuredMovieData.vote_average} Points
                </p>
                <p className="text-gray-300 pl-3 pr-3">
                  {featuredMovieData.release_date.slice(0, 4)}
                </p>
                <p className="text-gray-300  border border-gray-500 px-1 text-sm">
                  Age+
                </p>
                <p className="border border-gray-500 text-gray-300 text-xs ml-3 px-2 rounded">
                  HD
                </p>
              </div>
              <div className="flex  justify-between">
                <p className="w-20 text-gray-300 pt-4 leading-6">
                  {featuredMovieData.overview === ""
                    ? `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sint quidem harum cupiditate a accusamus cum pariatur
                      eaque, odit provident commodi veritatis praesentium libero
                      sit, repudiandae dolorum impedit sequi illum corrupti.`
                    : featuredMovieData.overview}
                </p>
                <ul className="text-gray-300 pt-4 flex">
                  <span className="text-gray-500">Genre:</span>
                  <div>
                    {featuredMovieData.genres.map((el) => (
                      <li className="ml-3" key={el.id}>
                        {el.name.replace(" ", " ")}
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalMovieInfo;
