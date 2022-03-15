import { useEffect, useState } from "react";
import { getMovieInfo } from "../../dataHomeFetch";
import Loading from "../../components/Loading/Loading";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";

import getTvKidsList from "../../kidsData";
import NavBarKids from "../../components/KidsComponents/NavBar/NavBarKids";
import InfoTvKids from "../../components/KidsComponents/InfoMovie/InfoTvKids";
import TvKidsRow from "../../components/KidsComponents/TvKidsRow/TvKidsRow";
import ErrorTvKidsPage from "../../components/KidsComponents/InfoMovie/ErrorTvKidsPage";
import {
  setError,
  setKidsData,
  setLoading,
} from "../../redux/kidsSlice/kidsSlice";

const Kids = () => {
  const tvKidsData = useSelector((state) => state.kidsData.kidsData);
  const loading = useSelector((state) => state.kidsData.loading);
  const error = useSelector((state) => state.kidsData.error);
  const search = useSelector((state) => state.kidsData.search);
  const [featuredKidsData, setFeaturedKidsData] = useState([]);
  const dispatch = useDispatch();

  const newFeaturedData = tvKidsData.filter((item) => {
    const filteredTvShow = [];
    for (let i = 0; i < tvKidsData.length; i++) {
      filteredTvShow.push(item.items.data.results[i].name);
      filteredTvShow.push(item.title);
    }

    return filteredTvShow
      .toString()
      .toLowerCase()
      .includes(search.toString().toLowerCase());
  });

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const result = await getTvKidsList();

        dispatch(setKidsData(result));

        const id = Math.floor(Math.random() * result.length);

        const random = Math.floor(
          Math.random() * result[id].items.data.results.length
        );
        const randomMovie = result[id].items.data.results[random];
        const chosenInfo = await getMovieInfo(randomMovie.id, "tv");

        setFeaturedKidsData(chosenInfo.data);
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
      <NavBarKids />
      {!filterMovie ? (
        <ErrorTvKidsPage />
      ) : (
        <>
          <InfoTvKids featuredKidsData={featuredKidsData} />
          <TvKidsRow newFeaturedData={newFeaturedData} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Kids;
