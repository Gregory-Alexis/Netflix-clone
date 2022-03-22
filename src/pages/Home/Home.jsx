import { useEffect, useState } from "react";
import MovieRow from "../../components/HomeComponents/MovieRow/MovieRow";
import getHomeList, { getMovieInfo } from "../../dataHomeFetch";
import Loading from "../../components/Loading/Loading";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setFeaturedData,
  setLoading,
} from "../../redux/appSlice/appSlice";
import HomeFeaturedData from "../../components/HomeComponents/HomeFeaturedData/HomeFeaturedData";
import ErrorFilterPage from "../../components/HomeComponents/HomeFeaturedData/ErrorFilterPage";
import NavBarCustom from "../../components/CustomComponents/NavbarCustom";

const Home = () => {
  const search = useSelector((state) => state.appData.search);
  const loading = useSelector((state) => state.appData.loading);
  const error = useSelector((state) => state.appData.error);
  const featuredData = useSelector((state) => state.appData.featuredData);
  const dispatch = useDispatch();
  const [appData, setAppData] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const result = await getHomeList();

        setAppData(result);

        const random = Math.floor(
          Math.random() * result[0].items.data.results.length
        );
        const randomMovie = result[0].items.data.results[random];
        const chosenInfo = await getMovieInfo(randomMovie.id, "tv");

        dispatch(setFeaturedData(chosenInfo.data));

        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const newData = appData.filter((item) => {
    const filteredData = [];
    for (let i = 0; i < appData.length; i++) {
      filteredData.push(item.items.data.results[i].title);
      filteredData.push(item.title);
    }

    return filteredData
      .toString()
      .toLocaleLowerCase()
      .includes(search.toString().toLocaleLowerCase());
  });

  const filterMovie = newData.toString().toLocaleLowerCase();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-darknet">
          {error && (
            <p className="text-white flex justify-center items-center">
              {error}
            </p>
          )}
          <NavBarCustom active="home" />
          {!filterMovie ? (
            <ErrorFilterPage />
          ) : (
            <>
              <HomeFeaturedData featuredData={featuredData} />
              <MovieRow newData={newData} />
            </>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
