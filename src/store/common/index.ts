/**
 * Common store
 */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import charactersApi from '../../api/charactersApi';
import { IEpisode, ILocation } from '../../interfaces';

type State = {
  locations: ILocation[];
  dimensions: ILocation[];
  episodes: IEpisode[];
  selectedFilter?: { [key: string]: ILocation | IEpisode } | null;
};
const initialState: State = {
  locations: [],
  dimensions: [],
  episodes: [],
  selectedFilter: null,
};

// common thunks
export const filterLocations = createAsyncThunk(
  'common/filterLocations',
  async (params: { [key: string]: string }) => {
    const response = await charactersApi.filterLocations(params);
    return response || [];
  }
);

export const filterDimensions = createAsyncThunk(
  'common/filterDimensions',
  async (params: { [key: string]: string }) => {
    const response = await charactersApi.filterLocations(params);
    return response || [];
  }
);

export const filterEpisodes = createAsyncThunk(
  'common/filterEpisodes',
  async (params: { [key: string]: string }) => {
    const response = await charactersApi.filterEpisodes(params);
    return response || [];
  }
);

// common slice
export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ [key: string]: ILocation | IEpisode }>
    ) => {
      state.selectedFilter = action.payload;
    },
    removeFilter: (state) => {
      state.selectedFilter = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterLocations.fulfilled, (state, { payload }) => {
      state.locations = payload.results;
    });

    builder.addCase(filterDimensions.fulfilled, (state, { payload }) => {
      state.dimensions = payload.results;
    });
    builder.addCase(filterEpisodes.fulfilled, (state, { payload }) => {
      state.episodes = payload.results;
    });
  },
});

// common actions
export const { setFilter, removeFilter } = commonSlice.actions;

export default commonSlice.reducer;
