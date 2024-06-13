import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, take, first, skip, filter, tap, map, Subject, BehaviorSubject, takeUntil, Subscription, of, delay } from 'rxjs';
import { IUser } from '../users/models';

@Component({
  selector: 'app-clase-10-rxjs-2',
  templateUrl: './clase-10-rxjs-2.component.html',
  styleUrl: './clase-10-rxjs-2.component.scss'
})
export class Clase10Rxjs2Component implements OnInit, OnDestroy{
   cambioElUsuario$ = new Subject<boolean>()

   componenteDestruido = new Subject<boolean>()
   componenteDestruidoBehavior$ = new BehaviorSubject(false)
   usuarioAutenticado$ = new BehaviorSubject<IUser | null>(null)

   obtenerUsuarioSubscription?: Subscription

   usuarios: IUser[] = []
   roles: string[] = []

   cargando = false

   getUsers(): void {
    const USERS_DB: IUser[] = [
      {
        id: 1,
    firstName: 'Tomas',
    lastName: 'Navatta',
    email: 'tomasnavatta@gmail.com',
    role: 'ADMIN',
    createdAt: new Date()},
    {id: 2,
      firstName: 'Santiago',
      lastName: 'Menendez',
      role: 'USER',
      email: 'santy17@gmail.com',
      createdAt: new Date()},
    ]
    this.cargando = true
    of(USERS_DB).
    pipe(delay(3000))
    .subscribe({
      next: (value) => {
        this.usuarios = value
      },
      complete: () => {
        this.cargando = false
      }
    })
   }
  
  login(): void {
    this.cambioElUsuario$.next(true)

  }

  ngOnDestroy(): void {
    console.log('el componente se destruyo')
    this.componenteDestruido.next(true)
    this.obtenerUsuarioSubscription?.unsubscribe()
  }


  ngOnInit(): void {


    this.getUsers()




    const obtenerUsuario$ = new Observable<number>((observer) => {
      let counter = 0
      setInterval(()=> {
        counter++
        observer.next(counter)
      }, 1000)
    })

   this.obtenerUsuarioSubscription = obtenerUsuario$
  //  .pipe(takeUntil(this.componenteDestruido))
   .subscribe({
      next: (v) => {
        console.log(v)
      }
    })

  

    this.cambioElUsuario$.subscribe({
      next: (value) => {
        console.log(value)
        this.usuarioAutenticado$.next({
          id: 1,
          createdAt: new Date(),
          email: "tomasnavatta@gmail.com",
          role: 'ADMIN',
          firstName: "tomas",
          lastName: "navatta"
        })
      }
    })


    this.usuarioAutenticado$.subscribe({
      next: (value) => {
        console.log(value)
      }
    })
    

    // const obtenerUsuarioSubscription = obtenerUsuario$
    // .pipe(
    //   tap((value)=> {
    //     console.log('Tap 1', value)
        
    //   }),
    //   map((value)=> {
    //     console.log('map', value)
    //     return value * 2

    //   }),
    //   tap((value)=> {
    //     console.log('Tap 2', value)
        
    //   }),
    // //   filter((value)=> {
    // //   return value > 5
    // // }),
    
    // )
    // .subscribe({
    //   next: (value) => {
    //     console.log(value)
    //   },
    //   error: () => {},
    //   complete: () => {
    //     console.log('el observable se completo, por lo tanto no emite mas valores')
    //   }
    // })
  }

}
