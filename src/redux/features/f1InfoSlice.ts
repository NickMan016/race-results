import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { f1Api, f1InfoApi } from "../services";
import { RootState } from "../store";
import { InfoTeam } from "../../types";

export interface infoState {
  infoTeam: InfoTeam | undefined;
  loadInfoTeam: boolean;
}

const initialState: infoState = {
  infoTeam: undefined,
  loadInfoTeam: false,
};

export const f1InfoSlice = createSlice({
  name: "f1Info",
  initialState,
  reducers: {
    changeNotInfoTeam: (state, _) => {
      state.infoTeam = undefined;
      state.loadInfoTeam = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(f1Api.endpoints.getDriverResults.matchPending, (state, _) => {
        state.loadInfoTeam = false;
        state.infoTeam = undefined;
      })
      .addMatcher(f1InfoApi.endpoints.getInfoTeam.matchPending, (state, _) => {
        state.loadInfoTeam = false;
        state.infoTeam = undefined;
      })
      .addMatcher(
        f1InfoApi.endpoints.getInfoTeam.matchFulfilled,
        (state, action: PayloadAction<InfoTeam>) => {
          state.loadInfoTeam = true;
          state.infoTeam = action.payload;
        }
      );
  },
});

export const f1InfoReducer = f1InfoSlice.reducer;

export const { changeNotInfoTeam } = f1InfoSlice.actions;

export const selectInfoTeam = (state: RootState) => state.f1Info.infoTeam;
export const selectLoadInfoTeam = (state: RootState) =>
  state.f1Info.loadInfoTeam;
