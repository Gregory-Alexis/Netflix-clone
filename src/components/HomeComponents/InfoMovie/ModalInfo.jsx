import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeaturedDetails } from "../../../redux/homeSlice/homeSlice";
import ModalTitle from "./ModalTitle";

const ModelInfo = ({ featuredData }) => {
  const featuredDetails = useSelector(
    (state) => state.homeData.featuredDetails
  );

  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (featuredDetails && ref.current && !ref.current.contains(e.target)) {
        dispatch(setFeaturedDetails(false));
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [featuredDetails, dispatch]);

  return (
    <>
      {featuredDetails && (
        <div
          data-aos="fade-zoom-in "
          // baisse la clarté du fond lors lors de l'ouverture de la modal en cliquant sur "More Info" ====> voir index.css
          className="modal backDrop"
          style={{
            background: "linear-gradient(to top, #141414 10%, transparent 20%)",
          }}
        >
          <div ref={ref} className="mx-5">
            <div className="flex items-center">
              <ModalTitle featuredData={featuredData} />
              <img
                src={`https://image.tmdb.org/t/p/original${featuredData.backdrop_path}`}
                alt={featuredData.original_title}
                className="xl:w-40 rounded-t-xl"
              />
            </div>

            <div className="p-5 xl:p-10 flex bg-darknet flex-col xl:w-40">
              <div className="flex items-center">
                <p className="text-green-400 text-sm md:text-lg">
                  {featuredData.vote_average} Points
                </p>
                <p className="text-gray-300 pl-3 pr-3 text-sm md:text-lg">
                  {featuredData.first_air_date.slice(0, 4)}
                </p>
                <p className="text-gray-300  border border-gray-500 px-1 text-xs md:text-lg">
                  Age+
                </p>
                <p className="text-gray-300 pl-3 text-sm md:text-lg">
                  {featuredData.number_of_seasons}
                  <span className="pl-1">
                    {featuredData.number_of_seasons > 1 ? "Seasons" : "Season"}
                  </span>
                </p>
                <p className="border border-gray-500 text-gray-300 text-xs ml-3 px-2 rounded">
                  HD
                </p>
              </div>
              <div className="flex justify-between">
                <p className=" text-gray-300 pt-4 leading-6 w-3/4 text-xs md:text-lg">
                  {featuredData.overview === ""
                    ? `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sint quidem harum cupiditate a accusamus cum pariatur
                      eaque, odit provident commodi veritatis praesentium libero
                      sit, repudiandae dolorum impedit sequi illum corrupti.`
                    : featuredData.overview}
                </p>
                <ul className="text-gray-300 pt-4 flex">
                  <span className="text-gray-500 text-sm md:text-base">
                    Genre:
                  </span>
                  <div>
                    {featuredData.genres.map((el) => (
                      <li className="ml-3 text-sm md:text-base" key={el.id}>
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

export default ModelInfo;
