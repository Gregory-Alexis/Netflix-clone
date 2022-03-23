import { useEffect, useState } from "react";
import { getMovieInfo } from "../../dataMovieFetch";
import Loading from "../../components/Loading/Loading";
import MovieRow from "../../components/MovieComponents/MovieRow/MovieRow";
import ErrorFilterMoviePage from "../../components/MovieComponents/FeaturedData/ErrorMovieFilterPage";
import getMovieList from "../../dataMovieFetch";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import MovieFeaturedData from "../../components/MovieComponents/FeaturedData/MovieFeaturedData";
import SubNavBarCustom from "../../components/CustomComponents/SubNavBarCustom";
import {
  setError,
  setFeaturedData,
  setLoading,
} from "../../redux/appSlice/appSlice";
import NavbarTvMovieCustom from "../../components/CustomComponents/NavbarTvMovieCustom";

const Movie = () => {
  const loading = useSelector((state) => state.appData.loading);
  const error = useSelector((state) => state.appData.error);
  const search = useSelector((state) => state.appData.search);
  const filter = useSelector((state) => state.appData.filter);
  const featuredMovieData = useSelector((state) => state.appData.featuredData);

  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState([]);

  const newFeaturedData = movieData.filter((item) => {
    const filteredMovie = [];

    for (let i = 0; i < movieData.length; i++) {
      filteredMovie.push(item.items.data.results[i].title);
      filteredMovie.push(item.title);
    }

    return filteredMovie
      .toString()
      .toLowerCase()
      .includes(search.toString().toLowerCase());
  });

  const dataFilter = newFeaturedData.filter((item) => {
    if (filter === "all") {
      return true;
    }
    return item.title.includes(filter);
  });

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const result = await getMovieList();

        setMovieData(result);

        const id = Math.floor(Math.random() * result.length);

        const random = Math.floor(
          Math.random() * result[id].items.data.results.length
        );
        const randomMovie = result[id].items.data.results[random];
        const chosenInfo = await getMovieInfo(randomMovie.id, "movie");

        dispatch(setFeaturedData(chosenInfo.data));

        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const filterMovie = newFeaturedData.toString().toLocaleLowerCase();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-darknet min-h-screen">
          {error && (
            <p className="text-white flex justify-center items-center">
              {error}
            </p>
          )}
          <NavbarTvMovieCustom active="movies" />
          <SubNavBarCustom title="MOVIE" suggestion="movie-suggestion" />
          {!filterMovie ? (
            <ErrorFilterMoviePage search={search} />
          ) : (
            <>
              <MovieFeaturedData featuredMovieData={featuredMovieData} />
              <MovieRow dataFilter={dataFilter} />
            </>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Movie;
