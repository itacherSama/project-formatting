import React from "react";
import ReactCrop from "react-image-crop";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useStore } from "effector-react";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "../../utils/operationWithImage";
import { $numberImg } from "../../effector/store";
import { nextNumberImg } from "../../effector/event";
import { ICrop } from "../../interfaces/components";
import styles from "./Crop.module.css";

const Crop: React.FC<ICrop> = ({ addCropedImg, src, onCloseModal }) => {
  const [imageRef, setImageRef] = React.useState<any>(null);
  const numberImg = useStore($numberImg);
  const [crop, setCrop] = React.useState<ReactCrop.Crop>({
    unit: "px",
    width: 0,
    height: 0,
  });

  const onCropChange = (newCrop: ReactCrop.Crop) => {
    setCrop(newCrop);
  };

  const makeClientCrop = async (crop: ReactCrop.Crop) => {
    if (imageRef && crop.width && crop.height) {
      const blobObj = await getCroppedImg(imageRef, crop, `${numberImg}.jpeg`);
      blobObj.imgWidth = crop.width;
      blobObj.imgHeight = crop.height;
      addCropedImg(blobObj);
    }
  };

  const onImageLoaded = (image: any) => {
    setImageRef(image);
  };

  const onCropComplete = () => {
    makeClientCrop(crop);
    nextNumberImg();
    onCloseModal();
  };
  /*  const dischargeCrop = () => {
    const defaultValue: ReactCrop.Crop = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
    setCrop((prev) => {
      return { ...prev, defaultValue };
    });
  }; */

  const setCropHeight = (event: any) => {
    const { value } = event.target;
    const height = parseInt(value);
    if (height) {
      const y = (imageRef.height - height) / 2;
      setCrop({
        ...crop,
        height,
        y,
      });
    }
  };

  const setCropWidth = (event: any) => {
    const { value } = event.target;
    const width = parseInt(value);
    if (width) {
      const x = (imageRef.width - width) / 2;
      setCrop({
        ...crop,
        width,
        x,
      });
    }
  };

  return (
    <>
      <ReactCrop
        crop={ crop }
        onChange={ onCropChange }
        onImageLoaded={ onImageLoaded }
        src={ src }
      />
      <form
        autoComplete="off"
        className={ styles.cropForm }
        noValidate
      >
        <TextField
          label="Height"
          onChange={ setCropHeight }
          type="number"
          value={ crop.height }
        />
        <TextField
          label="Width"
          onChange={ setCropWidth }
          type="number"
          value={ crop.width }
        />
        { /* <Button label="Width" onClick={ dischargeCrop }>Отмена</Button> */ }
        <Button
          color="primary"
          onClick={ onCropComplete }
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default Crop;
