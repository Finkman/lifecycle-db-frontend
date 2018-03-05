import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceEntriesComponent } from './device-entries.component';

describe('DeviceEntriesComponent', () => {
  let component: DeviceEntriesComponent;
  let fixture: ComponentFixture<DeviceEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
