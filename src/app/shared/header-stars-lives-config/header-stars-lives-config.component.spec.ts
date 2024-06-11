import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStarsLivesComponent } from './header-stars-lives-config.component';

describe('HeaderStarsLivesComponent', () => {
  let component: HeaderStarsLivesComponent;
  let fixture: ComponentFixture<HeaderStarsLivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderStarsLivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderStarsLivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
