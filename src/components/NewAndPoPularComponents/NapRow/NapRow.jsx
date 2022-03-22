import React from "react";
import NapRowItem from "./NapRowItem";

const NapRow = ({ newFeaturedData }) => {
  return (
    <div className="pt-24">
      {newFeaturedData.map((item) => (
        <NapRowItem title={item.title} url={item.items} key={item.title} />
      ))}
    </div>
  );
};

export default NapRow;
