import React from 'react';
import cn from 'classnames';
import styles from './BlockImg.module.css';

const BlockImg = ({ file }) => {
  return (
    <div className={ styles.blockImg }>
      <div className={ styles.blockImgInner }>
        <img
          alt={ file.name }
          src={ file.preview }
        />
      </div>
    </div>
  );
};

export default BlockImg;
