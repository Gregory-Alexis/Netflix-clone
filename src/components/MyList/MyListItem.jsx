import { useDispatch } from "react-redux";
import { removeToList } from "../../redux/myListSlice/myListSlice";

const MyListItem = ({ id, poster, name }) => {
  const dispatch = useDispatch();
  return (
    <div className="mt-5 h-full mr-5 relative xl:w-48">
      <button type="button" onClick={() => dispatch(removeToList(id))}>
        <img
          src={`https://image.tmdb.org/t/p/original${poster}`}
          alt={name}
          width="160"
        />
        <div className=" absolute w-full h-full top-0 transition-all duration-200 ease-in-out flex items-center opacity-0 text-gray-100 hover:opacity-100 hover:bg-gray-500 hover:bg-opacity-70">
          Remove from my List
        </div>
      </button>
    </div>
  );
};

export default MyListItem;
