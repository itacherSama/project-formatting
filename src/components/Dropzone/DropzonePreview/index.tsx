import React from 'react';
import Thumb from '../../Thumb';
import CloseButton from '../../Buttons/CloseButton';
import styles from './DropzonePreview.module.css';
import { IDropzonePreview } from '../../../interfaces/components';
import { IobjImg } from '../../../interfaces/items';

const DropzonePreview: React.FC<IDropzonePreview> = ({ images, onCancel }) => {
  const Thumbs = images.map((file: IobjImg, idx: number) => (
    <div
      key={ `${file.name}_${idx}` }
      className={ styles.ThumbItem }
    >
      <Thumb
        file={ file }
      />
      <div className={ styles.closeBtn }>
        <CloseButton
          idx={ idx }
          onCancel={ onCancel }
        />
      </div>
    </div>
  ));

  if (images.length === 0) {
    return (
      <p className={ styles.thumbText }>
        Drag &apos;n drop some files here, or click to select files
      </p>
    );
  }
  return (
    <aside className={ styles.thumbContainer }>
      { Thumbs }
    </aside>
  );
};

export default DropzonePreview;
