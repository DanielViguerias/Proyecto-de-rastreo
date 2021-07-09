import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLugaresComponent } from './editar-lugares.component';

describe('EditarLugaresComponent', () => {
  let component: EditarLugaresComponent;
  let fixture: ComponentFixture<EditarLugaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarLugaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
