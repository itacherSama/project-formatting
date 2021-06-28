import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import styles from './CloseButton.module.css';

interface CloseButton {
  onCancel: (idx: number) => void;
  idx: number;
}

const CloseButton: React.FC<CloseButton> = ({ idx, onCancel }) => {
  const handleCansel = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    onCancel(idx);
  };

  return (
    <IconButton aria-label="add" className={styles.iconButton} color="primary" onClick={handleCansel}>
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
