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

export const getWidthAndHeightFromFile = (file) => {
  const imageObj = new Image();
  imageObj.src = file.preview;
  const imgWidth = imageObj.width;
  const imgHeight = imageObj.height;
  return { imgWidth, imgHeight };
};

export const calcProportion = (firstArg, necessarySize, secondArg) => {
  const propotion = Math.round(firstArg * (necessarySize / secondArg));
  return propotion;
};

export const getTypeByPropotion = (proportionWidth, proportionHeight, types) => {
  if ((Math.round(proportionWidth / proportionHeight)) > 1) {
    return types[1];
  } else if ((proportionHeight / proportionWidth) > 1) {
    return types[2];
  } else {
    return types[0];
  }
};

export const getLocalImage = (images, setImages) => {
  fetch(images)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], 'File name', { type: 'image/png' });
      const newFiles = [file].map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file),
      }));
      setImages([...newFiles, ...newFiles]);
    });
};
