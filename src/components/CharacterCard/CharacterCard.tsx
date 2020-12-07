import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { ICharacter } from '../../interfaces/character';

import './CharacterCard.scss';

type Props = {
  character: ICharacter;
  onClick?: () => void;
};

/**
 * CharacterCard component
 * Represents character image and name in characters list
 */
export default function CharacterCard({ character, onClick }: Props) {
  return (
    <Card className="character-card" onClick={onClick}>
      <CardActionArea>
        <CardMedia
          className="character-card--medeia"
          image={character.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {character.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
