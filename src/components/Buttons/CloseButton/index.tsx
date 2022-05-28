import React, { MouseEvent } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import styles from './CloseButton.module.css';

type Props = {
  onCancel: (idx: number) => void;
  idx: number;
};

const CloseButton = ({ idx, onCancel }: Props) => {
  const handleCansel = (event: MouseEvent<HTMLButtonElement>): void => {
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
