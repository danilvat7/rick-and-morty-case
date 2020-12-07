import React from 'react';

import { Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { ICharacter } from '../../interfaces/character';
import {
  selectCharacter,
  selectCharacterEpisodes,
} from '../../store/selectors';

import './CharacterInfo.scss';

/**
 * CharacterInfo component
 * Represents full character info and all his episodes
 */
export default function CharacterInfo() {
  // character info
  const { name, image, species, gender, location, origin, status } =
    useSelector(selectCharacter) || ({} as ICharacter);

  const characterEpisodes = useSelector(selectCharacterEpisodes);

  return (
    <Grid container spacing={5} className="character-info">
      <Grid item xs={12} sm={6}>
        <img src={image} alt={name} />
      </Grid>

      <Grid item xs={12} sm={6} className="info">
        <div className="info--heading">
          <h2>{name}</h2>
          <div>
            {status} - {species} - {gender}
          </div>
        </div>
        <p>Origin: {origin?.name}</p>
        <p>Last known location: {location?.name}</p>

        <div className="info--episodes">
          <h3>Episodes: </h3>
          {characterEpisodes?.map(({ id, name, episode }) => {
            return (
              <p key={id}>
                {episode} - {name}
              </p>
            );
          })}
        </div>
      </Grid>
    </Grid>
  );
}
