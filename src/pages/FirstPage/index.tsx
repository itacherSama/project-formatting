import React from 'react';
import { useStore } from 'effector-react';
import { cancelImg } from 'effector/event';

import { IInfoImg } from 'interfaces/interfaces';
import { ControlsStepperButtons, Dropzone } from 'components';
import { $images } from 'effector/stores';
import styles from './FirstPage.module.css';

type Props = {
  settingStepContent: any;
};

const FirstPage = ({ settingStepContent }: Props) => {
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
