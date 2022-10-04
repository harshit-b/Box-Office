import React from 'react';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import ActorCard from './ActorCard';
import { FlexGrid } from '../styled';

const ActorGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map(({ person }) => (
        <ActorCard
          key={person.id}
          image={person.image ? person.image.medium : IMAGE_NOT_FOUND}
          name={person.name}
          gender={person.gender}
          country={person.country ? person.country.name : null}
          birthday={person.birthday}
          deathday={person.deathday}
        />
      ))}
    </FlexGrid>
  );
};

export default ActorGrid;
