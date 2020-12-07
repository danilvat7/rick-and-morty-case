/**
 * Store selectors
 */
import { RootState } from './index';
import { ICharacter } from '../interfaces/character';

// Characters selectors
export const selectCharacters = (state: RootState) =>
  state.characters.characters;

export const selectCharacter = (state: RootState) =>
  state.characters.character as ICharacter;

export const selectCharacterEpisodes = (state: RootState) =>
  state.characters.characterEpisodes;

export const selectCharactersPagiation = (state: RootState) =>
  state.characters.charactersPagination;

// Common selectors
export const selectLocations = (state: RootState) => state.common.locations;

export const selectDimensions = (state: RootState) => state.common.dimensions;

export const selectEpisodes = (state: RootState) => state.common.episodes;

export const selectFilter = (state: RootState) => state.common.selectedFilter;
