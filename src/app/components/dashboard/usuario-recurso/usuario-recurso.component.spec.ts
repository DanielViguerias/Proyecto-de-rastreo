import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRecursoComponent } from './usuario-recurso.component';

describe('UsuarioRecursoComponent', () => {
  let component: UsuarioRecursoComponent;
  let fixture: ComponentFixture<UsuarioRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioRecursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
