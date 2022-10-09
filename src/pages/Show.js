/* eslint-disable */

import React from 'react';
import { useParams } from 'react-router-dom';
import ShowMainData from '../components/show/ShowMainData';
import Cast from '../components/show/Cast';
import Seasons from '../components/show/Seasons';
import Details from '../components/show/Details';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const Show = () => {
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  const { id } = useParams();

  const state = useShow(id);

  if (state.isLoading) {
    return <div> Data is being loaded </div>;
  }

  if (state.error) {
    return <div> {error} </div>;
  }

  console.log(state);
  // apiGet(`/search`)

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={state.show.image}
        name={state.show.name}
        rating={state.show.rating}
        summary={state.show.summary}
        tags={state.show.genres}
      />

      <InfoBlock>
        <h2> Details</h2>
        <Details
          status={state.show.status}
          network={state.show.network}
          premiered={state.show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2> Seasons </h2>
        <Seasons seasons={state.show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={state.show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
