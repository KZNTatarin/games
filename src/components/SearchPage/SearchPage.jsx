import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import GameCard from "../GameCard/GameCard";
import useInput from "../../hooks/useInput";
import FiltresSection from "../Filtres/FiltresSection";
import Loader from "../UI/Loader/Loader";

export default function TagPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { slug } = useParams();
  const loader = useRef(null);
  const uniqueGameIds = useRef(new Set());

  async function fetchGames() {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?search=${slug}&key=4076163a89ca4d93a368075fbd0bf1d6&page=${page}`
      );
      const newGames = await response.json();
      if (newGames.results.length === 0) {
        setHasMore(false);
        return;
      }
      
      const filteredGames = newGames.results.filter(game => !uniqueGameIds.current.has(game.id));
      setGames((prevGames) => [...prevGames, ...filteredGames]);
      filteredGames.forEach(game => uniqueGameIds.current.add(game.id));
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [slug, page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, hasMore]);

  return (
    <>
      <FiltresSection />
      <section className="games">
        <ul>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ul>
        {loading && <Loader />}
        {!loading && !hasMore && <div>No more games to load.</div>}
        <div ref={loader} style={{ height: "10px", visibility: "hidden" }} />
      </section>
    </>
  );
}
