import React from "react";
import { useParams } from "react-router-dom";
import { useGameByGenreQuery } from "../services/rawgApi";

import GameItem from "../components/GameItem";

const BrowseResult = () => {
  let { genre_slug } = useParams();
  const { data, error, isLoading, isFetching } = useGameByGenreQuery({
    genre_slug: genre_slug,
  });

  return (
    <div className="max-w-[1760px] mx-auto sm:px-6 lg:px-8 my-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {error ? (
          <div>Error: {error.message}</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : isFetching ? (
          <div>Fetching...</div>
        ) : (
          data.results.map((game) => <GameItem key={game.id} gameItem={game} />)
        )}
      </div>
    </div>
  );
};

export default BrowseResult;
