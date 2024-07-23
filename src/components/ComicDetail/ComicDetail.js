import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import md5 from "crypto-js/md5";
import { CircleLoader } from "react-spinners";
import "./ComicDetail.scss";
import Cookies from 'js-cookie';

const ComicDetail = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const PUBLIC_KEY = '60cfb37eee49438efb47affaf4866fd6';
    const PRIVATE_KEY = 'c9be6c673fe295924d9ec91755bc82f6ba0127eb';
    const TIMESTAMP = '1';
    const HASH = md5(TIMESTAMP + PRIVATE_KEY + PUBLIC_KEY).toString();

    const fetchComic = async () => {
      try {
        const response = await axios.get(`https://gateway.marvel.com:443/v1/public/comics/${id}`, {
          params: {
            ts: TIMESTAMP,
            apikey: PUBLIC_KEY,
            hash: HASH,
          },
        });
        setComic(response.data.data.results[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const checkFavorite = async () => {
      const userId = Cookies.get('userId');
      if (userId) {
        try {
          const response = await axios.get(`https://marvel-backend-production-ff25.up.railway.app/favorites/${userId}`);
          const favoriteComics = response.data;
          const isFav = favoriteComics.some(favComic => favComic.comicId === id);
          setIsFavorite(isFav);
        } catch (error) {
          console.error('Error checking favorites:', error);
        }
      }
    };

    fetchComic();
    checkFavorite();
  }, [id]);

  const handleAddToFavorites = async () => {
    const userId = Cookies.get('userId');
    if (!userId) {
      alert('User ID not found');
      return;
    }

    if (isFavorite) {
      try {
        await axios.delete(`https://marvel-backend-production-ff25.up.railway.app/favorites/${userId}/${comic.id}`);
        setIsFavorite(false);
      } catch (error) {
        console.error('Error removing comic from favorites:', error);
      }
    } else {
      const favoriteData = {
        comicId: comic.id,
        imageUrl: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        title: comic.title
      };

      try {
        await axios.post(`https://marvel-backend-production-ff25.up.railway.app/favorites/${userId}`, favoriteData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setIsFavorite(true);
      } catch (error) {
        console.error('Error adding comic to favorites:', error);
      }
    }
  };

  if (loading) return <div className="flex items-center"><CircleLoader color="rgba(255, 0, 0, 1)" /></div>;
  if (error) return <p>Error al cargar el comic: {error.message}</p>;

  return (
    <div className="comic-detail-container">
      {comic && (
        <div className="comic-detail">
          <div className="comic-detail-image">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
          </div>
          <div className="comic-detail-info">
            <h1>{comic.title}</h1>
            <p>{comic.description}</p>
            <p><strong>Precio:</strong> ${comic.prices[0].price}</p>
            <button 
              className="add-to-favorites-button"
              onClick={handleAddToFavorites}
            >
              {isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicDetail;
