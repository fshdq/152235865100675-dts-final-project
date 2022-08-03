import { React, useState } from "react";
import { TrashIcon } from "@heroicons/react/solid";
import { useNavigate, Link } from "react-router-dom";

import { auth, db } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const SavedGame = ({ gameItem, button_name }) => {
  const [games] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const movieRef = doc(db, "users", `${user?.email}`);

  const removeFromFavorite = async (passedID) => {
    try {
      const result = games.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, { favorites: result });
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromLibrary = async (passedID) => {
    try {
      const result = games.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, { savedGames: result });
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromWishlist = async (passedID) => {
    try {
      const result = games.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, { wishlists: result });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        key={gameItem.id}
        className="block overflow-hidden rounded-lg shadow-sm bg-zinc-800"
      >
        <div className="relative">
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
          <>
            {button_name === "Favorite" ? (
              <button
                type="button"
                onClick={() => removeFromFavorite(gameItem.id)}
                className="inline-flex w-full justify-center transition-colors duration-300 items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zinc-600 hover:bg-red-500 focus:outline-none"
              >
                <TrashIcon
                  className="-ml-0.5 mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                Delete from {button_name}
              </button>
            ) : button_name === "Library" ? (
              <button
                type="button"
                onClick={() => removeFromLibrary(gameItem.id)}
                className="inline-flex w-full justify-center transition-colors duration-300 items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zinc-600 hover:bg-red-500 focus:outline-none"
              >
                <TrashIcon
                  className="-ml-0.5 mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                Delete from {button_name}
              </button>
            ) : button_name === "Wishlist" ? (
              <button
                type="button"
                onClick={() => removeFromWishlist(gameItem.id)}
                className="inline-flex w-full justify-center transition-colors duration-300 items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zinc-600 hover:bg-red-500 focus:outline-none"
              >
                <TrashIcon
                  className="-ml-0.5 mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                Delete from {button_name}
              </button>
            ) : null}
          </>
        </div>
      </div>
    </>
  );
};

export default SavedGame;
