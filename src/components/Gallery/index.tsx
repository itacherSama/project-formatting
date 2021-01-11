import * as React from 'react';
import Masonry from 'react-masonry-component';
import cn from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import { calcProportion, getTypeByPropotion } from '../../utils';
import styles from './Gallery.module.css';
import { IGallery } from '../../interfaces/components';

const typesBlock = ['width', 'height'];

const Gallery: React.FC<IGallery> = ({ files, loadModal }) => {
  const masonryOptions = {
    itemSelector: `.${ styles.gridImage }`,
    horizontalOrder: true,
    columnWidth: 1,
  };

  const childElements = files.map((file: any, idx: number) => {
    const proportionWidth = calcProportion(file.imgWidth, 160, file.imgHeight);
    const proportionHeight = calcProportion(file.imgHeight, 180, file.imgWidth);

    const currentType = getTypeByPropotion(proportionWidth, proportionHeight, typesBlock);
    return (
      <li
        key={ idx } className={ cn(
          styles.gridImage,
          {
            [styles.gridItemWidth]: currentType === typesBlock[0],
            [styles.gridItemHeight]: currentType === typesBlock[1],
          },

        ) }
      >
        <img alt={ `img_${idx}` } className={ styles.gridItemImg } src={ file.preview } />
      </li>
    );
  });

  return (
    <>
      <Masonry className={ styles.grid } elementType="ul" options={ masonryOptions }>
        {childElements}
        <li
          className={ 
          cn( styles.gridImage, styles.gridItemAdd ) 
          }
          onClick={ loadModal }
        >
          <IconButton
            aria-label="add" className={ styles.iconButton } color='primary'
          >
            <AddIcon fontSize='large' />
          </IconButton>
        </li>
      </Masonry>
    </>
  );
};

export default Gallery;
