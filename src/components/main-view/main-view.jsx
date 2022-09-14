import React from 'react';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

// React-router Imports
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// View imports
import { NavBar } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorsView } from '../directors-view/directors-view';
import { GenreView } from '../genre-view/genre-view';

// React-bootstrap imports 
import { Row, Col } from 'react-bootstrap';

// Custom SCSS
import '../main-view/main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflixfr.herokuapp.com/movies',
    {headers: { Authorization: `Bearer ${token}`}}
    )
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  onLoggedIn(authData) {
    console.log(authData);
    location.reload();
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    let { movies, user, } = this.props;

    return (
      <Router>
        <NavBar user={user} />
        <Row className='main-view gap-3 pt-5'>
          
          <Route exact path='/' render={() => {
            if (!user) return (
              <Col>
                <LoginView 
                  onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              )

            if (movies.length === 0) return <div className="main-view" />;

            return <MoviesList movies={movies} />
          }} />
          
          <Route path='/register' render={() => {
            if (user) return <Redirect to='/' />
            return (
              <Col>
                <RegistrationView />
              </Col> 
            )
          }} />
  
          <Route path={`/users/${user}`} render={({ history }) => {

            return (
              <ProfileView 
                history={history} 
                movies={movies}
                user={user}
                />
            )
          }} />

          <Route path='/movies/:movieId' render={({ match, history }) => {
            if (!user) return <Redirect to="/" />

            if (movies.length === 0) return <div className="main-view" />;

            return (
              <Col>
                <MovieView 
                movie={movies.find(m => m._id === match.params.movieId)}
                onBackClick={() => history.goBack()}
                />
              </Col>
            )
          }} />

          <Route path='/directors/:name' render={({ match, history }) => {
            if (!user) return <Redirect to="/" />

            if (movies.length === 0) return <div className='main-view' /> 

            return (
              <Col>
                <DirectorsView directors={movies.find(m => m.Directors.Name === match.params.name).Directors} onBackClick={() => history.goBack()} />
              </Col>
            )
          }} />

          <Route path='/genre/:Name' render={({ match, history }) => {
            if (!user) return <Redirect to="/" />

            if (movies.length === 0) return <div className='main-view' />

            return (
              <Col>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} 
                onBackClick={() => history.goBack()} />
              </Col>
            )
          }} />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {movies: state.movies, user: state.user}
}

export default connect(mapStateToProps, { setMovies, setUser }) (MainView);
