import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRecoveryComponent } from './request-recovery.component';

describe('RequestRecoveryComponent', () => {
  let component: RequestRecoveryComponent;
  let fixture: ComponentFixture<RequestRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestRecoveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
