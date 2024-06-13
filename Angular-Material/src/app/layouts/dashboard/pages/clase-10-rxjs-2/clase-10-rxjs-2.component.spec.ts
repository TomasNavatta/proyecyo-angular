import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clase10Rxjs2Component } from './clase-10-rxjs-2.component';

describe('Clase10Rxjs2Component', () => {
  let component: Clase10Rxjs2Component;
  let fixture: ComponentFixture<Clase10Rxjs2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Clase10Rxjs2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Clase10Rxjs2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
