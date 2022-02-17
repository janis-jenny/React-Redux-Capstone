/* eslint-disable */
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDetailsMovie } from '../../redux/actions/actionCreators';
import Loader from '../shared/Loader';
import Error from '../shared/Error';
import CardDetails from '../shared/CardDetails';

const MovieDetails = () => {
  const { movieId } = useParams();
  const { movies, error, loading } = useSelector((state) => state.allMoviesTVs);
  const dispatch = useDispatch();
// pasar use selector al card details
// el state global es llamado con el use selector vacio en el padre component 
// y el details lo recibe asi luego el parent actualiza el state con use effect y vuelve a renderizar el details
  useEffect(() => {
    console.log(movies);
    console.log("AQUI");
    dispatch(fetchDetailsMovie(movieId));
  }, []);

  /* function timeConvert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}:${minutes}`;
  }
 */
  const renderDetails = () => {
    if (loading) {
      return (
        <GridItem colSpan={5} className="my-5">
          <Loader />
        </GridItem>
      );
    }
    if (error) return <Error />;

    return (
      <CardDetails
        id={movies.id}
        // bgimg={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movies.backdrop_path}`}
        name={movies.original_title}
        img={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movies.poster_path}`}
        loading={loading}
        date={movies.release_date}
        popularity={movies.vote_average}
        genres={movies.genres}
        time={movies.runtime}
        tagline={movies.tagline}
        overview={movies.overview}
        status={movies.status}
        language={movies.original_language}
        budget={movies.budget}
        revenue={movies.revenue}
      />
    )
  };

  return renderDetails()
  
};

export default MovieDetails;
