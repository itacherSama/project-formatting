import React from 'react';
import { useStore } from 'effector-react';
import Dropzone from '../../components/Dropzone';
import { cancelImg } from '../../effector/event';
import styles from './FirstPage.module.css';

import { IInfoImg } from '../../interfaces/items';
import ControlsStepperButtons from '../../components/Buttons/controlStepperButtons';
import { $images } from '../../effector/stores/images';

const FirstPage: React.FC<any> = ({ settingStepContent }) => {
  const images: IInfoImg[] = useStore($images);
  const disabledBtnNext: boolean = images.length === 0;

  return (
    <>
      <div className={styles.DropzoneWrapper}>
        <Dropzone images={images} onCancelImg={cancelImg} />
      </div>
      <div className={styles.blockButton}>
        <ControlsStepperButtons disabledBtnNext={disabledBtnNext} {...settingStepContent} />
      </div>
    </>
  );
};

export default FirstPage;
