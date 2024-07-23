import React from "react";
import './ComicCardFavorite.scss';

const ComicCardFavorite = ({ info }) => {
  return (
    <div className="p-2 w-72 mb-2">
      <img
        className="thumbnail rounded-xl hover:opacity-60 transition-opacity duration-300"
        src={`${info.imageUrl}`}
        alt="thumails"  
      />
      <ul>
        <li className="font-bold py-2 text-gray text-ellipsis overflow-hidden">{info?.snippet?.title}</li>
        <li>{info?.title}</li>
      </ul>
    </div>
  );
};

export default ComicCardFavorite;
