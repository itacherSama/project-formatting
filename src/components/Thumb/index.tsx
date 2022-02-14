import React from 'react';
import { IInfoImg } from '@interfaces/interfaces';
import styles from './Thumb.module.css';

const Thumb: React.FC<{
  file: IInfoImg;
}> = ({ file }) => (
  <div className={styles.thumb}>
    <div className={styles.thumbInner}>
      <img alt={file.infoByFile.name} src={file.preview} />
    </div>
  </div>
);

export default Thumb;
