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
        <div className="max-w-7xl flex-col mx-auto px-6 lg:px-8 my-10">
          <div className="my-6">
            <HeaderDetail data={data} />
          </div>
          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            <div className="flex-1 gap-x-4 relative z-0 flex overflow-hidden">
              <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                {/* Start main area*/}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="space-y-2 pb-8 md:space-y-5">
                    {/* IMAGE SLIDER */}
                    <div className="h-auto">
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
                                className="rounded w-full sm:h-full object-cover aspect-video"
                                src={screenshot.image}
                                alt={screenshot.id}
                              />
                            </SwiperSlide>
                          ))
                        )}
                      </Swiper>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="space-y-6 py-4">
                    <div class="block">
                      <h3 class="text-lg font-bold mb-2 uppercase text-white">
                        About
                      </h3>
                      <div class="leading-6 text-white">
                        {data?.description_raw}
                      </div>
                    </div>
                    <div class="block">
                      <h3 class="text-lg font-bold mb-2 uppercase text-white">
                        About
                      </h3>
                      <div class="leading-6 text-white">{data?.metacritic}</div>
                    </div>
                  </div>
                </div>
                {/* End main area */}
              </main>
              <aside className="hidden relative xl:flex xl:flex-col flex-shrink-0 w-96 border-l border-gray-200 overflow-y-auto">
                {/* Start secondary column (hidden on smaller screens) */}
                <div className="py-8 px-6 rounded flex flex-col items-center">
                  <div className="py-4 sm:py-5 flex flex-row w-full justify-between sm:gap-4">
                    <dt className="text-sm font-medium text-zinc-500">
                      Platform
                    </dt>
                    <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                      <div className="flex gap-x-2 items-center text-sm text-gray-500">
                        {data?.parent_platforms?.map((platform) => (
                          <span
                            key={platform.platform.id}
                            className="flex justify-center h-8 bg-zinc-700 p-2 rounded-full"
                          >
                            <img
                              src={require(`../assets/${platform.platform.id}.svg`)}
                              alt={platform.platform.name}
                              className="rounded text-gray-500"
                            />
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                  <div className="flex flex-col w-full gap-y-2">
                    <dt className="text-sm font-medium text-zinc-500">
                      Where to buy
                    </dt>
                    <dl className="flex flex-col gap-y-2">
                      {data?.stores?.map((store) => (
                        <button
                          type="button"
                          class="group inline-flex justify-center items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white hover:text-zinc-600 bg-zinc-600 hover:bg-white focus:outline-none"
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
                    </dl>
                  </div>
                </div>
                {/* End secondary column */}
              </aside>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetails;
