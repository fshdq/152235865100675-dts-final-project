import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Browse from "./views/Browse";
import GameDetails from "./views/GameDetails";
import "./App.css";
import Navbar from "./components/Navbar";
import BrowseResult from "./views/BrowseResult";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />}>
          <Route path=":genre_slug" element={<BrowseResult />}/>
        </Route>
        <Route path="/game/:slug" element={<GameDetails />} />
      </Routes>
    </>
  );
}

export default App;
