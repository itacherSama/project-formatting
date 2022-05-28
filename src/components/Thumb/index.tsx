import React from 'react';
import { IInfoImg } from '@interfaces/interfaces';
import styles from './Thumb.module.css';

type Props = {
  file: IInfoImg;
};

const Thumb = ({ file }: Props) => (
  <div className={styles.thumb}>
    <div className={styles.thumbInner}>
      <img alt={file.infoByFile.name} src={file.preview} />
    </div>
  </div>
);

export default Thumb;
