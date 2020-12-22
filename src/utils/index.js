export const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

export const setFiles = (acceptedFiles, oldFiles, setImages) => {
  const prevFiles = [...oldFiles];
  const newFiles = acceptedFiles.map((file) => Object.assign(file, {
    preview: URL.createObjectURL(file),
  }));

  const connectedFiles = prevFiles.concat(newFiles);
  setImages(connectedFiles);
};
