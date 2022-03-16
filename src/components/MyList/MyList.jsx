import { useSelector } from "react-redux";
import NavBar from "../HomeComponents/NavBar/NavBar";
import MyListItem from "./MyListItem";

const MyList = () => {
  const myList = useSelector((state) => state.myListData.myList);

  return (
    <div className="bg-darknet">
      <NavBar />
      <h1 className="text-white pl-10 text-4xl pt-24">My List</h1>
      <div className="h-screen flex flex-wrap pl-10">
        {myList.map((item) => (
          <MyListItem
            id={item.id}
            key={item.id}
            poster={item.poster}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default MyList;
