import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHomeAuthComponent } from './header-home-auth.component';

describe('HeaderHomeAuthComponent', () => {
  let component: HeaderHomeAuthComponent;
  let fixture: ComponentFixture<HeaderHomeAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderHomeAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderHomeAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
