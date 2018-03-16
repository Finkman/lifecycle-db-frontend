

export enum EntryType {
  HwVersion = 1,
  FwVersion,
  Defect,
  Shippment,
  Remark
}

export class DeviceEntry {
  id: number;
  device: number;
  date: Date;
  type: string;
  data: string;
}


export class Device {
  id: number;
  sn: number;
  production_date: Date;
  hwVersion: string;
  fwVersion: string;
}

export class Project {
  id: number;
  name: string;
}
