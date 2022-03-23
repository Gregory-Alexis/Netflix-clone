import { useEffect, useState } from "react";
import { getMovieInfo } from "../../dataHomeFetch";
import ErrorFilterTvShowsPage from "../../components/TvShowsComponents/FeaturedData/ErrorFilterTvShowsPage";
import TvShowsRow from "../../components/TvShowsComponents/TvShowsRow/TvShowsRow";
import getTvShowsList from "../../dataTvShowsFetch";
import Loading from "../../components/Loading/Loading";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import FeaturedTvShowsData from "../../components/TvShowsComponents/FeaturedData/FeaturedTvShowsData";
import SubNavBarCustom from "../../components/CustomComponents/SubNavBarCustom";
import {
  setError,
  setFeaturedData,
  setLoading,
} from "../../redux/appSlice/appSlice";
import NavbarTvMovieCustom from "../../components/CustomComponents/NavbarTvMovieCustom";

const TvShows = () => {
  const loading = useSelector((state) => state.appData.loading);
  const error = useSelector((state) => state.appData.error);
  const filter = useSelector((state) => state.appData.filter);
  const search = useSelector((state) => state.appData.search);
  const featuredTvShowsData = useSelector(
    (state) => state.appData.featuredData
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
          <NavbarTvMovieCustom active="tv" />
          <SubNavBarCustom title="TV SHOWS" suggestion="tv-suggestion" />
          {featuredTvShowsData.backdrop_path === null && (
            <p className="text-white flex justify-center p-3 mt-24 text-sm md:text-lg lg:text-2xl xl:mt-54 xl:text-4xl">
              Désolé, nous n'avons pas encore cette image dans notre catalogue.
            </p>
          )}
          {!filterMovie ? (
            <ErrorFilterTvShowsPage />
          ) : (
            <>
              <FeaturedTvShowsData featuredTvShowsData={featuredTvShowsData} />
              <TvShowsRow dataFilter={dataFilter} />
            </>
          )}

          <Footer />
        </div>
      )}
    </>
  );
};

export default TvShows;
