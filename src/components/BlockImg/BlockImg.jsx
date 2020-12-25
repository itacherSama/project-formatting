import React from 'react';
import cn from 'classnames';
import styles from './BlockImg.module.css';

const BlockImg = ({ file, isImgSolo = false }) => {
  return (
    <div className={ cn(
      styles.blockImg,
      isImgSolo ? styles.blockImgSolo : styles.blockImgInList,
    ) }
    >
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
