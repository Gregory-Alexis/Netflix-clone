import { useEffect, useState } from "react";
import { getMovieInfo } from "../../dataHomeFetch";
import Loading from "../../components/Loading/Loading";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import getTvKidsList from "../../kidsData";
import NavBarKids from "../../components/KidsComponents/NavBar/NavBarKids";
import TvKidsRow from "../../components/KidsComponents/TvKidsRow/TvKidsRow";
import {
  setError,
  setFeaturedData,
  setLoading,
} from "../../redux/kidsSlice/kidsSlice";
import KidsFeaturedData from "../../components/KidsComponents/KidsFeaturedData/KidsFeaturedData";
import ErrorFilterTvKidsPage from "../../components/KidsComponents/KidsFeaturedData/ErrorFilterTvKidsPage";

const Kids = () => {
  const loading = useSelector((state) => state.kidsData.loading);
  const error = useSelector((state) => state.kidsData.error);
  const search = useSelector((state) => state.kidsData.search);
  const dispatch = useDispatch();
  const featuredKidsData = useSelector(
    (state) => state.kidsData.featuredKidsData
  );
  const [tvKidsData, setTvKidsData] = useState([]);

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

        setTvKidsData(result);

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
          <NavBarKids />
          {!filterMovie ? (
            <ErrorFilterTvKidsPage />
          ) : (
            <>
              <KidsFeaturedData featuredKidsData={featuredKidsData} />
              <TvKidsRow newFeaturedData={newFeaturedData} />
            </>
          )}

          <Footer />
        </div>
      )}
    </>
  );
};

export default Kids;
