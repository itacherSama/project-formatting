import React from 'react';
import { useDropzone } from 'react-dropzone';
import { setImages } from '../../effector/event';
import DropzonePreview from './DropzonePreview';
import { setFiles } from '../../utils';
import { IDropzone } from '../../interfaces/components';
import useStyles from './styles';

const Dropzone: React.FC<IDropzone> = ({ images }) => {
  // console.log(images);
  // console.log(typeof images);
  
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

  const styles = useStyles({ isDragActive, isDragAccept, isDragReject });

  return (
    <div
      className={ styles.container }
      { ...getRootProps() }
    >
      <input { ...getInputProps() } />
      <DropzonePreview images={ images } />

    </div>
  );
};

export default Dropzone;
