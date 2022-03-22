import { useSelector } from "react-redux";
import ErrorFilterPageCustom from "../../CustomComponents/ErrorFilterPageCustom";

const ErrorFilterMoviePage = () => {
  const search = useSelector((state) => state.appData.search);
  return <ErrorFilterPageCustom search={search} />;
};

export default ErrorFilterMoviePage;
