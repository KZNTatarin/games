import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [searchInput, setSearchInput] = useState("");
  return (
  
      <header>
        <div>
          <a href="/">PhotoLogo</a>

          <form action="">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search__input"
              type="text"
            />
          </form>
          <Link to={`/searchgame/${searchInput}`}>Find</Link>
        </div>
      </header>
    
  );
}
