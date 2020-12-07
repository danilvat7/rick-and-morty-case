import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';

import { useDispatch, useSelector } from 'react-redux';
import {
  setCharacter,
  fetchCharacterById,
  fetchMultipleEpisodes,
} from '../../store/characters';
import { selectCharacters } from '../../store/selectors';

import { CharacterInfo } from '../../components';

import { getIdsInUrls } from '../../helpers';

import './CharacterDetails.scss';

/**
 * CharacterDetails component
 * Represents full character info
 */
export default function CharacterDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const characters = useSelector(selectCharacters);
  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    const selectedCharacter = characters?.find(
      (character) => character.id === +id
    );
    if (selectedCharacter) {
      dispatch(setCharacter(+id));

      dispatch(fetchMultipleEpisodes(getIdsInUrls(selectedCharacter?.episode)));
      return;
    }
    dispatch(fetchCharacterById(+id));
  }, []); // eslint-disable-line
  return (
    <div className="character-details">
      <Button
        variant="outlined"
        startIcon={<KeyboardBackspace />}
        onClick={() => history.goBack()}
        className="character-details--btn"
      >
        Back
      </Button>
      <CharacterInfo />
    </div>
  );
}
