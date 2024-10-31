import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule,CommonModule,HeaderComponent],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})

export class EstadoCocherasComponent {
  titulo: string = 'Estado de la cochera';

  filas: Cochera[] = [];

  siguienteNumero: number = 1;
  header:{nro:string,disponibilidad:string,ingreso:string,acciones:string}={
    nro:"Nro",
    disponibilidad:"Disponibilidad",
    ingreso:"Ingreso",
    acciones:"Acciones"};

  auth = inject(AuthService);
  
  ngOnInit() {
    this.reload().then(filas => {
      this.filas = filas;
    });
  }

  reload() {
    return fetch('http://localhost:4000/cocheras', {
      headers: {
        'Authorization': 'Bearer ' + this.auth.getToken(),
      },
    })
    .then(r => r.json())
  }

  agregarFila() {
    this.filas.push({
      id: 0,
      descripcion: '',
      deshabilitada: 0,
      eliminada: false
    });
    this.siguienteNumero+=1
  }

  /** Elimina la fila de la cochera seleccionada */
  eliminarFIla(cocheraID:number){
    fetch('http://localhost:4000/cocheras/' + cocheraID, {
      method: 'DELETE',
      headers:{
        'authorization': 'Bearer' + this.auth.getToken()
      },
    }).then(()=> {
      this.reload().then((filas) => {
      this.filas = filas;
    });
  });
  }

  /** Cambia la disponibilidad de una cochera, si está habilitada se deshabilita y viceversa */
  cambiarDisponibilidadCochera (chocheraID:number ){
    fetch('http://localhost:4000/cocheras/' + chocheraID, {
      method: 'PATCH',
      headers:{
        'authorization': 'Bearer' + this.auth.getToken()
      },
    }).then(()=> {
      this.reload().then((filas) => {
      this.filas = filas;
    });
  });
  }
  //manera corta tis.filas[numeroFila].disponibilidad = !this.filas[numeroFila].disponible
  getCocheras(){
    fetch("http://localhost:4000/cocheras",{
      headers:{
        authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXNBZG1pbiI6MSwiaWF0IjoxNzI2Njc0Mjg4LCJleHAiOjE3MjcyNzkwODh9.GY__l8rHeHlpI5Pae2KMS6eYrCQLkvXI_F8dK2d65dQ"
      },
    })
  }

}
