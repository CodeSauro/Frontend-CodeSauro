import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAfterAuthComponent } from './settings-after-auth.component';

describe('SettingsAfterAuthComponent', () => {
  let component: SettingsAfterAuthComponent;
  let fixture: ComponentFixture<SettingsAfterAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsAfterAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsAfterAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
