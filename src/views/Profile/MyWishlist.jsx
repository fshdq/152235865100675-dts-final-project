import { React, useState, useEffect } from "react";
import GameItem from "../../components/GameItem";

import { db, auth } from "../../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const MyWishlist = () => {
  const [games, setGames] = useState([]);
  const [user] = useAuthState(auth);

  const savedGameId = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    onSnapshot(savedGameId, (doc) => {
      setGames(doc.data()?.wishlist);
    });
  }, [savedGameId]);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {games?.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">No games in your wishlist</h1>
        </div>
      ) : (
        games?.map((game) => <GameItem key={game.id} gameItem={game} />)
      )}
    </div>
  );
};

export default MyWishlist;
