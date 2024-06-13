import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.service"
import { Router } from "@angular/router"
import {MockProvider} from 'ng-mocks'


describe('AuthService', () => {

    let authService: AuthService
    let router: Router

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService,
                MockProvider(Router)
            ]
        })

        authService = TestBed.inject(AuthService)
        router = TestBed.inject(Router)
    })

    it('Debe establecer un usuario autenticado al llamar login', () => {

        const spyOnSetItem = spyOn(localStorage, 'setItem')
        const spyOnNavigate = spyOn(router, 'navigate')
        authService.login({
            email: 'tomas@gmail.com',
            password: '1234'
        })

        authService.authUser$.subscribe({
            next: (authUser) => {

                expect(authUser).toBeTruthy()
                expect(spyOnSetItem).toHaveBeenCalled()
                expect(spyOnNavigate).toHaveBeenCalled()

            }
        })
    })

    it('Debe mostrar un alert con el texto "correo o pasword incorrectos" si los datos no coinciden con el login', () => {
        const spyOnAlert = spyOn(window, 'alert')
        authService.login({
            email: 'fake@gmail.com',
            password: 'wdefqw'
        })

        expect(spyOnAlert).toHaveBeenCalledWith('correo o password incorrectos')

    })
})