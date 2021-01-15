import { IobjImg } from './items';

export interface IDropzone {
  images: IobjImg[];
}

export interface ICrop {
  src: string;
  addCropedImg: (img: IobjImg) => void;
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
  loadModal: () => void;
}

export interface IDropzonePreview {
  images: IobjImg[];
}