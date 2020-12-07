import React from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCharacters } from '../../store/selectors';

import { Grid } from '@material-ui/core';

import CharacterCard from '../CharacterCard/CharacterCard';

/**
 * CharactersList component
 * Represents a list of character cards
 */
export default function CharactersList() {
  const characters = useSelector(selectCharacters);
  const history = useHistory();

  if (characters && !characters.length) {
    return <div>The characters list is empty</div>;
  }
  return (
    <Grid container spacing={3}>
      {characters.map((character) => {
        return (
          <Grid item xs={12} md={4} sm={6} key={character.id}>
            <CharacterCard
              character={character}
              onClick={() => history.push(`/characters/${character.id}`)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
