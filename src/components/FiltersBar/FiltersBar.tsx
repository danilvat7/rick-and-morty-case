import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';

import {
  fetchCharacters,
  fetchMultipleCharacters,
} from '../../store/characters';
import {
  filterEpisodes,
  filterDimensions,
  filterLocations,
  setFilter,
  removeFilter,
} from '../../store/common';
import {
  selectCharactersPagiation,
  selectEpisodes,
  selectLocations,
  selectDimensions,
  selectFilter,
} from '../../store/selectors';

import SearchInput, { SearchInputRefType } from '../SearchInput/SearchInput';
import { Pagination } from '../../components';

import { ILocation, IEpisode } from '../../interfaces';
import { getIdsInUrls } from '../../helpers';

/**
 * FiltersBar component
 * Represents characters pagination, locations, dimensions and episodes filters
 */
export default function FiltersBar() {
  const dispatch = useDispatch();

  // selects from the store all necessary data
  const pagination = useSelector(selectCharactersPagiation);
  const locations = useSelector(selectLocations);
  const dimensions = useSelector(selectDimensions);
  const episodes = useSelector(selectEpisodes);
  const selectedFilter = useSelector(selectFilter);

  // Stores reference links to the list of search inputs so that it can reset the selected value
  const childRefs = {
    location: useRef<SearchInputRefType>(null),
    dimension: useRef<SearchInputRefType>(null),
    episode: useRef<SearchInputRefType>(null),
  };

  // fetches characters with pagination options after component mounting if filters arent't selected
  useEffect(() => {
    if (!selectedFilter) {
      dispatch(fetchCharacters(pagination.page));
    }
  }, []); // eslint-disable-line

  // handles pagination change and reses all filters
  const onPaginationChange = (page: number) => {
    Object.entries(childRefs).forEach(([_, childRef]) =>
      childRef.current?.resetValue()
    );
    dispatch(fetchCharacters(page));
  };

  // handles on search inputs changes and fetches search options
  const onLocationChange = (name: string) => (value: string) => {
    dispatch(filterLocations({ [name]: value }));
  };

  const onDimensionChange = (name: string) => (value: string) => {
    dispatch(filterDimensions({ [name]: value }));
  };

  const onEpisodeChange = (name: string) => (value: string) => {
    dispatch(filterEpisodes({ [name]: value }));
  };

  // handles filer slect
  const onSearchInputSelect = (inputType: string, value: any) => {
    // resets all filters besides current
    Object.entries(childRefs).forEach(
      ([type, childRef]) => type !== inputType && childRef.current?.resetValue()
    );
    if (value) {
      // depending on selected filter fetches characters
      const urlsArr = value.characters || value.residents;
      dispatch(fetchMultipleCharacters(getIdsInUrls(urlsArr)));
      dispatch(setFilter({ [inputType]: value }));
    } else {
      // if a filter is reseted, fetches characters with default pagination options
      dispatch(fetchCharacters(pagination.page));
      dispatch(removeFilter());
    }
  };

  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid container alignItems="center" spacing={3} item lg={9}>
        <Grid item xs={12} md={4}>
          <SearchInput
            ref={childRefs.location}
            placeholder="Start searching for a location"
            options={locations}
            onKeyUp={onLocationChange('name')}
            onChange={(value: ILocation) =>
              onSearchInputSelect('location', value)
            }
            defaultValue={selectedFilter && selectedFilter['location']}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SearchInput
            ref={childRefs.dimension}
            optionLabel="dimension"
            placeholder="Start searching for a dimension"
            options={dimensions}
            onKeyUp={onDimensionChange('dimension')}
            onChange={(value: ILocation) =>
              onSearchInputSelect('dimension', value)
            }
            defaultValue={selectedFilter && selectedFilter['dimension']}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SearchInput
            ref={childRefs.episode}
            placeholder="Start searching for an episode"
            options={episodes}
            onKeyUp={onEpisodeChange('name')}
            onChange={(value: IEpisode) =>
              onSearchInputSelect('episode', value)
            }
            defaultValue={selectedFilter && selectedFilter['episode']}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} lg={3}>
        <Pagination pagination={pagination} onChange={onPaginationChange} />
      </Grid>
    </Grid>
  );
}
