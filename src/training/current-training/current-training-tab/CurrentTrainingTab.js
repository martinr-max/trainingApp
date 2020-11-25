import React, {useRef, useState, useEffect, useContext, useCallback} from 'react';
import './Current-training-tab.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { exercises } from '../../../Exercises';
import { AuthContext } from '../../../auth/AuthContext';
import { useHistory } from 'react-router';
import CurrentTrainingTimer from '../current-training-timer/Current-training-timer';


const CurrentTrainingTab = () => {

  const [startExercise, setStartExercise] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exercise, setExercise] = useState('');
  const [loading, setLoading] = useState(false);

  const interval = useRef(0);
  const currentExercise = useRef('');
  const {
    uid
  } = useContext(AuthContext);
  const history = useHistory();

  const handleExerciseChange = (event) => {
    if (event.target.value !== 0) {
      setExercise(event.target.value);
    }
    return;
  };

  const CloseChooseExercise = () => {
    setStartExercise(false);
  };

  const OpenChoosedExercise = () => {
    setStartExercise(true);
  };

  const sendData = useCallback(async (status) => {
    clearInterval(interval.current);
    setProgress(0);
    setLoading(false);

    let data = {
      ...currentExercise.current,
      id: currentExercise.current.name,
      duration: currentExercise.current.duration * (progress / 100),
      calories: currentExercise.current.calories * (progress / 100),
      date: (new Date())
        .toLocaleDateString()
        .split("."),
      status: status,
      exUserId: uid
    };
    try {
      let response = await fetch(
        'https://training-app-d460e.firebaseio.com/exercises.json', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      response.json();
    } catch (err) {
      console.log(err.message);
    }
  }, [progress, uid])

  useEffect(() => {
    currentExercise.current = exercises.find(ex => ex.id === exercise);
    if (currentExercise.current) {
      let duration = currentExercise.current.duration / 100 * 1000;
      if (loading) {
        interval.current = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 1))
        }, duration);
      }
      if (progress >= 100) {
        sendData('completed');
      }
      return () => clearInterval(interval.current)
    }

  }, [loading, progress, exercise, uid, sendData]);

  const startTraining = () => {
    setLoading(true);
  }

  const cancelTraining = () => {
    sendData('cancelled');
    history.push({
      pathname: "/empty"
    });
    history.goBack();
  }

  return (
    <div className="selectEx">
        <Button onClick={OpenChoosedExercise} >
          Open the select
        </Button>
        <FormControl >
          <InputLabel >Exercises</InputLabel>
          <Select
	    disabled={loading}
	    open={startExercise}
            onClose={CloseChooseExercise}
            onOpen={OpenChoosedExercise}
            value={exercise}
            onChange={handleExerciseChange}>    
            {exercises.map(ex => {
              return  <MenuItem key={ex.id} value={ex.id} > {ex.id} </MenuItem>
            })} 
          </Select>
        </FormControl>
        <CurrentTrainingTimer
          exercise={exercise}
          loading={loading}
          progress={progress}
          cancelTraining={cancelTraining}
          startTraining={startTraining}
        />
    </div>
  );
}

export default CurrentTrainingTab;
