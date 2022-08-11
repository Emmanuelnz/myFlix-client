import React from 'react';
import PropTypes from 'prop-types';


export class MovieView extends React.Component {

   render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className='movie-view'>
        <div className='movie-poster'>
          <img crossOrigin='anonymous' src={movie.ImagePath} />
        </div>
        <div className='movie-title'>
          <span className='label'>Title: </span>
          <span className='value'> { movie.Title } </span>
        </div>
        <div className='movie-description'>
          <span className='label'>Description: </span>
          <span className='value'> { movie.Description } </span>
        </div>
        <div className='movie-directors'>
          <span className='label'>Directors: </span>
          <span className='value'>{ movie.Directors.Name } </span>
        </div>
        <div className='movie-genre'>
          <span className='label'>Genre: </span>
          <span className='value'> { movie.Genre.Name } </span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
   }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,

    Directors: PropTypes.shape ({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Born: PropTypes.string.isRequired, 
    }),

    Genre: PropTypes.shape ({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};