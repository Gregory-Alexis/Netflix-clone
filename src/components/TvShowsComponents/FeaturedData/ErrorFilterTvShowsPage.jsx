import { useSelector } from "react-redux";
import ErrorFilterPageCustom from "../../CustomComponents/ErrorFilterPageCustom";

const ErrorFilterTvShowsPage = () => {
  const search = useSelector((state) => state.appData.search);
  return <ErrorFilterPageCustom search={search} />;
};

export default ErrorFilterTvShowsPage;
