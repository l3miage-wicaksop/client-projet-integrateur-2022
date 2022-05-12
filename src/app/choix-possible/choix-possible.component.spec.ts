import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixPossibleComponent } from './choix-possible.component';

describe('ChoixPossibleComponent', () => {
  let component: ChoixPossibleComponent;
  let fixture: ComponentFixture<ChoixPossibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixPossibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixPossibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
