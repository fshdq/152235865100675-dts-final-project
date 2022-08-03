import { React, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { auth, db } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const FeaturedGameImage = ({ featuredGame }) => {
  const [setSaved] = useState([false]);
  const [user] = useAuthState(auth);

  const gameId = doc(db, "users", `${user?.email}`);
  const saveGames = async () => {
    if (user?.email) {
      // setSaved(true);
      await updateDoc(
        gameId,
        {
          savedGames: arrayUnion({
            id: featuredGame.id,
            title: featuredGame.name,
            img: featuredGame.background_image,
          }),
        },
        console.log("game saved", featuredGame.id)
      );
    } else {
      alert("Please log in to save a movie");
    }
  };
  return (
    <>
      <div className="relative h-full rounded-2xl">
        <Link to={`/game/${featuredGame.slug}`}>
          <div className="rounded-2xl absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 md:from-black/40 to-transparent"></div>
          <div className="h-full">
            <img
              className="h-full object-cover rounded-2xl"
              loading="lazy"
              src={featuredGame.background_image}
              alt={featuredGame.name}
            />
          </div>
        </Link>

        <div className="absolute bottom-8 left-5 md:left-8 text-sm  md:font-bold">
          <div className="md:text-shadow mb-1.5 uppercase md:text-xs">
            {featuredGame.genres?.map((genre) => (
              <span key={genre.id} className="inline-block mr-1">
                {genre.name} &middot;
              </span>
            ))}
          </div>
          <p className="font-bold md:text-3xl md:text-shadow">
            {featuredGame.name}
          </p>
          <div className="items-center hidden gap-2 mt-3 md:flex md:flex-row md:flex-wrap">
            <button
              type="button"
              onClick={saveGames}
              className="inline-flex items-center px-6 py-3 z-50 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-200 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircleIcon
                className="-ml-1 mr-3 h-5 w-5"
                aria-hidden="true"
              />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedGameImage;
