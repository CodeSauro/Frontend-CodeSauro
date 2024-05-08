import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroStarComponent } from './zero-star.component';

describe('ZeroStarComponent', () => {
  let component: ZeroStarComponent;
  let fixture: ComponentFixture<ZeroStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZeroStarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZeroStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
