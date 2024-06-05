import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeValidationRectangularBoxComponent } from './knowledge-validation-rectangular-box.component';

describe('KnowledgeValidationRectangularBoxComponent', () => {
  let component: KnowledgeValidationRectangularBoxComponent;
  let fixture: ComponentFixture<KnowledgeValidationRectangularBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgeValidationRectangularBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KnowledgeValidationRectangularBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
