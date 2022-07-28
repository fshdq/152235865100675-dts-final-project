import React from "react";
import { useParams } from "react-router-dom";
import HeaderDetail from "../components/HeaderDetail";
import { PlusCircleIcon } from "@heroicons/react/solid";

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
            <p className="text-white leading-7">{data?.description_raw}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetails;
