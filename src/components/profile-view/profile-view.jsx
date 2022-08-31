import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// React-router imports
import { Link } from 'react-router-dom';

// React-bootstrap imports 
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

// Custom SCSS
import '../profile-view/profile-view.scss';
import { FavMoviesView } from './user-favorites';

export class ProfileView extends React.Component {
  constructor() {
    super();
    
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  removeFavorite = (e, movie) => {
    const username = localStorage.getItem('user');
    console.log(username);
    
    const token = localStorage.getItem('token');
    console.log(this.props);
    axios.delete(`https://myflixfr.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {headers: { Authorization: `Bearer ${token}` }})
      .then((response) => {
        console.log(response);
        alert('Successfully removed from favorites.');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser = (token) => {
    const Username = localStorage.getItem('user');
    axios.get(`https://myflixfr.herokuapp.com/users/${Username}`, 
      {headers: { Authorization: `Bearer ${token}` }})
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.put(`https://myflixfr.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {headers: { Authorization: `Bearer ${token}` }})
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem('user', this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert('Successfully updated profile!');
        window.open(`/`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteUser() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://myflixfr.herokuapp.com/users/${Username}`, {headers: { Authorization: `Bearer ${token}` }})
      .then((response) => {
        console.log(response);
        alert('Profile has been deleted!');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open(`/`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }

  render() {
    const { movies } = this.props;
    const { favoriteMovies, Username, Email, Birthday, Password, onFavorites } = this.state;

    return (
      <Container>
        {/*=============================  USER INFO  =============================*/}
        <Row>
          <Col>
            <Card bg='dark' text='light'>
              <Card.Header>Your Info</Card.Header>
              <Card.Body>
                <Card.Text><span>Name:</span> {Username}</Card.Text>
                <Card.Text><span>Email:</span> {Email}</Card.Text>
                <Card.Text><span>Birthday:</span> {Birthday}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        {/*=============================  EDIT PROFILE  =============================*/}
          <Col>
            <Card bg='dark' text='light'>
              <Card.Header>
                Edit Profile
                <Button
                  className='ms-1'
                  size='sm'
                  variant='outline-danger'
                  onClick={() => this.deleteUser()}
                  >Delete Account
                </Button>
              </Card.Header>
              <Card.Body>
                <Form
                  onSubmit={(e) =>
                    this.updateUser(
                      e,
                      this.Username,
                      this.Password,
                      this.Email,
                      this.Birthday
                    )}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder= {Username}
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                      />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='passwor'
                      placeholder='New/old Password'
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                      />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      name='Email'
                      placeholder='New/old Email'
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                      />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type='date'
                      name='Birthday'
                      onChange={(e) => this.setBirthday(e.target.value)}
                      />
                  </Form.Group>

                  <Form.Group>
                    <Button
                      className='mt-3'
                      variant='outline-info'
                      type='submit'
                      onClick={() => this.updateUser}
                      >Update User
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/*=============================  FAVORITE MOVIES  =============================*/}
        <Card className='mt-3' bg='dark' text='light'>
          <Card.Body>
          <Card.Title>Favorite Movies</Card.Title>
          {favoriteMovies.length !== 0 ? (
            <Row>
              {favoriteMovies.map((movieId) => {
                let movie = movies.find((m) => m.id === movieId);
                return (
                 <FavMoviesView 
                    key={movieId}
                    movie={movie}
                    onFavorites={onFavorites}
                  />
                )
              })}
            </Row>
          ) : (
            <Card.Text>Looks kinda empty in here :/</Card.Text>
          )}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}