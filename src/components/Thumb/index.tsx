import React from 'react';
import styles from './Thumb.module.css';
import { IThumb } from '../../interfaces/components';

const Thumb: React.FC<IThumb> = ({ file }) => {
  return (
    <div className={ styles.thumb }>
      <div className={ styles.thumbInner }>
        <img
          alt={ file.name }
          src={ file.preview }
        />
      </div>
    </div>
  );
};

export default Thumb;
