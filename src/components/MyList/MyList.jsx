import { useSelector } from "react-redux";
import NavBar from "../HomeComponents/NavBar/NavBar";
import MyListItem from "./MyListItem";
import NavbarMyList from "./NavbarMyList";

const MyList = () => {
  const myList = useSelector((state) => state.myListData.myList);

  return (
    <div className="bg-darknet min-h-screen">
      <NavbarMyList />
      <h1 className="text-white pl-10  pt-24 text-3xl xl:text-4xl">My List</h1>
      <div className="flex pl-10 flex-wrap">
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
