import React from "react";
import { useGenresQuery } from "../../services/rawgApi";
import Loading from "../../components/Loading";
import GenreCard from "../../components/GenreCard";

const Genres = () => {
  const { data, error, isLoading, isFetching } = useGenresQuery();

  return (
    <div className="max-w-[1760px] mx-auto sm:px-6 lg:px-8 my-10">
      <h2 className="text-white text-2xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
        All Genres
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {error ? (
          <div>Error: {error.message}</div>
        ) : isLoading ? (
          <Loading />
        ) : isFetching ? (
          <Loading />
        ) : (
          data.results.map((genre) => (
            <div>
              <GenreCard key={genre.id} genre={genre} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Genres;
