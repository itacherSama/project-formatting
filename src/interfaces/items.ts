export interface IobjImg extends Blob {
  preview?: string;
  name?: string;
  imgWidth?: number;
  imgHeight?: number;
}

export interface IobjIdxKitImages {
  maxIdx: number;
  idx: number;
}

export interface IvalueOfSelect {
  name?: string | undefined;
  value: unknown;
}