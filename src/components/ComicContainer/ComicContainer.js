import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import md5 from "crypto-js/md5";
import { Link } from "react-router-dom";
import ComicCard from "../ComicCard/ComicCard";
import ShimmerCard from "../../ShimmerUI/ShimmerCard";
import { CircleLoader } from "react-spinners";
import "./ComicContainer.scss";

const ComicContainer = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const comicIds = useRef(new Set());
  const maxAttempts = 5;
  const attempt = useRef(0);

  useEffect(() => {
    const PUBLIC_KEY = '60cfb37eee49438efb47affaf4866fd6';
    const PRIVATE_KEY = 'c9be6c673fe295924d9ec91755bc82f6ba0127eb';
    const TIMESTAMP = '1';
    const HASH = md5(TIMESTAMP + PRIVATE_KEY + PUBLIC_KEY).toString();
    const limit = 40;

    const fetchComics = async (page) => {
      try {
        const response = await axios.get(`https://gateway.marvel.com:443/v1/public/comics`, {
          params: {
            ts: TIMESTAMP,
            apikey: PUBLIC_KEY,
            limit: limit,
            offset: (page - 1) * limit,
            hash: HASH,
          },
        });

        const filteredComics = response.data.data.results.filter(
          comic => !comic.thumbnail.path.includes('image_not_available')
        );

        const uniqueComics = filteredComics.filter(comic => {
          if (comicIds.current.has(comic.id)) {
            return false;
          } else {
            comicIds.current.add(comic.id);
            return true;
          }
        });

        if (uniqueComics.length > 0) {
          setComics((prevComics) => [...prevComics, ...uniqueComics]);
          attempt.current = 0;
        } else {
          attempt.current += 1;
        }
        setLoading(false);
        setLoadingMore(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        setLoadingMore(false);
      }
    };

    if (attempt.current < maxAttempts) {
      fetchComics(page);
    }

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loadingMore) return;
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loadingMore]);

  if (loading) return <div className="flex items-center"><CircleLoader color="rgba(255, 0, 0, 1)" /></div>;
  if (error) return <p>Error loading content: {error.message}</p>;

  return (
    <div className="flex flex-wrap justify-center">
      {comics?.length === 0 ? (
        <ShimmerCard />
      ) : (
        comics.map((comic) => (
          <Link to={"info/" + comic.id} key={comic.id}>
            <ComicCard key={comic.id} info={comic} />
          </Link>
        ))
      )}
      {loadingMore && <div className="container-loading flex items-center justify-center"><CircleLoader color="rgba(255, 0, 0, 1)" /></div>}
    </div>
  );
};

export default ComicContainer;
