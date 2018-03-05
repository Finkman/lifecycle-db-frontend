
enum EntryType {
  HwVersion = 1,
  SwVersion,
  Defect,
  Shippment,
  Remark
}

export class DeviceEntry {
  id: number;
  date: Date;
  type: EntryType;
  obj: Object;
}
