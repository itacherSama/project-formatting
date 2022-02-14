import React, { useState, FC, ReactElement } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepButton from '@material-ui/core/StepButton';

import { ISettingStepContent, ISteps } from '@interfaces/interfaces';
import { FirstPage /* , ResizePage, DownloadPage */ } from '@pages';

const steps = ['Add images', 'Cropping images', 'Download images'];

function getStepContent(settingStepContent: ISettingStepContent) {
  switch (settingStepContent.step) {
    case 0:
      return <FirstPage settingStepContent={settingStepContent} />;
    // case 1:
    // return <ResizePage backStep={settingStepContent.handleBack} nextStep={settingStepContent.handleComplete} />;
    // case 2:
    // return <DownloadPage />;
    default:
      return 'Unknown step';
  }
}

const MainPage: FC<any> = (): ReactElement => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({} as ISteps);

  const visibleBtnPrev = activeStep !== 0;
  const visibleBtnNext = activeStep !== steps.length - 1;

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleComplete = (): void => {
    const newCompleted: ISteps = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleStep = (step: number) => (): void => {
    const newCompleted: ISteps = Object.keys(completed).reduce(
      (newCompletedSteps: any, keyStep: string) => {
        if (step < Number(keyStep)) {
          newCompletedSteps[keyStep] = false;
        }

        return newCompletedSteps;
      },
      { ...completed }
    );

    setActiveStep(step);
    setCompleted(newCompleted);
  };

  const handleBack = (): void => {
    setActiveStep(2);
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
      {steps.map((label: string, index: number) => (
        <Step key={label}>
          <StepButton completed={completed[index]} onClick={handleStep(index)}>
            {label}
          </StepButton>
          <StepContent>
            {getStepContent({
              step: index,
              handleComplete,
              handleBack,
              visibleBtnPrevArr: [visibleBtnPrev],
              visibleBtnNextArr: [visibleBtnNext],
            })}
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

export default MainPage;
