import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAuthHomeComponent } from './header-auth-home.component';

describe('HeaderAuthHomeComponent', () => {
  let component: HeaderAuthHomeComponent;
  let fixture: ComponentFixture<HeaderAuthHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAuthHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAuthHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
