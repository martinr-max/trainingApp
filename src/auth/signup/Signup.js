import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { withRouter, useHistory } from 'react-router-dom';
import firebase from '../../firebase/firebase'
import 'firebase/auth';
import 'firebase/firestore';

import './Signup.css';


const SignupForm = () => {

	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",

	});

	const [error, setError] = useState('');
	const history = useHistory();

	const handleChange = (event) => {
		event.persist();
		setValues(values => ({
			...values,
			[event.target.name]: event.target.value
		}));
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(values, 'values');
		firebase
			.auth()
			.createUserWithEmailAndPassword(values.email, values.password)
			.then(() => {
				console.log('ok');
				history.push("/");
			})
			.catch(error => {
				setError(error.message);
			});
	}

	return (
		<div>
            <React.Fragment>
                {error && <Alert severity="error"> {error} </Alert>}
                {!error &&
                <Container>
                 <form  className="signupForm" onSubmit={handleSubmit} >
                    <h1>Sign up</h1>
                    <TextField
                    id="input"
                    label="Name"
                    name="username"
                    required
                    onChange={handleChange}  />
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
                    className="signupButton"
                    color="primary"
                    variant="contained"
                    type="submit" >
                    SIGN UP 
                    </Button>
                </form>
            </Container>}
        </React.Fragment>
    </div>
    );

}

export default withRouter(SignupForm);

