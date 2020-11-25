import React, { useState } from 'react';
import './Current-training-timer.css'
import Button from '@material-ui/core/Button';
import CircularProgressWithLabel from '../../../UI/CircularProgressWithLabel';
import CancelModal from '../../../UI/CancelModal/CancelModal'


const CurrentTrainingTimer = ({exercise, loading, progress, startTraining, cancelTraining}) => {
 
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const handleOpenCancelModal = () => {
      setOpenCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false)
  };

  return(
      <React.Fragment>
        {loading &&
          <CancelModal
           open={openCancelModal}
           cancelTraining={cancelTraining}
           handleClose={handleCloseCancelModal}
           handleOpen={handleOpenCancelModal}
        /> }
        <div className="timer">
          <div>
            {loading && <CircularProgressWithLabel  size="12rem" value={progress} />}
          </div>
            {!loading ?<Button  variant="contained" disabled={exercise.length === 0}color="primary" onClick={startTraining}> 
              Start
            </Button>:  <Button variant="contained" color="primary" onClick={handleOpenCancelModal}> 
              Cancel
            </Button> }
        </div>
      </React.Fragment>
    );
}

export default CurrentTrainingTimer;
