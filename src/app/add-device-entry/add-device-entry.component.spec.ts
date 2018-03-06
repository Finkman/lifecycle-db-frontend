import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceEntryComponent } from './add-device-entry.component';

describe('AddDeviceEntryComponent', () => {
  let component: AddDeviceEntryComponent;
  let fixture: ComponentFixture<AddDeviceEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeviceEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
