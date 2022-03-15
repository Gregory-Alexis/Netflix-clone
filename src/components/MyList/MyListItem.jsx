import { useDispatch } from "react-redux";
import { removeToList } from "../../redux/myListSlice/myListSlice";

const MyListItem = ({ id, poster, name }) => {
  const dispatch = useDispatch();
  return (
    <div className=" mt-16 moviePosterStyle scale:text-gray-500">
      <button type="button" onClick={() => dispatch(removeToList(id))}>
        <img src={`https://image.tmdb.org/t/p/w300${poster}`} alt={name} />
      </button>
    </div>
  );
};

export default MyListItem;
