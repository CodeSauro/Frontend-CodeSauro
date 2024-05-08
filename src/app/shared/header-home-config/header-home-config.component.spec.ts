import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHomeConfigComponent } from './header-home-config.component';

describe('HeaderHomeConfigComponent', () => {
  let component: HeaderHomeConfigComponent;
  let fixture: ComponentFixture<HeaderHomeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderHomeConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderHomeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
