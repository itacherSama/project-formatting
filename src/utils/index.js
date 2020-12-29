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
  console.log(JSON.stringify(connectedFiles[0]));
  setImages(connectedFiles);
};

export const getWidthAndHeightFromFile = (file) => {
  const img = new Image();
  img.src = file.preview;
  const imgWidth = img.width;
  const imgHeight = img.height;
  return { imgWidth, imgHeight };
};

export const calcProportion = (firstArg, necessarySize, secondArg) => {
  const propotion = Math.round(firstArg * (necessarySize / secondArg));
  return propotion;
};

export const getTypeByPropotion = (proportionWidth, proportionHeight, types) => {
  if ((proportionWidth / proportionHeight) > 1) {
    return types[0];
  } else {
    return types[1];
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

export const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

export const getCroppedImg = (image, crop, fileName) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        // reject(new Error('Canvas is empty'));
        console.error('Canvas is empty');
        return;
      }
      blob.name = fileName;
      // window.URL.revokeObjectURL(this.fileUrl);
      const fileUrl = window.URL.createObjectURL(blob);
      resolve(fileUrl);
    }, 'image/jpeg');
  });
};
