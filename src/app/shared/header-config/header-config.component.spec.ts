import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderConfigComponent } from './header-config.component';

describe('HeaderConfigComponent', () => {
  let component: HeaderConfigComponent;
  let fixture: ComponentFixture<HeaderConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
