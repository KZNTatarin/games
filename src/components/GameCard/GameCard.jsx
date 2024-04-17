import windows from "../../images/windows.svg";
import nintendo from "../../images/nintendo.svg";
import playstation from "../../images/playstation.svg";
import xbox from "../../images/xbox.svg";
import { Link } from "react-router-dom";

import "./GameCard.css";
import Loader from "../Loader/Loader";

export default function GameCard({ game }) {
    
  return game ? (
    <Link target="_blank" to={`/game/${game.id}`}>
      <li>
        <div key={game.id} className="game__card">
          <img
            className="game-card__img"
            src={game.background_image}
            alt="PHOTO"
          />
          <div className="game-information">
            <div className="platforms">
              {game.parent_platforms.map((platform) => (
                <div>
                  <p>
                    {platform.platform.name === "PC" ? (
                      <img src={windows} alt="" />
                    ) : (
                      ""
                    )}
                  </p>
                  <p>
                    {platform.platform.name === "PlayStation" ? (
                      <img src={playstation} alt="" />
                    ) : (
                      ""
                    )}
                  </p>
                  <p>
                    {platform.platform.name === "Xbox" ? (
                      <img src={xbox} alt="" />
                    ) : (
                      ""
                    )}
                  </p>
                  <p>
                    {platform.platform.name === "Nintendo" ? (
                      <img src={nintendo} alt="" />
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div
              className={`game-rating 
                      ${
                        game.rating < 3
                          ? "red-rating"
                          : game.rating < 4
                          ? "orange-rating"
                          : "green-rating"
                      }`}
            >
              {game.rating}
            </div>
          </div>
          <div className="game-name">{game.name}</div>
        </div>
      </li>
    </Link>
  ) : (
    <Loader />
  );
}
