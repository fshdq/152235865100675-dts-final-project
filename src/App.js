import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Browse from "./views/Browse";
import GameDetails from "./views/GameDetails";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/games/details/:id">
          <GameDetails />
        </Route>
      </Routes>
    </>
  );
}

export default App;
