import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import styles from './CustomModal.module.css';

type Props = {
  children: any;
  open: boolean;
  onCloseModal: () => void;
};

const CustomModal = ({ children, open, onCloseModal }: Props) => {
  if (!open) return <div />;

  return (
    <Dialog
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={styles.dialog}
      open={open}
      scroll="body"
      closeAfterTransition
      onClose={onCloseModal}
    >
      {children}
    </Dialog>
  );
};

export default CustomModal;
