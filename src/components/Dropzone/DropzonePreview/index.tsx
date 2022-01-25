import React from 'react';
import { IInfoImg } from '@interfaces/items';
import Thumb from '@components/Thumb';
import CloseButton from '@components/Buttons/CloseButton';
import styles from './DropzonePreview.module.css';

const DropzonePreview: React.FC<{
  images: IInfoImg[];
  onCancel: (idx: number) => void;
}> = ({ images, onCancel }) => {
  const Thumbs = images.map((file: IInfoImg, idx: number) => (
    <div key={`${file.infoByFile.name}`} className={styles.ThumbItem}>
      <Thumb file={file} />
      <div className={styles.closeBtn}>
        <CloseButton idx={idx} onCancel={onCancel} />
      </div>
    </div>
  ));

  if (images.length === 0) {
    return <p className={styles.thumbText}>Drag &apos;n drop some files here, or click to select files</p>;
  }
  return <aside className={styles.thumbContainer}>{Thumbs}</aside>;
};

export default DropzonePreview;
