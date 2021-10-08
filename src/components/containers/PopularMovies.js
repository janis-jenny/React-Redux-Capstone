import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchPopularMovie from '../../redux/actions/actionCreators';
import Loader from '../shared/Loader';
import Error from '../shared/Error';
import Card from '../shared/Card';

const PopularMovies = () => {
  const { movies, error, loading } = useSelector((state) => state.allMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularMovie());
  }, []);

  console.log('here!!!!');
  console.log(movies);
  const renderMovies = () => {
    if (loading) {
      return (
        <GridItem colSpan={5} className="my-5">
          <Loader />
        </GridItem>
      );
    }
    if (error) return <Error />;

    return movies.filter((item) => item.media_type !== 'person' && item.title !== undefined && item.poster_path !== null).map((item) => (
      <Card
        name={item.title}
        img={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
        loading={loading}
        date={item.release_date}
        popularity={item.vote_average}
        id={item.id}
      />
    ));
  };

  return (
    <Box as="div" w="100%" bg="gray.200" p={5} minH="30vh" className="p-5">
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={20}
      >
        {renderMovies()}
      </Grid>
    </Box>
  );
};

export default PopularMovies;