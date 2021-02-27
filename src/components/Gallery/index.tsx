import * as React from 'react';
import Masonry from 'react-masonry-component';
import cn from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseButton from '../Buttons/CloseButton';
import { calcProportion, getTypeByPropotion } from '../../services/imageService';
import { IGallery } from '../../interfaces/components';
import { IobjImg } from '../../interfaces/items';

import styles from './Gallery.module.css';

const typesBlock = ['width', 'height'];

const widthForPreview = 160;
const heightForPreview = 180;

const Gallery: React.FC<IGallery> = ({ files, onActiveModal, onCancelCropImg }) => {
  const masonryOptions: Masonry.MasonryOptions = {
    itemSelector: `.${ styles.gridImage }`,
    horizontalOrder: true,
    columnWidth: 1,
  };
  
  const childElements = files.map((file: IobjImg, idx: number) => {
    const proportionWidth: number = calcProportion(file.settingImg!.width, widthForPreview, file.settingImg!.height);
    const proportionHeight: number = calcProportion(file.settingImg!.height, heightForPreview, file.settingImg!.width);

    const currentType: string = getTypeByPropotion(proportionWidth, proportionHeight, typesBlock);
    return (
      <li
        key={ idx }
        className={ cn(
          styles.gridImage,
          {
            [styles.gridItemWidth]: currentType === typesBlock[0],
            [styles.gridItemHeight]: currentType === typesBlock[1],
          },

        ) }
      >
        <img
          alt={ `img_${idx}` }
          className={ styles.gridItemImg }
          src={ file.preview }
        />

        <div className={ styles.closeBtn }>
          <CloseButton
            idx={ idx }
            onCancel={ onCancelCropImg }
          />
        </div>

      </li>
    );
  });

  return (
    <Masonry
      className={ styles.grid }
      elementType="ul"
      options={ masonryOptions }
    >
      { childElements }
      <li
        className={ 
          cn( styles.gridImage, styles.gridItemAdd ) 
        }
        onClick={ onActiveModal }
      >
        <IconButton
          aria-label="add"
          className={ styles.iconButton }
          color='primary'
        >
          <AddIcon fontSize='large' />
        </IconButton>
      </li>
    </Masonry>
  );
};

export default Gallery;
