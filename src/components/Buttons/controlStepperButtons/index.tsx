import { Button } from "@material-ui/core";
import React from "react";

import styles from "./controlStepperButtons.module.css";


const ControlsStepperButtons: React.FC<any> = ({ handleBack, handleComplete, visibleBtnPrevArr, visibleBtnNextArr, disabledBtnPrev = false, disabledBtnNext = false }) => {

  console.log('disabledBtnNext', disabledBtnNext);
  console.log('sss');
  
  return (
    <div>
      { (visibleBtnPrevArr.every((el: any) => el === true)) && (
        <Button
          className={ styles.button }
          disabled={ disabledBtnPrev }
          onClick={ handleBack }
        >
          НАЗАД
        </Button>
      ) }
      { (visibleBtnNextArr.every((el: any) => el === true)) && (
        <Button
          className={ styles.button }
          color="primary"
          disabled={ disabledBtnNext }
          onClick={ handleComplete }
          variant="contained"
        >
          ДАЛЕЕ
        </Button>
      ) }

    </div>
  );
};

export default ControlsStepperButtons;
