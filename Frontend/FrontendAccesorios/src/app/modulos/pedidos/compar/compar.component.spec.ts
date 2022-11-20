import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparComponent } from './compar.component';

describe('ComparComponent', () => {
  let component: ComparComponent;
  let fixture: ComponentFixture<ComparComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
