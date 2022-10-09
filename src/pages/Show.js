/* eslint-disable */

import React, { useState, useEffect, useReducer } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';
import ShowMainData from '../components/show/ShowMainData';
import Cast from '../components/show/Cast';
import Seasons from '../components/show/Seasons';
import Details from '../components/show/Details';

const Show = () => {
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS': {
        return { isLoading: false, show: action.show, error: null };
      }

      case 'FETCH_FAILED': {
        return { ...prevState, isLoading: false, error: action.error };
      }
      default:
        return prevState;
    }
  };
  const initialState = {
    show: null,
    isLoading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({
            type: 'FETCH_SUCCESS',
            show: results,
          });
          // setShow(results);
          // setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({
            type: 'FETCH_FAILED',
            error: err,
          });
          // setError(err.message);
          // setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (state.isLoading) {
    return <div> Data is being loaded </div>;
  }

  if (state.error) {
    return <div> {error} </div>;
  }

  console.log(state);
  // apiGet(`/search`)

  return (
    <div>
      <ShowMainData
        image={state.show.image}
        name={state.show.name}
        rating={state.show.rating}
        summary={state.show.summary}
        tags={state.show.genres}
      />

      <div>
        <h2> Details</h2>
        <Details
          status={state.show.status}
          network={state.show.network}
          premiered={state.show.premiered}
        />
      </div>

      <div>
        <h2> Seasons </h2>
        <Seasons seasons={state.show._embedded.seasons} />
      </div>

      <div>
        <h2>Cast</h2>
        <Cast cast={state.show._embedded.cast} />
      </div>
    </div>
  );
};

export default Show;
