import { React, useState, useEffect } from "react";
import SavedGame from "../../components/SavedGame";

import { db, auth } from "../../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const MyFavorite = () => {
  const [games, setGames] = useState([]);
  const [user] = useAuthState(auth);

  const savedGameId = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    onSnapshot(savedGameId, (doc) => {
      setGames(doc.data()?.favorites);
    });
  }, [savedGameId]);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {games?.length === 0 ? (
        <div className="text-center col-span-4">
          <h1 className="text-2xl font-bold text-white">No games you liked</h1>
        </div>
      ) : (
        games?.map((game) => <SavedGame key={game.id} gameItem={game} button_name="Favorite"/>)
      )}
    </div>
  );
};

export default MyFavorite;
