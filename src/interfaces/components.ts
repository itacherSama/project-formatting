import { IInfoImg, ISettingImg, IImgCropValue, ICropFormData } from './items';

export interface IDropzone {
  images: IInfoImg[];
  onCancelImg: (idx: number) => void;
}

export interface ICrop {
  src: string;
  point: any;
  addCropedImg: (base64Img: string, settingImg: ISettingImg) => void;
  onCloseModal: () => void;
}

export interface ICustomModal {
  children: any;
  open: boolean;
  onCloseModal: () => void;
}

export interface IThumb {
  file: IInfoImg;
}

export interface IGallery {
  files: IInfoImg[];
  settings: ISettingImg[];
  onActiveModal: () => void;
  onCancelCropImg: (idx: number) => void;
}

export interface IDropzonePreview {
  images: IInfoImg[];
  onCancel: (idx: number) => void;
}

export interface ICropForm {
  onSetCrop: (data: any) => void;
  // onSetAspect: (data: any) => void;
  getCropImage: () => void;
  cropPx: ICropFormData;
  cropPercent: ICropFormData;
  // aspect: ICropFormData;
  typeCrop: string;
  typeCropWords: string[];
}
