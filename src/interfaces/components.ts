import { IobjImg, ISettingImg, IPointOnImg, IImgCropValue, ICropFormData } from './items';

export interface IDropzone {
  images: IobjImg[];
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
  file: IobjImg;
}

export interface IGallery {
  files: IobjImg[];
  settings: ISettingImg[];
  onActiveModal: () => void;
  onCancelCropImg: (idx: number) => void;
}

export interface IDropzonePreview {
  images: IobjImg[];
  onCancel: (idx: number) => void;
}

export interface ICropForm {
  onSetCrop: (data: IImgCropValue) => void;
  onSetAspect: (data: any) => void;
  getCropImage: () => void;
  crop: ICropFormData;
  aspect: ICropFormData;
  typeCrop: string;
  typeCropWords: string[];
}
