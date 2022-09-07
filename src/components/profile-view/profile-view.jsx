import React from 'react';
import axios from 'axios';
// React-router imports
import { Link } from 'react-router-dom';

// React-bootstrap imports 
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

// Custom SCSS
import '../profile-view/profile-view.scss';

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
          favoriteMovies: response.data.favoriteMovies,
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
    const { movies, removeFavorite, } = this.props;
    const { Username, Email, Birthday, } = this.state;
    
    const favoriteMoviesList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });

    if (!Username) {
      return null;
    }

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
                  className='del-btn ms-1'
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
                      >Update info
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/*=============================  FAVORITE MOVIES  =============================*/}
        <Row className='mt-3'>
          <Col>
            <Card bg='dark' text='light'>
              <Card.Title className='p-3 ps-2'>Favorite Movies</Card.Title>
            </Card>
          </Col>
        </Row>
          
        <Row 
          className='favorites mt-2 gap-2' 
          lg={6} 
          md={3}
          sm={3}
           >
          {favoriteMoviesList.map((movie) => {
            return (
              <div key={movie._id}>
                <Card bg='dark' text='light'>
                    <Link to={`/movies/${movie._id}`}>
                      <Card.Img
                        variant='top'
                        crossOrigin='anonymous'
                        src={movie.ImagePath}
                        style={{ minHeight: '15rem', maxHeight: '30rem' }}
                        />
                    </Link>
                  <Card.Body>
                    <Col>
                      <Card.Title className='favorites-title mt-2'>{movie.Title}</Card.Title>
                    </Col>     
                  </Card.Body>
                  <Card.Footer className='mb-1'>
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant='outline-info' size='sm'>Details</Button>
                    </Link>
                  
                    <Button
                      className='remove-btn'
                      size='sm'
                      variant='outline-info'
                      onClick={() => removeFavorite(movie)}
                      >Remove 
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
              );
            })}
          </Row>
      </Container>
    );
  }
}