import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase/firebase'; 

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

	const [user, setUser] = useState(null);
	const [loadingAuthState, setLoadingAuthState] = useState(true);

	useEffect(() => {
		const unsubscribe = firebase.auth()
			.onAuthStateChanged((user) => {
				setUser(user);
				setLoadingAuthState(false);
			});
		return () => {
			unsubscribe();
		};
	}, []);

	let currentUser = firebase.auth()
		.currentUser;
	let uid;

	if (currentUser != null) {
		uid = currentUser.uid;
	}

	const logOut = () => {
		setUser(null);
		firebase.auth()
			.signOut();
	}

	return (
		<AuthContext.Provider
         value={{
              uid,
              user,
              authenticated: user !== null,
              setUser,
              logOut,
              loadingAuthState
        }}>      {children}    
        </AuthContext.Provider>);
}