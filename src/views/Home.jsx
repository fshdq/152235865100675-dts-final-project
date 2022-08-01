import React from "react";
import FeaturedGame from "../components/FeaturedGame";
import GameSlider from "../components/GameSlider";

import { useNewGamesQuery, useUpcomingGamesQuery } from "../services/rawgApi";

const Home = () => {
  const getCurrentDate = (separator) => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    if (month < 10) {
      month = `0${month}`;
    }

    if (date < 10) {
      date = `0${date}`;
    }

    return `${year}${separator}${month}${separator}${date}`;
  };

  const currentDate = getCurrentDate("-");
  const currentYear = new Date().getFullYear();
  const firstoftheyear = `${currentYear}-01-01`;

  // New Release
  const {
    data: NewReleaseData,
    error,
    isLoading,
  } = useNewGamesQuery({
    page_size: 10,
    lastYear: firstoftheyear,
    currentDate: currentDate,
  });

  // Top Release

  // Coming Soon

  return (
    <div className="max-w-[1760px] mx-auto sm:px-6 lg:px-8 my-10">
      <div className="py-16">
        <div className="px-6 text-white">
          <div className="mb-12 space-y-2">
            <h2 className="text-2xl font-bold md:text-5xl">Best Of The Year</h2>
          </div>
          <FeaturedGame />

          {/* Top Week */}
          <GameSlider
            heading="Top Week"
            data={NewReleaseData}
            error={error}
            isLoading={isLoading}
          />

          {/* New Release */}
          <GameSlider
            heading="New Releases"
            data={NewReleaseData}
            error={error}
            isLoading={isLoading}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            <div className="w-full">Top Release</div>
            <div className="w-full">Coming Soon</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
