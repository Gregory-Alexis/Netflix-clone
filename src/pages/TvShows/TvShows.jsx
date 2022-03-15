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
  setLoading,
  setTvShowsData,
} from "../../redux/tvShowsSlice/tvShowsSlice";

const TvShows = () => {
  const tvShowsData = useSelector((state) => state.tvShowsData.data);
  const loading = useSelector((state) => state.tvShowsData.loading);
  const error = useSelector((state) => state.tvShowsData.error);
  const filter = useSelector((state) => state.tvShowsData.filter);
  const search = useSelector((state) => state.tvShowsData.search);
  const [featuredTvShowsData, setFeaturedTvShowsData] = useState([]);

  const dispatch = useDispatch();

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

        dispatch(setTvShowsData(result));

        const id = Math.floor(Math.random() * result.length);

        const random = Math.floor(
          Math.random() * result[id].items.data.results.length
        );
        const randomMovie = result[id].items.data.results[random];
        const chosenInfo = await getMovieInfo(randomMovie.id, "tv");

        setFeaturedTvShowsData(chosenInfo.data);
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
