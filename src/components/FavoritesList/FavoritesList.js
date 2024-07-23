import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ShimmerCard from "../../ShimmerUI/ShimmerCard";
import { CircleLoader } from "react-spinners";
import "./FavoritesList.scss";
import Cookies from 'js-cookie';
import ComicCardFavorite from "./ComicCardFavorite";

const FavoritesList = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = Cookies.get('userId');
      if (!userId) {
        setError(new Error('User ID not found in cookies'));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://marvel-backend-production-ff25.up.railway.app/favorites/${userId}`);
        setComics(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen"><CircleLoader color="rgba(255, 0, 0, 1)" /></div>;
  if (error) return <p>Error al cargar contenido: {error.message}</p>;

  return (
    <div className="w-5/6 flex items-center justify-center">
      <div className="flex flex-wrap justify-center">
        {comics?.length === 0 ? (
          <ShimmerCard />
        ) : (
          comics.map((comic) => (
            <Link to={"info/" + comic.comicId} key={comic.comicId}>
              <ComicCardFavorite key={comic.comicId} info={comic} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
