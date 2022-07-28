import React from "react";

const GameItem = ({ gameItem }) => {
  return (
    <>
      <div
        key={gameItem.id}
        className="block overflow-hidden rounded-lg shadow-sm bg-gray-900"
      >
        <img
          className="object-cover w-full h-56"
          src={gameItem.background_image}
          alt=""
        />

        <div className="space-y-3 p-6">
          <h5 className="text-xl font-bold">{gameItem.name}</h5>

          <div className="grid gap-2 grid-cols-4">
            {gameItem.parent_platforms?.map((platform) => (
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
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Rating: {gameItem.rating}
          </p>

          <div className="inline-block pb-1 mt-4 font-medium text-blue-600 border-b border-blue-500 ">
            Find out more
            <span aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameItem;
