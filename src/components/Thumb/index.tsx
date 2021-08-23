import React from 'react';
import styles from './Thumb.module.css';
import { IInfoImg } from '../../interfaces/items';

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
