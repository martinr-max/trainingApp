import React, { useEffect, useState, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AuthContext } from '../../auth/AuthContext';
import { Button } from '@material-ui/core';


const PastTrainingTable = () => {

  const [finishedExercises, setFinishedExercises] = useState([]);
  const { uid } = useContext(AuthContext);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await  fetch('https://training-app-d460e.firebaseio.com/exercises.json');
        let responseData = await response.json();
        const dataArray = [];
        for(const key in responseData) {
          dataArray.push({
            id: key,
            exUserId: responseData[key].exUserId,
            name: responseData[key].name,
            duration: responseData[key].duration,
            calories: responseData[key].calories,
            status: responseData[key].status,
            date: responseData[key].date
          });
        }
        let filteredDataArray = dataArray.filter(ex => ex.exUserId === uid );
        setFinishedExercises(filteredDataArray);
      }
      catch(err) {
        console.log(err.message);
      }
    }
    FetchData();
}, [uid]);

  const onDeleteExercise = async (exerciseId) => {
    try {
        const response =  await fetch(`https://training-app-d460e.firebaseio.com/exercises/${[exerciseId]}.json`,
        { method: "DELETE" });
        response.json();
        setFinishedExercises(prevExercises => prevExercises.filter(ex => ex.id !== exerciseId));
    }
    catch(err) {
      console.log(err.message);
    }
  }

    return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Exercise</TableCell>
                <TableCell align="right">Duration </TableCell>
                <TableCell align="right">Date </TableCell>
                <TableCell align="right"> Calories </TableCell>
                <TableCell align="right"> Status</TableCell>
                <TableCell align="right"> Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { finishedExercises && uid && finishedExercises.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="right">{Math.round(row.duration)}.s</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{Math.round(row.calories)}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">
                    <Button
                     onClick={e => {onDeleteExercise(row.id)}}>
                       Delete
                    </Button>
                  </TableCell>
                </TableRow> 
              )) }
            </TableBody>
          </Table>
        </TableContainer>
    );
}

export default PastTrainingTable;
