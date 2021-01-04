import React from 'react';
import styles from './Thumb.module.css';

const Thumb = ({ file }) => {
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
