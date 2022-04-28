import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegstrationFrameComponent } from './regstration-frame.component';

describe('RegstrationFrameComponent', () => {
  let component: RegstrationFrameComponent;
  let fixture: ComponentFixture<RegstrationFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegstrationFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegstrationFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
