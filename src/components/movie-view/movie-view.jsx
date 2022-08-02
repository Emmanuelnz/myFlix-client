import React from 'react';

export class MovieView extends React.Component {
   render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className='movie-view'>
        <div className='movie-poster'>
          <img crossorigin='anonymous' src={movie.ImagePath} />
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
          <span className='value'>{ movie.Directors } </span>
        </div>
        <div className='movie-genre'>
          <span className='label'>Genre: </span>
          <span className='value'> { movie.Genre } </span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
   }
}