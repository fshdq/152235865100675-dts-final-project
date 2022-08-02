import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/solid";

const GameItem = ({ gameItem }) => {
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
            className="text-heading text-sm text-white sm:text-md font-semibold truncate mb-2"
          >
            {gameItem.name}
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
            className="inline-flex w-full justify-center transition-colors duration-300 items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none"
          >
            <ShoppingCartIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Add to list
          </button>
        </div>
      </div>
    </>
  );
};

export default GameItem;
