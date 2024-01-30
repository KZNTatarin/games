import "./App.css";
import GameItem from "./components/GameItem/GameItem";
import GamesSection from "./components/GamesSection/GamesSection";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScreenShots from "./components/ScreenShotsSection/ScreenShots";
import TagPage from "./components/TagPage/TagPage";
import SearchPage from "./components/SearchPage/SearchPage";

function App() {

  return (
    <>
      
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={ <GamesSection />} /> 
            <Route path="/game/:slug" element={<GameItem />} />  
            <Route path="/game/:slug/screenshots" element={<ScreenShots />} />  
            <Route path="/games/tag/:slug" element={<TagPage  />} />      
            <Route path="/searchgame/:slug" element={<SearchPage  />} />         
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
