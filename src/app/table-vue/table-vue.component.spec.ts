import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVueComponent } from './table-vue.component';

describe('TableVueComponent', () => {
  let component: TableVueComponent;
  let fixture: ComponentFixture<TableVueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableVueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableVueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
