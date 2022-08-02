import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state= {
      movies: [
        {_id: 1, Title: 'The Batman', Description: 'Batman ventures into Gotham City\'s underworld when a sadistic killer leaves behind a trail of cryptic clues. As the evidence begins to lead closer to home and the scale of the perpetrator\'s plans become clear, he must forge new relationships, unmask the culprit and bring justice to the abuse of power and corruption that has long plagued the metropolis.', Directors: 'Matt Reeves', Genre: 'Adventure', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg'},

        {_id: 2, Title: 'Batman vs Robin', Description: 'Damian Wayne has a hard time accepting his father\'s no-killing rule, and soon starts to believe his destiny lies within a secret society.', Directors: 'Jay Oliva', Genre: 'Action', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjI0ODY2MDE5Nl5BMl5BanBnXkFtZTgwMTk0NTcyNTE@._V1_.jpg'},

        {_id: 3, Title: 'Justice League: War', Description: 'Superman , Wonder Woman, Batman and other superheroes join forces to save Earth from Darkseid.', Directors: 'Jay Oliva', Genre: 'Superhero', ImagePath: 'https://m.media-amazon.com/images/M/MV5BYzA4ZjA3NzUtNDhjNS00OGNlLWI4ZWUtYzhkMmJiZDU2ZWExXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg'}
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState ({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}