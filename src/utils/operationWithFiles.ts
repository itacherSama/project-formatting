export const getWidthAndHeightFromFile = (file: any) => {
  const img = new Image();
  img.src = file.preview;
  const imgWidth = img.width;
  const imgHeight = img.height;
  return { imgWidth, imgHeight };
};

export const getLocalImage = (images: any, setImages: any) => {
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

export const setFiles = (acceptedFiles: any, oldFiles: any, setImages: any) => {
  const prevFiles = [...oldFiles];
  const newFiles = acceptedFiles.map((file: any) => Object.assign(file, {
    preview: URL.createObjectURL(file),
  }));

  const connectedFiles = prevFiles.concat(newFiles);
  setImages(connectedFiles);
};
