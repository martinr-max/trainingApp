import React, {useContext} from 'react';
import SignupForm from './auth/signup/Signup';
import { StylesProvider } from '@material-ui/core/styles';
import CustomAppBar from './navigation/appBar/AppBar';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import MainPage from './mainPage/MainPage';
import CurrentTrainingTab from './training/current-training/current-training-tab/CurrentTrainingTab';
import PastTrainingTable from './training/past-training-table/Past-training-table';
import TrainingTab from './training/Training-tab/TrainingTab';
import Login from './auth/login/Login';
import { AuthContext } from './auth/AuthContext';

function App() {

  const { authenticated } = useContext(AuthContext);
  
  return (
      <Router>
      <StylesProvider injectFirst>
        <CustomAppBar />
        <Route path="/" exact component={MainPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignupForm} />
        {authenticated &&
        <React.Fragment>
        <Route path="/training-tab" component={TrainingTab} />
        <Route path="/current-training-tab" component={CurrentTrainingTab} />
        <Route path="/past-training" component={PastTrainingTable} />
        {!authenticated && <Redirect to="/login" />}
        </React.Fragment>
         }       
      </StylesProvider>
      </Router>    
  );
}

export default App;
