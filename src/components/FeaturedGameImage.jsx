import React from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";

const FeaturedGameImage = ({ featuredGame }) => {
  return (
    <>
      <div className="relative h-full rounded-2xl">
        <div className="rounded-2xl absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 md:from-black/40 to-transparent"></div>
        <div className="h-full">
          <img
            className="h-full object-cover rounded-2xl"
            loading="lazy"
            src={featuredGame.background_image}
            alt={featuredGame.name}
          />
        </div>

        <div className="absolute bottom-8 left-5 md:left-8 text-sm  md:font-bold w-[80%] md:w-[40%]">
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
          <div className="flex flex-col gap-1 mt-6 md:text-shadow md:flex-row">
            <span className="">Starting at</span>
            <span>IDR price</span>
          </div>
          <div className="items-center hidden h-12 gap-2 mt-3 md:flex">
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Buy Now
            </button>
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-200 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
