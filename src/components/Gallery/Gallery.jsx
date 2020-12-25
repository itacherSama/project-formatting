import * as React from 'react';
import Masonry from 'react-masonry-component';
import cn from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import { getWidthAndHeightFromFile, calcProportion, getTypeByPropotion } from '../../utils';
import styles from './Gallery.module.css';

const typesBlock = ['normal', 'width', 'height'];

function Gallery({ files }) {
  const masonryOptions = {
    itemSelector: `.${styles.gridImage}`,
    horizontalOrder: true,
    columnWidth: 1,
  };

  const childElements = files.map((file, idx) => {
    const { imgWidth, imgHeight } = getWidthAndHeightFromFile(file);

    const proportionWidth = calcProportion(imgWidth, 160, imgHeight);
    const proportionHeight = calcProportion(imgHeight, 180, imgWidth);

    const currentType = getTypeByPropotion(proportionWidth, proportionHeight, typesBlock);

    return (
      <li
        className={ cn(
          styles.gridImage,
          {
            [styles.gridItemDefault]: currentType === typesBlock[0],
            [styles.gridItemWidth]: currentType === typesBlock[1],
            [styles.gridItemHeight]: currentType === typesBlock[2],
          },
        ) } key={ idx }
      >
        <img className={ styles.gridItemImg } src={ file.preview } />
      </li>
    );
  });

  return (
    <>
      <Masonry className={ styles.grid } elementType="ul" options={ masonryOptions }>
        {childElements}
        <li className={ cn(styles.gridImage, styles.gridItemAdd) }>
          <IconButton
            aria-label="add" className={ styles.iconButton } color='primary'
          >
            <AddIcon fontSize='large' />
          </IconButton>
        </li>
      </Masonry>
    </>
  );
}

export default Gallery;
