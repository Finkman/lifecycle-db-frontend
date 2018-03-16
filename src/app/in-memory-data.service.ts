import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const entryTypes = ["HwVersion", "FwVersion", "Defect", "Shippment", "Remark"];

    const entries = [
      { id: 11, deviceId: 1, date: "2017-01-12", type: "HwVersion", data: "V1.4" },
      { id: 12, deviceId: 1, date: "2017-01-23", type: "FwVersion", data: "V1.3.0" },
      { id: 13, deviceId: 1, date: "2017-05-12", type: "Defect", data: "defect C1" },
      { id: 14, deviceId: 1, date: "2017-06-12", type: "FwVersion", data: "V1.3.1" },
      { id: 15, deviceId: 1, date: "2017-07-12", type: "Defect", data: "connector broken" },
      { id: 16, deviceId: 1, date: "2017-08-12", type: "FwVersion", data: "V1.3.2" },
      { id: 17, deviceId: 1, date: "2017-08-12", type: "Shippment" },
      { id: 18, deviceId: 1, date: "2018-05-12", type: "Shippment" },
      { id: 19, deviceId: 1, date: "2017-05-12", type: "Remark", data: "Reserve" },
      { id: 20, deviceId: 1, date: "2017-05-12", type: "FwVersion", data: "V1.3.4" },
      { id: 21, deviceId: 2, date: "2017-05-12", type: "HwVersion", data: "V1.4.1" }
    ];

    const devices = [
      {
        id: 1, sn: 2011, production_date: "2017-05-12",
        hwVersion: "V1.4",
        fwVersion: "V1.3.1"
      },
      {
        id: 2, sn: 2012, production_date: "2017-08-20",
        hwVersion: "V2.0",
        fwVersion: "V1.3.2"
      }
    ];

    const entryDataTags = [
      { type: "HwVersion", data: "V1.4" },
      { type: "FwVersion", data: "V1.3.0" },
      { type: "Defect", data: "defect C1" },
      { type: "FwVersion", data: "V1.3.1" },
      { type: "Defect", data: "connector broken" },
      { type: "FwVersion", data: "V1.3.2" },
      { type: "Remark", data: "Reserve" },
      { type: "FwVersion", data: "V1.3.4" },
      { type: "HwVersion", data: "V1.4.1" }
    ];

    return { entryTypes, entries, devices, entryDataTags };
  }
}
