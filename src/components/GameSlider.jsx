import React from "react";
import GameItem from "./GameItem";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

const GameSlider = (props) => {
  return (
    <div className="w-full flex flex-col py-6">
      <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-2xl leading-6 font-semibold text-white">
            {props.heading}
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-zinc-700 focus:outline-none"
          >
            Show All
          </button>
        </div>
      </div>
      <div className="pt-4">
        <Swiper
          spaceBetween={24}
          slidesPerView={4}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {props.error ? (
            <div>Error: {props.error.message}</div>
          ) : props.isLoading ? (
            <div>Loading...</div>
          ) : (
            props.data.results
              .filter((game) => game.slug !== "millies-adventure")
              .map((game) => (
                <SwiperSlide key={game.id}>
                  <GameItem key={game.id} gameItem={game} />
                </SwiperSlide>
              ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default GameSlider;
