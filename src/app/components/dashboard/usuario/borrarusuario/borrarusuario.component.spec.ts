import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarusuarioComponent } from './borrarusuario.component';

describe('BorrarusuarioComponent', () => {
  let component: BorrarusuarioComponent;
  let fixture: ComponentFixture<BorrarusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
