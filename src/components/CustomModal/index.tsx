import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import styles from './CustomModal.module.css';
import { ICustomModal } from '../../interfaces/components';

const CustomModal: React.FC<ICustomModal> = ({ children, open, onCloseModal }) => {
  if (!open) return <div />;

  return (
    <Dialog
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={styles.dialog}
      closeAfterTransition
      onClose={onCloseModal}
      open={open}
      scroll="body">
      {children}
    </Dialog>
  );
};

export default CustomModal;
