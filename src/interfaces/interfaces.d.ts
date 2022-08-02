export interface IobjIdxKitImages {
  maxIdx: number;
  idx: number;
}

export type Nullable<T> = T | null;

export interface IvalueOfSelect {
  name?: string | undefined;
  value: unknown;
}

export interface ICropFormData {
  height: Nullable<number>;
  width: Nullable<number>;
}

export interface ICropFormDataAspect {
  value: Nullable<number>;
  sides: ICropFormData;
  used: boolean;
}

export interface IPointPlace {
  x: Nullable<number>;
  y: Nullable<number>;
}

export interface IPointOnImg {
  pointWidth: Nullable<number>;
  pointPlace: IPointPlace;
}

export interface ISettingImg {
  x: Nullable<number>;
  y: Nullable<number>;
  width: Nullable<number>;
  height: Nullable<number>;
}

export interface IInfoImg {
  infoByFile: File;
  preview?: string;
}

export interface ISettingsImage {
  point: IPointOnImg;
  items: ISettingImg[];
}

export interface IImgSettingsNaturalSize {
  naturalWidth: number;
  naturalHeight: number;
}

export interface ISettingStepContent {
  step: number;
  handleComplete: () => void;
  handleBack: () => void;
  visibleBtnPrevArr?: Array<boolean>;
  visibleBtnNextArr?: Array<boolean>;
}

export type PossibleStringType = string | ArrayBuffer | null;

export interface ICropNewData {
  width?: Nullable<number>;
  height?: Nullable<number>;
}

export interface ISteps {
  [propName: string]: boolean;
}

export interface IAllNumber {
  [propName: string]: number;
}

export interface INewSettingsForKitImages {
  transformedSettings: ISettingsImage;
  idx: number;
}

export interface IKitImageSettings {
  settingImg: ISettingImg;
  dataByNaturalSize: IImgSettingsNaturalSize;
  idx: number;
}

export interface IPointImgInKitImages {
  pointOnImg: IPointOnImg;
  idx: number;
}

export interface ICancelCropImg {
  idx: number;
  idxImg: number;
}

export interface ISetKitImages {
  kitImages: IInfoImg[];
  idx: number;
}

export interface ILoadState {
  images: boolean;
  settings: boolean;
}

export interface ICurrentChangeCrop {
  idImg: number;
  idCrop: number;
}
