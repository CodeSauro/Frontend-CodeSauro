import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutLifeLockedMapComponent } from './without-life-locked-map.component';

describe('WithoutLifeLockedMapComponent', () => {
  let component: WithoutLifeLockedMapComponent;
  let fixture: ComponentFixture<WithoutLifeLockedMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithoutLifeLockedMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithoutLifeLockedMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
