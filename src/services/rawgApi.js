import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rawgAPI = createApi({
  reducerPath: "rawgApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.rawg.io/api/",
  }),

  tagTypes: ['Genre', 'Game', 'Platform'],
  endpoints: (builder) => ({
    Games: builder.query({
      query: () => `games?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    GameBySlug: builder.query({
      query: ({slug}) => `games/${slug}?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    GameByGenre: builder.query({
      query: ({genre_slug}) => `games?genres=${genre_slug}&key=${process.env.REACT_APP_RAWG_API_KEY}`,
      providesTags: ['Game'],
    }),
    GameScreenshotById: builder.query({
      query: ({slug}) => `games/${slug}/screenshots?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    Genres: builder.query({
      query: () => `genres?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    GenreById: builder.query({
      query: ({id}) => `genres/${id}?key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    PopularGames: builder.query({
      query: ({page_size, currentYear, currentDate}) => `games?dates=${currentYear},${currentDate}&ordering=-added&page_size=${page_size}&key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    NewGames: builder.query({
      query: ({page_size, lastYear, currentDate}) => `games?dates=${lastYear},${currentDate}&ordering=-released&page_size=${page_size}&key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
    UpcomingGames: builder.query({
      query: ({page_size, currentDate,nextYear}) => `games?dates=${currentDate},${nextYear}&ordering=-released&page_size=${page_size}&key=${process.env.REACT_APP_RAWG_API_KEY}`,
    }),
  }),
});

export const {
  useGamesQuery,
  useGameBySlugQuery,
  useGenresQuery,
  useGenreByIdQuery,
  usePopularGamesQuery,
  useGameScreenshotByIdQuery,
  useNewGamesQuery,
  useUpcomingGamesQuery,
  useGameByGenreQuery,
} = rawgAPI;
