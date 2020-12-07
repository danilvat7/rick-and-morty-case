/**
 * Characters store
 */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import charactersApi from '../../api/charactersApi';
import { IEpisode, IPagination, ICharacter } from '../../interfaces';
import { getIdsInUrls, getQueryParam } from '../../helpers/index';

export type CharactersState = {
  characters: ICharacter[];
  charactersPagination: IPagination;
  character?: ICharacter | null;
  characterEpisodes: IEpisode[];
};
const initialPaginationState = {
  count: 0,
  pages: 1,
  page: 1,
  prev: '',
  next: '',
};
const initialState: CharactersState = {
  characters: [],
  charactersPagination: initialPaginationState,
  character: null,
  characterEpisodes: [],
};

// Characters thunks
export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page?: number) => {
    const response = await charactersApi.fetchCharacters(page);
    return response;
  }
);

export const fetchCharacterById = createAsyncThunk(
  'characters/fetchCharacter',
  async (id: number) => {
    const character = await charactersApi.fetchCharacterById(id);
    const characterEpisodes = await charactersApi.fetchMultipleEpisodes(
      getIdsInUrls(character.episode)
    );
    return { character, characterEpisodes };
  }
);

export const fetchMultipleCharacters = createAsyncThunk(
  'characters/fetchMultipleCharacters',
  async (ids: string) => {
    const response = ids?.length
      ? await charactersApi.fetchMultipleCharacters(ids)
      : [];
    return response;
  }
);

export const fetchMultipleEpisodes = createAsyncThunk(
  'characters/fetchMultipleEpisodes',
  async (ids: string) => {
    const response = await charactersApi.fetchMultipleEpisodes(ids);
    return response;
  }
);

// characters slice
export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacter: (state, action: PayloadAction<number>) => {
      state.character = state.characters.find(
        (character) => character.id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, { payload }) => {
      const { results, info } = payload;
      state.characters = results;
      state.charactersPagination = {
        ...info,
        page: info.next ? +getQueryParam('page', info.next) - 1 : info.pages,
      };
    });

    builder.addCase(fetchMultipleCharacters.fulfilled, (state, { payload }) => {
      state.characters = payload;
      state.charactersPagination = initialPaginationState;
    });

    builder.addCase(fetchCharacterById.fulfilled, (state, { payload }) => {
      state.character = payload.character;
      state.characterEpisodes = payload.characterEpisodes;
    });
    builder.addCase(fetchMultipleEpisodes.fulfilled, (state, { payload }) => {
      state.characterEpisodes = payload;
    });
  },
});
// characters actions
export const { setCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;
