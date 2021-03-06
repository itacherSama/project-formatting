
export interface IobjIdxKitImages {
  maxIdx: number;
  idx: number;
}

export interface IvalueOfSelect {
  name?: string | undefined;
  value: unknown;
}

export interface IMyLink {
  href: string,
  onClick?: () => void,
  children?: any
}

export interface ICropFormData {
  height: number;
  width: number;
}

export interface ITypeCrop {
  current: string;
  last: string | null;

}

export interface IPointOnImg {
  x: number;
  y: number;
}

export interface ISettingImg {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IobjImg extends File {
  preview?: string;
}

export interface ISettingsImage {
  point: IPointOnImg;
  items: ISettingImg[];
}

export interface ISettingsPointAndIdx {
  pointOnImg: IPointOnImg;
  idx: number;
}

export interface IImgCropValue {
  type: string;
  value: number;
}

export interface IImgSettingsNaturalSize {
  naturalWidth: number;
  naturalHeight: number;
}

