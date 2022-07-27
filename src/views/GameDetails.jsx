import React from "react";
import { useParams } from "react-router-dom";

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
                    <SwiperSlide>
                      <img
                        key={screenshot.id}
                        className="object-cover w-1/2 h-1/2"
                        src={screenshot.image}
                        alt={screenshot.id}
                      />
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </div>
            <div className="space-y-2 pt-6 pb-8 md:space-y-5">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-6xl">
                {data?.name}
              </h1>
              <h3 className="text-base font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl">
                {data?.publishers?.map((publisher) => (
                  <span className="ml-2" key={publisher.id}>
                    {publisher.name}
                  </span>
                ))}
              </h3>
              <div className="flex flex-row gap-x-2">
                <h1>{data?.rating}</h1>
                <h1>tag</h1>
                <h1>genre</h1>
              </div>
            </div>
            <p>{data?.description_raw}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetails;
