import React from 'react';
import { useDropzone } from 'react-dropzone';
import cn from 'classnames';

import { setImages } from '@effector/event';
import { setFiles } from '@services/fileService';
import { IInfoImg } from '@interfaces/interfaces';
import DropzonePreview from './DropzonePreview';
import styles from './Dropzone.module.css';

const Dropzone: React.FC<{
  images: IInfoImg[];
  onCancelImg: (idx: number) => void;
}> = ({ images, onCancelImg }) => {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => setFiles(acceptedFiles, images, setImages),
  });

  return (
    <div
      className={cn(styles.container, {
        [styles.isDragActive]: isDragActive,
        [styles.isDragAccept]: isDragAccept,
        [styles.isDragReject]: isDragReject,
      })}
      {...getRootProps()}>
      <input {...getInputProps()} />
      <DropzonePreview images={images} onCancel={onCancelImg} />
    </div>
  );
};

export default Dropzone;
