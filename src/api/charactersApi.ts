/*
 * Characters Api
 **/
import clientApi from './index';
import { ICharacter, ILocation, IEpisode } from '../interfaces';
import { IPagination } from '../interfaces/pagination';

async function fetchCharacters(
  page: number = 1
): Promise<{
  info: IPagination;
  results: ICharacter[];
}> {
  return (await clientApi.get('/character', { params: { page } })).data;
}

async function fetchCharacterById(id: number): Promise<ICharacter> {
  return (await clientApi.get(`/character/${id}`)).data;
}

async function fetchMultipleCharacters(ids: string): Promise<ICharacter[]> {
  return (await clientApi.get(`/character/${ids}`)).data;
}

async function filterLocations(params: {
  [key: string]: string;
}): Promise<{
  info: IPagination;
  results: ILocation[];
}> {
  return (await clientApi.get('/location', { params })).data;
}

async function filterEpisodes(params: {
  [key: string]: string;
}): Promise<{
  info: IPagination;
  results: IEpisode[];
}> {
  return (await clientApi.get('/episode', { params })).data;
}

async function fetchMultipleEpisodes(ids: string): Promise<IEpisode[]> {
  return (await clientApi.get(`/episode/${ids}`)).data;
}

const charactersApi = {
  fetchCharacters,
  fetchCharacterById,
  fetchMultipleCharacters,
  filterLocations,
  filterEpisodes,
  fetchMultipleEpisodes,
};

export default charactersApi;
