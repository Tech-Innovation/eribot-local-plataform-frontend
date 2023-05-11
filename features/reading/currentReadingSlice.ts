export enum BarcodeSource {
  FromUser,
  FromScanner,
  FromPlataform,
}

export enum BarcodeStatus {
  Readble,
  Unreadable,
  Empty,
}

export enum LoadUnitBarcodeOrigin {
  Pallet,
  LPN,
  Any,
}

export interface ICellBarcode {
  label: string;
  source: BarcodeSource;
  status: BarcodeStatus;
  date: string;
}

export interface ILoadUnitBarcode {
  label: string;
  source: BarcodeSource;
  status: BarcodeStatus;
  origin: LoadUnitBarcodeOrigin;
  date: string;
}

export type CurrentReadingState = {
  cellBarcode: ICellBarcode | undefined;
  loadUnitsBarcodes: ILoadUnitBarcode[];
};
