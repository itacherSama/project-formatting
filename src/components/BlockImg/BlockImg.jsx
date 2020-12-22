import React from 'react';
import cn from 'classnames';

const BlockImg = ({ file, isImgSolo = false }) => {
  return (
    <div className={ cn(
      'blockImg',
      isImgSolo ? 'blockImgSolo' : 'blockImgInList',
    ) }
    >
      <div className={ 'blockImgInner' }>
        <img
          alt={ file.name }
          src={ file.preview }
        />
      </div>
    </div>
  );
};

export default BlockImg;
