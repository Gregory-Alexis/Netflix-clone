import React from "react";
import NapRowItem from "./NapRowItem";

const NapRow = ({ newFeaturedData }) => {
  return (
    <div className="pt-24">
      {newFeaturedData.map((item) => (
        <NapRowItem title={item.title} url={item.items} />
      ))}
    </div>
  );
};

export default NapRow;
