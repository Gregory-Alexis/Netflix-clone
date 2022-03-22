import { useSelector } from "react-redux";
import ErrorFilterPageCustom from "../../CustomComponents/ErrorFilterPageCustom";

const ErrorFilterMoviePage = () => {
  const search = useSelector((state) => state.homeData.search);
  return <ErrorFilterPageCustom search={search} />;
};

export default ErrorFilterMoviePage;
