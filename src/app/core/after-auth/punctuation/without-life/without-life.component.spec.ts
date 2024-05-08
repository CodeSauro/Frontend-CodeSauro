import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutLifeComponent } from './without-life.component';

describe('WithoutLifeComponent', () => {
  let component: WithoutLifeComponent;
  let fixture: ComponentFixture<WithoutLifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithoutLifeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithoutLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
