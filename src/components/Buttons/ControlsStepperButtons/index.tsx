import { Button } from '@material-ui/core';
import React from 'react';

import styles from './ControlsStepperButtons.module.css';

const ControlsStepperButtons: React.FC<any> = ({
  handleBack,
  handleComplete,
  visibleBtnPrevArr,
  visibleBtnNextArr,
  disabledBtnPrev = false,
  disabledBtnNext = false,
}) => (
  <div>
    {visibleBtnPrevArr.every((el: any) => el === true) && (
      <Button className={styles.button} disabled={disabledBtnPrev} onClick={handleBack}>
        НАЗАД
      </Button>
    )}
    {visibleBtnNextArr.every((el: any) => el === true) && (
      <Button
        className={styles.button}
        color="primary"
        disabled={disabledBtnNext}
        variant="contained"
        onClick={handleComplete}>
        ДАЛЕЕ
      </Button>
    )}
  </div>
);

export default ControlsStepperButtons;
