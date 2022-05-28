import React from 'react';
import { IInfoImg } from 'interfaces/interfaces';
import Thumb from 'components/Thumb';
import CloseButton from 'components/Buttons/CloseButton';
import styles from './DropzonePreview.module.css';

type Props = {
  images: IInfoImg[];
  onCancel: (idx: number) => void;
};

const DropzonePreview = ({ images, onCancel }: Props) => {
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
