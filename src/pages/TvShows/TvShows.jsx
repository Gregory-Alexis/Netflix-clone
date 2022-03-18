import { useEffect, useState } from "react";
import { getMovieInfo } from "../../dataHomeFetch";
import ErrorFilterTvShowsPage from "../../components/TvShowsComponents/FeaturedData/ErrorFilterTvShowsPage";
import InfoTvShows from "../../components/TvShowsComponents/FeaturedData/InfoTvShows";
import NavBarTvShows from "../../components/TvShowsComponents/NavBar/NavBarTvShows";
import TvShowsRow from "../../components/TvShowsComponents/TvShowsRow/TvShowsRow";
import getTvShowsList from "../../dataTvShowsFetch";
import Loading from "../../components/Loading/Loading";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setFeaturedTvShowsData,
  setLoading,
} from "../../redux/tvShowsSlice/tvShowsSlice";

const TvShows = () => {
  const loading = useSelector((state) => state.tvShowsData.loading);
  const error = useSelector((state) => state.tvShowsData.error);
  const filter = useSelector((state) => state.tvShowsData.filter);
  const search = useSelector((state) => state.tvShowsData.search);
  const featuredTvShowsData = useSelector(
    (state) => state.tvShowsData.featuredTvShowsData
  );
  const dispatch = useDispatch();

  const [tvShowsData, setTvShowsData] = useState([]);

  const newFeaturedData = tvShowsData.filter((item) => {
    const filteredTvShow = [];
    for (let i = 0; i < tvShowsData.length; i++) {
      filteredTvShow.push(item.items.data.results[i].name);
      filteredTvShow.push(item.title);
    }

    return filteredTvShow
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
        const result = await getTvShowsList();

        setTvShowsData(result);

        const id = Math.floor(Math.random() * result.length);

        const random = Math.floor(
          Math.random() * result[id].items.data.results.length
        );
        const randomMovie = result[id].items.data.results[random];
        const chosenInfo = await getMovieInfo(randomMovie.id, "tv");

        dispatch(setFeaturedTvShowsData(chosenInfo.data));

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
      <NavBarTvShows />
      {featuredTvShowsData.backdrop_path === null && (
        <p className="text-white flex justify-center p-3 mt-24 text-sm md:text-lg lg:text-2xl xl:mt-54 xl:text-4xl">
          Désolé, nous n'avons pas encore cette image dans notre catalogue.
        </p>
      )}
      {!filterMovie ? (
        <ErrorFilterTvShowsPage />
      ) : (
        <>
          <InfoTvShows featuredTvShowsData={featuredTvShowsData} />
          <TvShowsRow dataFilter={dataFilter} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default TvShows;
