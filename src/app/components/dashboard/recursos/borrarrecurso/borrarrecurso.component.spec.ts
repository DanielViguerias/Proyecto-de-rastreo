import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarrecursoComponent } from './borrarrecurso.component';

describe('BorrarrecursoComponent', () => {
  let component: BorrarrecursoComponent;
  let fixture: ComponentFixture<BorrarrecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarrecursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarrecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
