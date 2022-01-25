import React from 'react';
import { useStore } from 'effector-react';
import { cancelImg } from '@effector/event';

import { IInfoImg } from '@interfaces/items';
import { ControlsStepperButtons, Dropzone } from '@components';
import { $images } from '@effector/stores';
import styles from './FirstPage.module.css';

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
