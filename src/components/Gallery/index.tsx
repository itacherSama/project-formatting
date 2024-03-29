import * as React from 'react';
import Masonry from 'react-masonry-component';
import cn from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseButton from 'components/Buttons/CloseButton';
import { calcProportion, getTypeByPropotion } from 'services/imageService';
import { IInfoImg, ISettingImgWithNulable } from 'interfaces/interfaces';

import styles from './Gallery.module.css';

const typesBlock = ['width', 'height'];
const widthForPreview = 160;
const heightForPreview = 180;

type Props = {
  files: IInfoImg[];
  settings: ISettingImgWithNulable[];
  onActiveModal: (cropNumber?: number) => void;
  onCancelCropImg: (idx: number) => void;
};

const Gallery = ({ files, onActiveModal, onCancelCropImg, settings = [] }: Props) => {
  const masonryOptions: Masonry.MasonryOptions = {
    itemSelector: `.${styles.gridImage}`,
    horizontalOrder: true,
    columnWidth: 1,
  };

  const childElements =
    !!files?.length &&
    !!settings.length &&
    files.map((file: IInfoImg, idx: number) => {
      const currentSettings = settings[idx];
      const proportionWidth: number = calcProportion(currentSettings.width!, widthForPreview, currentSettings.height!);
      const proportionHeight: number = calcProportion(
        currentSettings.height!,
        heightForPreview,
        currentSettings.width!
      );

      const currentType: string = getTypeByPropotion(proportionWidth, proportionHeight, typesBlock);
      return (
        <li
          key={file.infoByFile.lastModified}
          className={cn(styles.gridImage, {
            [styles.gridItemWidth]: currentType === typesBlock[0],
            [styles.gridItemHeight]: currentType === typesBlock[1],
          })}
          onClick={() => onActiveModal(idx)}
        >
          <img alt={`img_${idx}`} className={styles.gridItemImg} src={file.preview} />

          <div className={styles.closeBtn}>
            <CloseButton idx={idx} onCancel={onCancelCropImg} />
          </div>
        </li>
      );
    });

  return (
    <Masonry className={styles.grid} elementType="ul" options={masonryOptions}>
      {childElements}
      <li key="addBtn" className={cn(styles.gridImage, styles.gridItemAdd)}>
        <IconButton aria-label="add" className={styles.iconButton} color="primary" onClick={() => onActiveModal()}>
          <AddIcon fontSize="large" />
        </IconButton>
      </li>
    </Masonry>
  );
};

export default Gallery;
