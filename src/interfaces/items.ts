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

export interface IMyLink {
  href: string,
  onClick?: () => void,
  children?: any
}

export interface IAspectState {
  height: number | string;
  width: number | string;
}

export interface ITypeCrop {
  current: string;
  last: string | null;

}

