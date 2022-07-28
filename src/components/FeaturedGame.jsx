import React from "react";
import { Link } from "react-router-dom";
import GameItemMini from "./GameItemMini";
import FeaturedGameImage from "./FeaturedGameImage";
import { usePopularGamesQuery } from "../services/rawgApi";

const GameList = () => {
  const { data, error, isLoading } = usePopularGamesQuery({
    page_size: 8,
  });

  return (
    <div className="flex flex-row gap-x-4">
      <div id="featuredImage" className="w-8/12">
        {error ? (
          <div>Error: {error.message}</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          <Link to={`/game/details/${data?.results?.[0].id}`}>
            <FeaturedGameImage featuredGame={data?.results?.[0]} />
          </Link>
        )}
      </div>
      <div className="w-4/12 flex flex-col max-w-sm gap-y-2">
        {error ? (
          <div>Error!</div>
        ) : isLoading ? (
          <>Loading data dulu yah ...</>
        ) : (
          data?.results?.map(
            (gameItem, index) =>
              index >= 1 && (
              <GameItemMini key={gameItem.id} gameItem={gameItem} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default GameList;
