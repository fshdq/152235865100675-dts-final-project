import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rawgAPI = createApi({
  reducerPath: "rawgApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.rawg.io/api/",
  }),

  endpoints: (builder) => ({
    Games: builder.query({
      query: ({ordering}) => `games?ordering=${ordering}&key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    GameById: builder.query({
      query: (id) => `games/${id}?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    Genres: builder.query({
      query: `genres?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    GenreById: builder.query({
      query: (id) => `genres/${id}?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    PopularGames: builder.query({
      query: `games?date=2021-01-01,2021-12-31&ordering=-added_at&page_size=10&key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
  }),
});

export const {
  useGamesQuery,
  useGameByIdQuery,
  useGenresQuery,
  useGenreByIdQuery,
  usePopularGamesQuery,
} = rawgAPI;
