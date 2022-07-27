import React from "react";

const GameItemMini = ({ gameItem }) => {
  return (
    <div className="p-2 flex flex-col gap-x-2 items-start bg-transparent rounded-lg md:flex-row md:max-w-xl hover:bg-gray-50 hover:text-gray-600">
      <img
        className="object-cover rounded select-none w-32"
        src={gameItem.background_image}
        alt={gameItem.name}
      />
      <div className="flex flex-col justify-between leading-normal">
        <h5 className="flex-grow text-sm text-left font-bold">
          {gameItem.name}
        </h5>
        <div className="md:text-shadow mb-1.5 md:text-xs">
          {gameItem.genres?.map((genre) => (
            <span key={genre.id} className="inline-block mr-1">
              {genre.name} &middot;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameItemMini;
