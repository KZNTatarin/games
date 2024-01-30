import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GameCard from "../GameCard/GameCard";
import useInput from "../../hooks/useInput";
import FiltresSection from "../Filtres/FiltresSection";
import Loader from "../UI/Loader/Loader";

export default function TagPage() {
  const input = useInput();
  const [games, setGames] = useState("");
  const [page,setPage] = useState(1)

  const { slug } = useParams();
 console.log(slug);

  async function fetchGames() {
    const response = await fetch(`https://api.rawg.io/api/games?tags=${slug}&key=4076163a89ca4d93a368075fbd0bf1d6&page=2`);
    const games = await response.json();
    setGames(games);
    console.log(games);
  }



  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      {games ? (
        <>
          <FiltresSection />
          <h2>Games by tag: {slug[0].toUpperCase() + slug.slice(1)} </h2>
          <section className="games">

            <ul>
              {games.results &&
                games.results
                  .filter((game) =>
                    game.name.toLowerCase().includes(input.value.toLowerCase())
                  )
                  .map((game) => <GameCard game={game} />)}
            </ul>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}