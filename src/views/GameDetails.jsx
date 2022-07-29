import React from "react";
import { useParams } from "react-router-dom";
import HeaderDetail from "../components/HeaderDetail";
import { BookmarkIcon } from "@heroicons/react/solid";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import {
  useGameByIdQuery,
  useGameScreenshotByIdQuery,
} from "../services/rawgApi";

const GameDetails = () => {
  let { gameId } = useParams();
  const { data, error, isLoading } = useGameByIdQuery({
    id: gameId,
  });

  const {
    data: screenshotData,
    error: screenshotError,
    isLoading: screenshotIsLoading,
  } = useGameScreenshotByIdQuery({
    id: gameId,
  });
  console.log("gameid= ", gameId);
  return (
    <>
      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 my-10">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="space-y-2 pt-6 pb-8 md:space-y-5">
              <HeaderDetail data={data} />

              {/* IMAGE SLIDER */}
              <div className="h-[540px] bg-gray-300">
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {screenshotError ? (
                    <div>Error: {screenshotError.message}</div>
                  ) : screenshotIsLoading ? (
                    <div>Loading...</div>
                  ) : (
                    screenshotData?.results?.map((screenshot) => (
                      <SwiperSlide key={screenshot.id}>
                        <img
                          className="object-cover w-1/2 h-1/2"
                          src={screenshot.image}
                          alt={screenshot.id}
                        />
                      </SwiperSlide>
                    ))
                  )}
                </Swiper>
              </div>
            </div>

            <div className="flex flex-row justify-between rounded-xl border bg-slate-700 p-8">
              <h1>Where to buy: </h1>
              <div className="flex gap-x-2">
                <div className="flex gap-x-2 items-center">
                  {data?.stores?.map((store) => (
                    <button
                      type="button"
                      class="group inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white hover:text-slate-600 bg-slate-600 hover:bg-white focus:outline-none"
                    >
                      <use
                        className="h-6 w-6 text-black"
                        xlinkHref={require(`../assets/stores/${store.store.name}.svg#img`)}
                      ></use>
                      {/* <img
                        src={require(`../assets/stores/${store.store.name}.svg`)}
                        alt={store.store.name}
                        className="rounded-full h-8 w-8 text-white group-hover:text-black"
                      /> */}
                      <span className="ml-2">{store.store.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-6 py-4">
              <div class="block">
                <h3 class="text-lg font-bold mb-2 uppercase text-white">
                  About
                </h3>
                <div class="leading-6 text-white">{data?.description_raw}</div>
              </div>
              <div class="block">
                <h3 class="text-lg font-bold mb-2 uppercase text-white">
                  About
                </h3>
                <div class="leading-6 text-white">{data?.metacritic}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetails;
