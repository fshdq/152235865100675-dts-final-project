import { React } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookmarkIcon, HeartIcon, PlusIcon } from "@heroicons/react/solid";

import { auth, db } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const GameItem = ({ gameItem }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const game_id = doc(db, "users", `${user?.email}`);

  // const moviesData = movies.slice(0, 10);
  const saveGame = async () => {
    if (user?.email) {
      await updateDoc(
        game_id,
        {
          savedGames: arrayUnion({
            id: gameItem.id,
            name: gameItem.name,
            slug: gameItem.slug,
            background_image: gameItem.background_image,
          }),
        },
        console.log(gameItem.id)
      );
    } else {
      navigate("/login");
    }
  };
  const addList = async () => {
    if (user?.email) {
      await updateDoc(
        game_id,
        {
          wishlists: arrayUnion({
            id: gameItem.id,
            name: gameItem.name,
            slug: gameItem.slug,
            background_image: gameItem.background_image,
          }),
        },
        console.log(gameItem.id)
      );
    } else {
      navigate("/login");
    }
  };
  const favoriteGame = async () => {
    if (user?.email) {
      // setSaved(true);
      await updateDoc(
        game_id,
        {
          favorites: arrayUnion({
            id: gameItem.id,
            name: gameItem.name,
            slug: gameItem.slug,
            background_image: gameItem.background_image,
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
        <div className="relative">
          <div className="absolute opacity-0 p-1 hover:opacity-100 top-0 right-0 transition-opacity">
            <button
              type="button"
              onClick={favoriteGame}
              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <HeartIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <img
            className="object-cover w-full h-56"
            src={gameItem.background_image}
            alt=""
          />
        </div>

        <div className="py-3 px-4 md:p-6 relative space-y-2">
          <h3
            role="button"
            className="text-heading text-sm text-white hover:text-teal-500 sm:text-md font-semibold truncate mb-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
          >
            <Link to={`/game/${gameItem.slug}`} className="w-full">
              {" "}
              {gameItem.name}
            </Link>
          </h3>
          <div className="flex flex-row justify-between text-white items-center">
            <dt className="text-sm font-medium">Platforms</dt>
            <dd className="flex flex-wrap justify-end gap-x-2 mt-1 text-sm sm:mt-0">
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
          <div className="flex w-full gap-x-1">
            <button
              type="button"
              onClick={saveGame}
              className="inline-flex w-full justify-center transition-colors duration-300 items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none"
            >
              <BookmarkIcon
                className="h-4 w-4"
                aria-hidden="true"
              />
              Add to library
            </button>
            <button
              type="button"
              onClick={addList}
              className="flex flex-shrink justify-center transition-colors duration-300 items-center px-3 py-2 border border-zinc-600 shadow-sm text-sm leading-4 font-medium rounded-md text-white hover:text-zinc-600 hover:bg-white focus:outline-none"
            >
              <PlusIcon
                className="h-4 w-4"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameItem;
