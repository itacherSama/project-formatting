import { IInfoImg, ISettingImg, IImgCropValue, ICropFormData, ICropNewData } from './items';

export interface IDropzone {
  images: IInfoImg[];
  onCancelImg: (idx: number) => void;
}

export interface ICustomModal {
  children: any;
  open: boolean;
  onCloseModal: () => void;
}

export interface IThumb {
  file: IInfoImg;
}

export interface IDropzonePreview {
  images: IInfoImg[];
  onCancel: (idx: number) => void;
}

export interface ICropForm {
  onSetCrop: (data: ICropNewData) => void;
  onSetAspect: (data: ICropNewData) => void;
  getCropImage: () => void;
  cropPx: ICropFormData;
  cropPercent: ICropFormData;
  aspect: ICropFormData;
  typeCrop: string;
  typeCropWords: string[];
  setTypeCrop: (data: string) => void
}
