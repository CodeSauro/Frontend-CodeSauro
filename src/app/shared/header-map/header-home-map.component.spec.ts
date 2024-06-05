import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHomeMapComponent } from './header-home-map.component';

describe('HeaderHomeMapComponent', () => {
  let component: HeaderHomeMapComponent;
  let fixture: ComponentFixture<HeaderHomeMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderHomeMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderHomeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
