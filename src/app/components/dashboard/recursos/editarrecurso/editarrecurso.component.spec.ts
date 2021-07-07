import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarrecursoComponent } from './editarrecurso.component';

describe('EditarrecursoComponent', () => {
  let component: EditarrecursoComponent;
  let fixture: ComponentFixture<EditarrecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarrecursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarrecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
