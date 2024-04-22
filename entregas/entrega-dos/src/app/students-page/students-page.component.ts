import { Component } from '@angular/core';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.scss'
})
export class StudentsPageComponent {

  example = [{nombre: 'Tomas', aprobado: true, nacimiento: new Date(2005, 4, 21)},
  {nombre: 'Ivan', aprobado: false, nacimiento: new Date(2005, 0, 17)},
   {nombre: 'Santiago', aprobado: false, nacimiento: new Date(2004, 8, 12)},
    {nombre: 'Martina', aprobado: true, nacimiento: new Date(2004, 11, 3)},
    {nombre: 'Thaiel', aprobado: false, nacimiento: new Date(2005, 6, 5)},
    {nombre: 'Martin', aprobado: true, nacimiento: new Date(2004, 2, 9)}]

  

}
