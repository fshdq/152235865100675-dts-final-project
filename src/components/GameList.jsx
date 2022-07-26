import React from "react";
import GameItem from "./GameItem";
import { usePopularGamesQuery } from "../services/rawgApi";

const GameList = () => {
  const { data, error, isLoading } = usePopularGamesQuery({
    page_size: 5
  });

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-4">
        {error ? (
          <div>Error!</div>
        ) : isLoading ? (
          <>Loading data dulu yah ...</>
        ) : (
          data?.results?.map((gameItem) => (
            <GameItem key={gameItem.id} gameItem={gameItem} />
          ))
        )}
      </div>
    </>
  );
};

export default GameList;
