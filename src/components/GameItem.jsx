import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookmarkIcon } from "@heroicons/react/solid";

import { auth, db } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const GameItem = ({ gameItem }) => {
  const [setSaved] = useState([false]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const game_id = doc(db, "users", `${user?.email}`);

  // const moviesData = movies.slice(0, 10);
  const saveGame = async () => {
    if (user?.email) {
      // setSaved(true);
      await updateDoc(
        game_id,
        {
          savedGames: arrayUnion({
            id: gameItem.id,
            name: gameItem.name,
            img: gameItem.background_image,
          }),
        },
        console.log(gameItem.id)
      );
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div
        key={gameItem.id}
        className="block overflow-hidden rounded-lg shadow-sm bg-zinc-800"
      >
        <img
          className="object-cover w-full h-56"
          src={gameItem.background_image}
          alt=""
        />

        <div className="py-3 px-4 md:p-6 relative space-y-2">
          <h3
            role="button"
            className="text-heading text-sm text-white hover:text-teal-500 sm:text-md font-semibold truncate mb-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            <Link to={`/game/${gameItem.slug}`} className="w-full">
              {" "}
              {gameItem.name}
            </Link>
          </h3>
          <div className="flex flex-row justify-between text-white items-center">
            <dt className="text-sm font-medium">Genre</dt>
            <dd className="flex flex-row gap-x-2 mt-1 text-sm sm:mt-0">
              {gameItem?.parent_platforms?.map((platform) => (
                <span
                  key={platform.platform.id}
                  className="flex justify-center h-8 bg-black p-2 rounded-full"
                >
                  <img
                    src={require(`../assets/${platform.platform.id}.svg`)}
                    alt={platform.platform.name}
                    className="rounded"
                  />
                </span>
              ))}
            </dd>
          </div>
          <button
            type="button"
            onClick={saveGame}
            className="inline-flex w-full justify-center transition-colors duration-300 items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none"
          >
            <BookmarkIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Add to library
          </button>
        </div>
      </div>
    </>
  );
};

export default GameItem;
