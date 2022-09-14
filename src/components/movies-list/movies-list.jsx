import React from 'react';

// React-bootstrap imports
import { Col  } from 'react-bootstrap';

// Redux imports
import { connect } from 'react-redux';

// View imports
import { MovieCard } from '../movie-card/movie-card';


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return <>
    {filteredMovies.map(m => (
      <Col lg={2} md={3} sm={5} xs={7} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))}
  </>;
}

export default connect(mapStateToProps)(MoviesList);