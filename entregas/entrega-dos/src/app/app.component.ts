import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'entrega-1';

  hasError = false

  students = ['tomas', 'ivan', 'santiago']

  example = [{nombre: 'Tomas', aprobado: true}]

  mostrarListado = false;

  myBirthday = new Date(2005, 4, 21)

  status: 'en-camino' | 'entregado' | 'en-preparacion' = 'en-preparacion';

  alternarError() {
    this.hasError = !this.hasError
  }

  onSelectChange(evt: Event) {
    console.log(evt)

    const elemento = evt.target as HTMLSelectElement
    const valor =elemento.value as  'en-camino' | 'entregado' | 'en-preparacion'

    this.status = valor

  }
}
