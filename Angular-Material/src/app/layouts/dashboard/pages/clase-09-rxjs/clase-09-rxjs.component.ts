import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertsService } from '../../../../core/services/alerts.service';

@Component({
  selector: 'app-clase-09-rxjs',
  templateUrl: './clase-09-rxjs.component.html',
  styleUrl: './clase-09-rxjs.component.scss'
})
export class Clase09RxjsComponent {
  constructor(private alertsService: AlertsService ) {
    // this.obtenerResultado()
    this.runReloj()
    this.alertsService.notifier$.next('mensaje')
  }

  runReloj() {
    const obs = new Observable((observer) => {
    // observer.error('error al obtener la fecha')
    let counter = 5
      setInterval(() => {
        counter--
        if (counter ===0) observer.complete()
        observer.next(new Date())
      },1000)
    })
    obs.subscribe({
      //equivalente al then
      next: (resultado) => {
        console.log(resultado)
      },
      //equivalente al catch
      error: (error) => {
        console.error(error)
      },
      //equivalente al finally
      complete: () => {
        console.log('el reloj dejo de emitir valores')
      }
    })
  }

  async obtenerResultado() {
    console.log('inicio')

    const meDevolveraElDinero = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 3000)
    })
    await meDevolveraElDinero.then((resultado) => {
      console.log(resultado)
    })
    console.log('final')
  }
  

}
