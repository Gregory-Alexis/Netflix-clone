import { useDispatch } from "react-redux";
import { removeToList } from "../../redux/myListSlice/myListSlice";
import Close from "../../images/close.svg";
import { ArrowDropDown } from "@mui/icons-material";

const MyListItem = ({ id, poster, name }) => {
  const dispatch = useDispatch();
  return (
    <div className="mt-5 h-full w-full mr-5 xl:w-48">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/original${poster}`}
          alt={name}
          className="w-full h-64"
        />
        <div className=" absolute w-full h-full top-0  transition-all duration-200 ease-in-out flex items-center justify-center opacity-0 text-gray-100 hover:opacity-100 hover:bg-gray-500 hover:bg-opacity-70">
          <button
            onClick={() => dispatch(removeToList(id))}
            aria-label="remove to my list"
          >
            <img src={Close} alt="remove" className="absolute top-1 right-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyListItem;
