

export enum EntryType {
  HwVersion = 1,
  FwVersion,
  Defect,
  Shippment,
  Remark
}

export class DeviceEntry {
  id: number;
  deviceId: number;
  date: Date;
  type: EntryType;
  obj: Object;
}


export class Device {
  id: number;
  production_date: Date;
}

export class DeviceSummary {
  device: Device;
  hwVersion: string;
  fwVersion: string;
}
