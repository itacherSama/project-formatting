/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepButton from '@material-ui/core/StepButton';

import FirstPage from '../FirstPage';
import ResizePage from '../ResizePage';
import DownloadPage from '../DownloadPage';
import { ISettingStepContent } from '../../interfaces/items';

const steps = ['Add images', 'Cropping images', 'Download images'];



function getStepContent(settingStepContent: ISettingStepContent) {
  switch (settingStepContent.step) {
  case 0:
    return (
      <FirstPage 
        settingStepContent={ settingStepContent }
      />
    );
  case 1:
    return (
      <ResizePage
        backStep={ settingStepContent.handleBack }
        nextStep={ settingStepContent.handleComplete }
      />
    );
  case 2:
    return <DownloadPage />;
  default:
    return 'Unknown step';
  }
}

const MainPage: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<any>({});
  
  const visibleBtnPrev = activeStep !== 0;
  const visibleBtnNext = activeStep !== steps.length - 1;

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
    console.log('handleBack');
    
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
            { getStepContent({ step: index, handleComplete, handleBack, visibleBtnPrevArr: [visibleBtnPrev], visibleBtnNextArr: [visibleBtnNext] }) }
          </StepContent>
        </Step>
      )) }
    </Stepper>
  );
};

export default MainPage;
