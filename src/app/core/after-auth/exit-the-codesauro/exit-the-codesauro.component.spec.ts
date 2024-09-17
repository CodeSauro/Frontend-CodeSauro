import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitTheCodesauroComponent } from './exit-the-codesauro.component';

describe('ExitTheCodesauroComponent', () => {
  let component: ExitTheCodesauroComponent;
  let fixture: ComponentFixture<ExitTheCodesauroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExitTheCodesauroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExitTheCodesauroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
