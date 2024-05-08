import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeStarsComponent } from './three-stars.component';

describe('ThreeStarsComponent', () => {
  let component: ThreeStarsComponent;
  let fixture: ComponentFixture<ThreeStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeStarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreeStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
