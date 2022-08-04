import React from "react";
import { Link } from "react-router-dom";

const GenreCard = ({ genre }) => {
  return (
    <>
      <div className="group h-96 flex items-end bg-gray-100 rounded-lg overflow-hidden shadow-lg relative p-4">
        <img
          src={genre.image_background}
          alt={genre.name}
          className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
        />

        <div className="w-full flex flex-col bg-white/30 backdrop-blur text-center rounded-lg relative p-4">
          <Link to={`/genres/${genre.id}`}>
            <span className="text-zinc-800 text-lg lg:text-xl font-bold hover:text-blue-500">
              {genre.name}
            </span>
          </Link>
          <span className="text-zinc-700 text-sm">
            Total Games: {genre.games_count}
          </span>
          <ul className="flex flex-col">
            {genre.games.slice(0, 3).map((game) => (
              <Link
                className="text-black hover:text-blue-500 hover:font-bold"
                to={`/game/${game.slug}`}
              >
                {game.name}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default GenreCard;
