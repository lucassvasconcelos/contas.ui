import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoContaComponent } from './conta.component';

describe('CriacaoContaComponent', () => {
  let component: CriacaoContaComponent;
  let fixture: ComponentFixture<CriacaoContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriacaoContaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriacaoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
