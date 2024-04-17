import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [searchInput, setSearchInput] = useState("");
  return (
  
      <header>
        <div>
          <a style={{ color: 'white', padding: '10px 15px', borderRadius: '5px', textDecoration: 'none' }} href="/">LOGO</a>

          <form action="">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search__input"
              type="text"
            />
          </form>
          <Link style={{ color: 'white', border: 'solid 1px white', padding: '10px 15px', borderRadius: '5px', textDecoration: 'none' }} to={`/searchgame/${searchInput}`}>FIND</Link>
        </div>
      </header>
    
  );
}
