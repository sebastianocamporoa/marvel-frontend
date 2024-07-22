import React from "react";
import './ComicCard.scss';

const ComicCard = ({ info }) => {
  console.log(info)
  return (
    <div className="p-2 w-72 mb-2">
      <img
        className="thumbnail rounded-xl hover:opacity-60 transition-opacity duration-300"
        src={`${info.thumbnail.path}.${info.thumbnail.extension}`}
        alt="thumails"  
      />
      <ul>
        <li className="font-bold py-2 text-gray text-ellipsis overflow-hidden">{info?.snippet?.title}</li>
        <li>{info?.channelTitle}</li>
      </ul>
    </div>
  );
};

export default ComicCard;
