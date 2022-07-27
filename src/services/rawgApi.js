import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rawgAPI = createApi({
  reducerPath: "rawgApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.rawg.io/api/",
  }),

  endpoints: (builder) => ({
    Games: builder.query({
      query: () => `games?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    GameById: builder.query({
      query: ({id}) => `games/${id}?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    GameScreenshotById: builder.query({
      query: ({id}) => `games/${id}/screenshots?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    Genres: builder.query({
      query: () => `genres?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    GenreById: builder.query({
      query: ({id}) => `genres/${id}?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    PopularGames: builder.query({
      query: ({page_size}) => `games?dates=2021-01-01,2021-12-31&ordering=-added&page_size=${page_size}&key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
  }),
});

export const {
  useGamesQuery,
  useGameByIdQuery,
  useGenresQuery,
  useGenreByIdQuery,
  usePopularGamesQuery,
  useGameScreenshotByIdQuery,
} = rawgAPI;
