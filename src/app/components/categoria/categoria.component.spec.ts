import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoCategoriaComponent } from './categoria.component';

describe('CriacaoCategoriaComponent', () => {
  let component: CriacaoCategoriaComponent;
  let fixture: ComponentFixture<CriacaoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriacaoCategoriaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriacaoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
