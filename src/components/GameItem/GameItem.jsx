import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from '../UI/Loader/Loader'

import "./GameItem.css";

export default function GameItem() {
  const [game, setGame] = useState();
  const { slug } = useParams();

  async function fetchGames() {
    const response = await fetch(
      `https://api.rawg.io/api/games/${slug}?key=4076163a89ca4d93a368075fbd0bf1d6`
    );
    const game = await response.json();
    setGame(game);
  }
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      {game ? (
        <section className="game-item__page">
          <>
            <div className="game-item__content">
              <div className="game-header">
                <h1>{game?.name}</h1>
                <img className="game-img" src={game.background_image} alt="" />
                <br />
                <Link
                  className="screenshots-link"
                  target=""
                  to={`/game/${game.slug}/screenshots`}
                >
                  Games screenshots
                </Link>
              </div>
              <div className="game-descripion">{game.description_raw}</div>
              <h2>DETAILS</h2>
              <div className="game-details">
                <div className="game-details__left">
                  <div className="game-platforms">
                    Platforms:{" "}
                    {game.platforms.map((platform) => (
                      <Link key={platform.platform.id}>
                        {" "}
                        {platform.platform.name}
                      </Link>
                    ))}
                  </div>

                  <div className="game-metacritic">
                    Metascore:{" "}
                    <span
                      className={`metascore ${
                        game.metacritic < 50
                          ? "red-rating"
                          : game.metacritic < 75
                          ? "yellow-rating"
                          : "green-rating"
                      }`}
                    >
                      {game.metacritic}
                    </span>
                  </div>

                  <div className="game-released">
                    Release date:{" "}
                    <span style={{ color: "white" }}>{game.released}</span>
                  </div>
                </div>
                <div className="game-details__right">
                  <div className="game-publisher">
                    Publishers:{" "}
                    {game.publishers.map((publisher) => (
                      <Link key={publisher.id}>{publisher.name}</Link>
                    ))}
                  </div>

                  <div className="game-tags">
                    Tags:{" "}
                    {game.tags.map((tag) => (
                      <Link to={`/games/tag/${tag.slug}`} key={tag.id}>{tag.name}, </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
