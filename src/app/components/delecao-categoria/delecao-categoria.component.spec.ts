import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelecaoCategoriaComponent } from './delecao-categoria.component';

describe('DelecaoCategoriaComponent', () => {
  let component: DelecaoCategoriaComponent;
  let fixture: ComponentFixture<DelecaoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelecaoCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelecaoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
