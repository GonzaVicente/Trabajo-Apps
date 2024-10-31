import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  esAdmin:boolean = false;
  auth = inject(AuthService)
  
  resultadoInput: string = " ";

  async abrirModal(){
    const confirmacion = await Swal.fire({
      title: '¿Desea Cerrar Sesion?',
      text: 'Esta acción cerrara la ventana actual.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    });
    if (confirmacion.isConfirmed) {
      Swal.fire('Cochera Eliminada', 'La cochera ha sido eliminada de la plataforma.', 'success');
}}};
