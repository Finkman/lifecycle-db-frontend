import { Pipe, PipeTransform } from '@angular/core';

import { EntryType } from './device';

const labelTextLut = new Map([
  [EntryType.HwVersion, `Hardware Version Code`],
  [EntryType.FwVersion, `Firmware Version Code`],
  [EntryType.Defect, `Defect Report`],
  [EntryType.Shippment, ''],
  [EntryType.Remark, `Remark`],
]);

@Pipe({ name: 'entryType' })
export class EntryTypePipe implements PipeTransform {
  transform(value: any): string {
    if (value in EntryType) {
      let t: EntryType = value as EntryType;
      return labelTextLut.get(+EntryType[t]);
    }
    else {
      return "Unknown";
    }
  }
}
