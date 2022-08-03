import React from "react";
import { Link } from "react-router-dom";
import GameItemMini from "./GameItemMini";
import FeaturedGameImage from "./FeaturedGameImage";
import { usePopularGamesQuery } from "../services/rawgApi";
import Loading from "./Loading";
const GameList = () => {
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
  const { data, error, isLoading } = usePopularGamesQuery({
    page_size: 8,
    currentYear: firstoftheyear,
    currentDate: currentDate,
  });

  return (
    <div className="flex flex-row gap-x-4">
      <div id="featuredImage" className="w-8/12">
        {error ? (
          <div>Error: {error.message}</div>
        ) : isLoading ? (
          <Loading />
        ) : (
          <FeaturedGameImage featuredGame={data?.results?.[0]} />
        )}
      </div>
      <div className="w-4/12 flex flex-col max-w-sm gap-y-2">
        {error ? (
          <div>Error!</div>
        ) : isLoading ? (
          <Loading />
        ) : (
          data?.results?.map(
            (gameItem, index) =>
              index >= 1 && (
                <Link to={`/game/${gameItem.slug}`}>
                  <GameItemMini key={gameItem.id} gameItem={gameItem} />
                </Link>
              )
          )
        )}
      </div>
    </div>
  );
};

export default GameList;
