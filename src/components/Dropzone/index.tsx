import React from 'react';
import { useDropzone } from 'react-dropzone';
import cn from 'classnames';
import { setImages } from '../../effector/event';
import DropzonePreview from './DropzonePreview';
import { setFiles } from '../../services/fileService';
import { IDropzone } from '../../interfaces/components';

import styles from './Dropzone.module.css';

const Dropzone: React.FC<IDropzone> = ({ images, onCancelImg }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => setFiles(acceptedFiles, images, setImages),
  });

  return (
    <div
      className={ cn(styles.container, {
        [styles.isDragActive]: isDragActive,
        [styles.isDragAccept]: isDragAccept,
        [styles.isDragReject]: isDragReject
      }) }
      { ...getRootProps() }
    >
      <input { ...getInputProps() } />
      <DropzonePreview
        images={ images }
        onCancel={ onCancelImg }
      />

    </div>
  );
};

export default Dropzone;
