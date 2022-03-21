import { useEffect, useState } from "react";
import { getMovieInfo } from "../../dataMovieFetch";
import Loading from "../../components/Loading/Loading";
import NavBarMovie from "../../components/MovieComponents/NavBar/NavBarMovie";
import InfoMovie from "../../components/MovieComponents/FeaturedData/InfoMovie";
import MovieRow from "../../components/MovieComponents/MovieRow/MovieRow";
import ErrorFilterMoviePage from "../../components/MovieComponents/FeaturedData/ErrorMovieFilterPage";
import getMovieList from "../../dataMovieFetch";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setFeaturedMovieData,
  setLoading,
} from "../../redux/movieSlice/movieSlice";

const Movie = () => {
  const loading = useSelector((state) => state.movieData.loading);
  const error = useSelector((state) => state.movieData.error);
  const search = useSelector((state) => state.movieData.search);
  const filter = useSelector((state) => state.movieData.filter);
  const featuredMovieData = useSelector(
    (state) => state.movieData.featuredMovieData
  );
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

        dispatch(setFeaturedMovieData(chosenInfo.data));

        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const filterMovie = newFeaturedData.toString().toLocaleLowerCase();

  return (
    <div className="bg-darknet min-h-screen">
      {loading && <Loading />}
      {error && (
        <p className="text-white flex justify-center items-center">{error}</p>
      )}
      <NavBarMovie />
      {!filterMovie ? (
        <ErrorFilterMoviePage search={search} />
      ) : (
        <>
          <InfoMovie featuredMovieData={featuredMovieData} />
          <MovieRow dataFilter={dataFilter} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Movie;
