import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheDefisComponent } from './affiche-defis.component';

describe('AfficheDefisComponent', () => {
  let component: AfficheDefisComponent;
  let fixture: ComponentFixture<AfficheDefisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficheDefisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficheDefisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
