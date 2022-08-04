import React from "react";
import { useParams } from "react-router-dom";
import { useGameByGenreQuery, useGenreByIdQuery } from "../../services/rawgApi";
import Loading from "../../components/Loading";

import GameItem from "../../components/GameItem";

const GenreResult = () => {
  let { id } = useParams();
  const { data, error, isLoading, isFetching } = useGameByGenreQuery({
    id: id,
  });
  const {
    data: genreData,
    error: genreError,
    isLoading: genreIsLoading,
  } = useGenreByIdQuery({
    id: id,
  });

  return (
    <div className="max-w-[1760px] mx-auto sm:px-6 lg:px-8 my-10">
      {genreError ? (
        <div>Error: {genreError.message}</div>
      ) : genreIsLoading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-white text-2xl sm:text-4xl font-bold text-center mb-4 md:mb-6">
            {genreData.name}
          </h1>

          <p className="text-zinc-300 sm:text-lg mb-6 md:mb-8">
            {genreData.description}
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {error ? (
          <div>Error: {error.message}</div>
        ) : isLoading ? (
          <Loading />
        ) : isFetching ? (
          <Loading />
        ) : (
          data.results.map((game) => <GameItem key={game.id} gameItem={game} />)
        )}
      </div>
    </div>
  );
};

export default GenreResult;
