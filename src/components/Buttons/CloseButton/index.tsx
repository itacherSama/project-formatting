import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import styles from './CloseButton.module.css';

interface ICloseButton {
  onCancel: (idx: number) => void;
  idx: number;
}

const CloseButton: React.FC<ICloseButton> = ({ idx, onCancel }) => {
  const handleCansel = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    onCancel(idx);
  };

  return (
    <IconButton className={styles.iconButton} color="primary" onClick={handleCansel}>
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
