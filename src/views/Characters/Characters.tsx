import React from 'react';

import { Grid } from '@material-ui/core';

import { CharactersList, FiltersBar } from '../../components';

/**
 * Characters component
 * Represents filters, pagination and characters list
 */
export default function Characters() {
  return (
    <div className="characters">
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <FiltersBar />
        </Grid>
        <Grid item>
          <CharactersList />
        </Grid>
      </Grid>
    </div>
  );
}
