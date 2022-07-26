import React from "react";

const GameItem = ({ gameItem }) => {
  return (
    <>
      <div key={gameItem.id} className="block overflow-hidden rounded-lg shadow-sm bg-gray-900">
        <img
          className="object-cover w-full h-56"
          src={gameItem.background_image}
          alt=""
        />

        <div className="p-6">
          <h5 className="text-xl font-bold">
            {gameItem.name}
          </h5>

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
