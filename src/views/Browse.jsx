import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useGenresQuery } from "../services/rawgApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

const Browse = () => {
  const { data, error, isLoading } = useGenresQuery();
  return (
    <div className="max-w-[1760px] mx-auto sm:px-6 lg:px-8 my-10">
      <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <Swiper
          spaceBetween={12}
          slidesPerView={8}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {error ? (
            <div>Error: {error.message}</div>
          ) : isLoading ? (
            <div>Loading...</div>
          ) : (
            data.results.map((genre) => (
              <SwiperSlide>
                <NavLink
                  key={genre.id}
                  to={`/browse/${genre.slug}`}
                  className={({ isActive }) =>
                    isActive
                      ? "inline-block mr-2 mt-2 p-4 text-white bg-blue-600 hover:bg-blue-800 hover:text-white rounded-t-lg"
                      : "inline-block mr-2 mt-2 p-4 text-zinc-500 bg-zinc-800 hover:bg-blue-600 hover:text-white rounded-t-lg"
                  }
                >
                  {genre.name}
                </NavLink>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
      <Outlet />
    </div>
  );
};

export default Browse;
