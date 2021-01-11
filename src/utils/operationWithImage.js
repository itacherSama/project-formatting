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
        return;
      }

      blob.name = fileName;
      blob.preview = window.URL.createObjectURL(blob);
      resolve(blob);
    }, 'image/jpeg');
  });
};