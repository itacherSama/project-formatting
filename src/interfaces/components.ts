export interface IDropzone {
  images: any;
}

export interface ICrop {
  src: any;
  addCropedImg: (img: any) => void;
  onCloseModal: () => void;
}

export interface ICustomModal {
  children: any;
  open: boolean;
  onCloseModal: () => void; 
}

export interface IThumb {
  file: any;
} 

export interface IGallery {
  files: any;
  loadModal: () => void;
}

export interface IDropzonePreview {
  images: any;
}