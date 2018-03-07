import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const entries = [
      { id: 11, deviceId: 1, date: "2017-05-12 13:44:00", type: 1, data: "V1.4" },
      { id: 12, deviceId: 1, date: "2017-05-12 13:44:00", type: 2, data: "V1.3.0" },
      { id: 13, deviceId: 1, date: "2017-05-12 13:44:00", type: 3, data: "defect C1" },
      { id: 14, deviceId: 1, date: "2017-05-12 13:44:00", type: 2, data: "V1.3.1" },
      { id: 15, deviceId: 1, date: "2017-05-12 13:44:00", type: 3, data: "connector broken" },
      { id: 16, deviceId: 1, date: "2017-05-12 13:44:00", type: 2, data: "V1.3.2" },
      { id: 17, deviceId: 1, date: "2017-05-12 13:44:00", type: 4 },
      { id: 18, deviceId: 1, date: "2017-05-12 13:44:00", type: 4 },
      { id: 19, deviceId: 1, date: "2017-05-12 13:44:00", type: 5, data: "Reserve" },
      { id: 20, deviceId: 1, date: "2017-05-12 13:44:00", type: 2 data: "V1.3.4" },
      { id: 21, deviceId: 2, date: "2017-05-12 13:44:00", type: 1, data: "V1.4.1" }
    ];

    const devices = [
      {
        device:
          { id: 1, production_date: "2017-05-12 13:44:00" },
        hwVersion: "V1.4",
        fwVersion: "V1.3.1"
      },
      {
        device:
          { id: 2, production_date: "2017-05-12 13:44:00" },
        hwVersion: "V1.4",
        fwVersion: "V1.3.2"
      }
    ];

    return { entries, devices };
  }
}
