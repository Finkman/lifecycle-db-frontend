import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const entryTypes = ["HwVersion", "FwVersion", "Defect", "Shippment", "Remark"];

    const entries = [
      { id: 11, deviceId: 1, date: "2017-01-12 13:44:00", type: "HwVersion", data: "V1.4" },
      { id: 12, deviceId: 1, date: "2017-01-23 10:44:00", type: "FwVersion", data: "V1.3.0" },
      { id: 13, deviceId: 1, date: "2017-05-12 13:44:00", type: "Defect", data: "defect C1" },
      { id: 14, deviceId: 1, date: "2017-06-12 13:44:00", type: "FwVersion", data: "V1.3.1" },
      { id: 15, deviceId: 1, date: "2017-07-12 13:44:00", type: "Defect", data: "connector broken" },
      { id: 16, deviceId: 1, date: "2017-08-12 13:44:00", type: "FwVersion", data: "V1.3.2" },
      { id: 17, deviceId: 1, date: "2017-08-12 13:45:00", type: "Shippment" },
      { id: 18, deviceId: 1, date: "2018-05-12 13:44:00", type: "Shippment" },
      { id: 19, deviceId: 1, date: "2017-05-12 13:44:00", type: "Remark", data: "Reserve" },
      { id: 20, deviceId: 1, date: "2017-05-12 13:44:00", type: "FwVersion", data: "V1.3.4" },
      { id: 21, deviceId: 2, date: "2017-05-12 13:44:00", type: "HwVersion", data: "V1.4.1" }
    ];

    const devices = [
      {
        id: 1, sn: 2011, production_date: "2017-05-12 13:44:00",
        hwVersion: "V1.4",
        fwVersion: "V1.3.1"
      },
      {
        id: 2, sn: 2012, production_date: "2017-08-20 23:33:10",
        hwVersion: "V2.0",
        fwVersion: "V1.3.2"
      }
    ];

    const hwVersions = ["V1.2.8", "V1.3.0", "V1.3.1", "V1.4.0", "V2.0"];

    const fwVersions = ["V1.3.0", "V1.3.1", "V1.3.2", "V2.0.0", "V2.0.1", "V2.1.1"];

    return { entryTypes, entries, devices, hwVersions, fwVersions };
  }
}
