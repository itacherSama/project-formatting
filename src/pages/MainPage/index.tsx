/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import StepButton from '@material-ui/core/StepButton';

import styles from './MainPage.module.css';

import FirstPage from '../FirstPage';
import ResizePage from '../ResizePage';
import DownloadPage from '../DownloadPage';

const steps = ['Add images', 'Cropping images', 'Download images'];

function getStepContent(step: number, handleComplete: () => void) {
  switch (step) {
  case 0:
    return <FirstPage />;
  case 1:
    return <ResizePage nextStep={ handleComplete } />;
  case 2:
    return <DownloadPage />;
  default:
    return 'Unknown step';
  }
}

const MainPage: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<any>({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleComplete = () => {
    const newCompleted: any = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleStep = (step: number) => () => {
    const newCompleted: any = completed;

    if (newCompleted[step]) {
      for (const d in newCompleted) {
        
        if (step < Number(d)) newCompleted[d] = false;
      }
      setActiveStep(step);
      setCompleted(newCompleted);

    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Stepper
      activeStep={ activeStep }
      nonLinear 
      orientation="vertical"
    >
      { steps.map((label: string, index: number) => (
        <Step key={ label }>
          <StepButton
            completed={ completed[index] }
            onClick={ handleStep(index) }
          >
            { label }
          </StepButton>
          <StepContent>
            { getStepContent(index, handleComplete) }
            { index !== 1 && (
              <div className={ styles.actionsContainer }>
                <div>
                  <Button
                    className={ styles.button }
                    disabled={ activeStep === 0 }
                    onClick={ handleBack }
                  >
                    Back
                  </Button>
                  { (activeStep !== steps.length - 1)  && (
                    <Button
                      className={ styles.button }
                      color="primary"
                      onClick={ handleComplete }
                      variant="contained"
                    >
                      Next
                    </Button>
                  ) }
                  
                </div>
              </div>
            ) }
          </StepContent>
        </Step>
      )) }
    </Stepper>
  );
};

export default MainPage;
