import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import GameCard from "../GameCard/GameCard";
import useInput from "../../hooks/useInput";
import FiltresSection from "../Filtres/FiltresSection";
import Loader from "../UI/Loader/Loader";

import "./GamesSection.css";

export default function TagPage() {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const uniqueGameIds = useRef(new Set());

  async function fetchGames() {
    setLoading(true);
    const response = await fetch(
      `https://api.rawg.io/api/games?key=4076163a89ca4d93a368075fbd0bf1d6&page=${currentPage}`
    );
    const gamesData = await response.json();
    const filteredGames = gamesData.results.filter(
      (game) => !uniqueGameIds.current.has(game.id)
    );

    setGames((prevGames) => [...prevGames, ...filteredGames]);

    gamesData.results.forEach((game) => uniqueGameIds.current.add(game.id));

    setLoading(false);
  }

  useEffect(() => {
    fetchGames();
  }, [currentPage]);

  const handleObserver = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <>
      <FiltresSection />
      <section className="games">
        <ul>
          {games.map((game, index) => (
            <div key={index}>
              <GameCard game={game} key={game.id} />
              {index === games.length - 1 && <div ref={handleObserver}></div>}
            </div>
          ))}
        </ul>
        {loading && <Loader />}
      </section>
    </>
  );
}
