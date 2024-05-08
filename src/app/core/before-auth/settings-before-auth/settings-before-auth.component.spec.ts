import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsBeforeAuthComponent } from './settings-before-auth.component';

describe('SettingsBeforeAuthComponent', () => {
  let component: SettingsBeforeAuthComponent;
  let fixture: ComponentFixture<SettingsBeforeAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsBeforeAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsBeforeAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
