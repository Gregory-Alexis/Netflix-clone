import { useSelector } from "react-redux";
import ErrorFilterPageCustom from "../../CustomComponents/ErrorFilterPageCustom";

const ErrorFilterPage = () => {
  const search = useSelector((state) => state.homeData.search);
  return <ErrorFilterPageCustom search={search} />;
};

export default ErrorFilterPage;
