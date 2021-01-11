export const getWidthAndHeightFromFile = (file) => {
  const img = new Image();
  img.src = file.preview;
  const imgWidth = img.width;
  const imgHeight = img.height;
  return { imgWidth, imgHeight };
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

export const setFiles = (acceptedFiles, oldFiles, setImages) => {
  const prevFiles = [...oldFiles];
  const newFiles = acceptedFiles.map((file) => Object.assign(file, {
    preview: URL.createObjectURL(file),
  }));

  const connectedFiles = prevFiles.concat(newFiles);
  setImages(connectedFiles);
};
