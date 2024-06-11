import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPhasesComponent } from './header-phases.component';

describe('HeaderPhasesComponent', () => {
  let component: HeaderPhasesComponent;
  let fixture: ComponentFixture<HeaderPhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPhasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
