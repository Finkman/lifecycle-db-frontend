import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const entries = [
      { id: 11, deviceId: 1, date: "12-05-2017 13:44:00" },
      { id: 12, deviceId: 2, date: "13-05-2017 15:34:00" }
    ];
    return { entries };
  }
}
