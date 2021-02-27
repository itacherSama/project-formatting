import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import styles from './CustomModal.module.css';
import { ICustomModal } from '../../interfaces/components';

const CustomModal: React.FC<ICustomModal> = ({ children, open, onCloseModal }) => {
  if (!open) return <div />;

  return (
    <Modal
      BackdropComponent={ Backdrop }
      BackdropProps={{
        timeout: 500,
      }}
      className={ styles.modal }
      closeAfterTransition
      onClose={ onCloseModal }
      open={ open }
    >
      <Fade in={ open }>
        { children }
      </Fade>
    </Modal>
  );
};

export default CustomModal;
