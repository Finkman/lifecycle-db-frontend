import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const entries = [
      { id: 11, deviceId: 1, date: "12-05-2017 13:44:00", type: 1 },
      { id: 12, deviceId: 1, date: "13-05-2017 13:44:00", type: 2 },
      { id: 13, deviceId: 1, date: "14-05-2017 13:44:00", type: 3 },
      { id: 14, deviceId: 1, date: "15-05-2017 13:44:00", type: 2 },
      { id: 15, deviceId: 1, date: "16-05-2017 13:44:00", type: 3 },
      { id: 16, deviceId: 1, date: "17-05-2017 13:44:00", type: 2 },
      { id: 17, deviceId: 1, date: "18-05-2017 13:44:00", type: 4 },
      { id: 18, deviceId: 1, date: "19-05-2017 13:44:00", type: 4 },
      { id: 19, deviceId: 1, date: "12-06-2017 13:44:00", type: 5 },
      { id: 20, deviceId: 1, date: "11-08-2017 13:44:00", type: 2 },
      { id: 21, deviceId: 2, date: "13-05-2017 15:34:00", type: 1 }
    ];
    return { entries };
  }
}
