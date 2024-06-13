import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AuthService } from '../../core/services/auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let authService: AuthService
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [SharedModule, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService)
    fixture.detectChanges();
  });

  it('El campo email debe ser requerido', () => {

  const control = component.loginForm.get('email')
    control?.setValue('')

    expect(control?.hasError('required')).toBeTrue()
  });

  it('El campo password debe ser requerido', () => {
    const control = component.loginForm.get('password')
    control?.setValue('')

    expect(control?.hasError('required')).toBeTrue()
  })

  it('Debe llamar markAllAsTouched de loginForm al llamar login, si el formulario es invalido', () => {
    component.loginForm.setValue({
      email: '',
      password: ''
    })

    expect(component.loginForm.invalid).toBeTrue()

    const spyOnMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched')

    component.login()
    expect(spyOnMarkAllAsTouched).toHaveBeenCalled()
  })

  it('Debe llamar a authService.login si el formulario es valido al llamar login', () => {
    component.loginForm.setValue({
      email: 'tomas@gmail.com',
      password: '1234'
    })

    expect(component.loginForm.valid).toBeTrue()
    const spyOnLogin = spyOn(authService, 'login')

    component.login()

    expect(spyOnLogin).toHaveBeenCalled()
  })
});
