import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/" }),
  endpoints: (builder) => ({
    getFlagsByCountry: builder.query({
      query: (country: string) => `name/${country}?fields=flags,name,altSpellings`,
    }),
  }),
});

export const {
    useGetFlagsByCountryQuery
} = countriesApi;
