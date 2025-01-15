import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythologistComponent } from './pythologist.component';

describe('PythologistComponent', () => {
  let component: PythologistComponent;
  let fixture: ComponentFixture<PythologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PythologistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PythologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
