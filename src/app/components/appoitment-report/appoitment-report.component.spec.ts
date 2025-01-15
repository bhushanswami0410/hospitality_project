import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoitmentReportComponent } from './appoitment-report.component';

describe('AppoitmentReportComponent', () => {
  let component: AppoitmentReportComponent;
  let fixture: ComponentFixture<AppoitmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppoitmentReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoitmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
