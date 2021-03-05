import { IobjImg, ISettingImg } from './items';

export interface IDropzone {
  images: IobjImg[];
  onCancelImg: (idx: number) => void;
}

export interface ICrop {
  src: string;
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