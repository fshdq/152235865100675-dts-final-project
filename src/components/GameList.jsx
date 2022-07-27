import React from "react";
import GameItem from "./GameItem";
import FeaturedGameImage from "./FeaturedGameImage";
import { usePopularGamesQuery } from "../services/rawgApi";

const GameList = () => {
  const { data, error, isLoading } = usePopularGamesQuery({
    page_size: 5,
  });

  return (
    <>
      <div id="featuredImage">
        {error ? (
          <div>Error: {error.message}</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          <FeaturedGameImage featuredGame={data?.results?.[0]} />
        )}
      </div>
      <div className="grid max-w-lg gap-8 mx-auto mt-12 lg:grid-cols-2 lg:max-w-none">
        {error ? (
          <div>Error!</div>
        ) : isLoading ? (
          <>Loading data dulu yah ...</>
        ) : (
          data?.results?.map(
            (gameItem, index) =>
              index >= 1 && <GameItem key={gameItem.id} gameItem={gameItem} />
          )
        )}
      </div>
    </>
  );
};

export default GameList;
