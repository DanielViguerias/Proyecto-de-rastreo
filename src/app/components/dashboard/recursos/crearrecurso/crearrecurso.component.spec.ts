import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearrecursoComponent } from './crearrecurso.component';

describe('CrearrecursoComponent', () => {
  let component: CrearrecursoComponent;
  let fixture: ComponentFixture<CrearrecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearrecursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearrecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
