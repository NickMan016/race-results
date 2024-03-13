import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const f1InfoApi = createApi({
  reducerPath: "f1InfoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://race-results-api.onrender.com/api/" }),
  endpoints: (builder) => ({
    getInfoTeam: builder.query({
      query: (constructorId: string) => `teams/${constructorId}`,
    }),
  }),
});

export const {
    useLazyGetInfoTeamQuery
} = f1InfoApi;