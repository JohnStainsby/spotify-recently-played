import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({
      baseUrl: `https://api.spotify.com/v1`,
      prepareHeaders: (headers) => {
         let token = window.localStorage.getItem('spotify_token');
         headers.set('authorization', `Bearer ${token}`);
         return headers;
      },
   }),
   endpoints: (builder) => ({
      // GET requests
      getRecentlyPlayed: builder.query({
         query: () => `me/player/recently-played`,
      }),
   }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRecentlyPlayedQuery } = api;
