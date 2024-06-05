import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeValidationSquareBoxComponent } from './knowledge-validation-square-box.component';

describe('KnowledgeValidationSquareBoxComponent', () => {
  let component: KnowledgeValidationSquareBoxComponent;
  let fixture: ComponentFixture<KnowledgeValidationSquareBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgeValidationSquareBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KnowledgeValidationSquareBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
