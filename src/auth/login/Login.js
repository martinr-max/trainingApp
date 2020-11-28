import React, { useState, useContext, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withRouter, useHistory } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import 'firebase/auth';
import 'firebase/firestore';
import './Login.css';
import { AuthContext } from '../AuthContext';

const LoginForm = () => {

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState('');

  const history = useHistory();
  const authContext = useContext(AuthContext);

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  }

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((response) => {
        authContext.setUser(response)
        history.push("/training-tab");
      })
      .catch(error => {
        setError(error.message);
      });
  }, [authContext, history, values.email, values.password]);

  return (
    <div>
      <React.Fragment>
        {error && <Alert severity="error"> {error} </Alert>}
        {!error &&
      <Container>
        <form  className="LoginForm" onSubmit={handleSubmit} >
          <h1>Login</h1>
          <TextField 
           id="input"
           label="E-mail"
           type="email"
           name="email"
           required
           onChange={handleChange} />
          <TextField
           id="input"
           label="Password"
           type="password"
           name="password"
           required
           onChange={handleChange} />
          <Button
           className="loginButton"
           color="primary"
           variant="contained"
           type="submit" >
            LOG IN
          </Button> 
        </form>    
      </Container>}
    </React.Fragment>
   </div>
  );
}

export default withRouter(LoginForm);
