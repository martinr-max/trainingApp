import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './CancelModal.css';


const CancelModal = ({open, handleClose, cancelTraining}) => {
      
        return (
          <div>         
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className="ModalPanel" >
                  <h2 id="transition-modal-title">Do you really want to cancel?</h2>
                  <ButtonGroup className="button" disableElevation variant="contained" >
                    <Button color="secondary" onClick={cancelTraining}>Yes</Button>
                    <Button color="primary" onClick={handleClose}>No</Button>
                </ButtonGroup>
                </div>
              </Fade>
            </Modal>
          </div>
        );
}

export default CancelModal;

