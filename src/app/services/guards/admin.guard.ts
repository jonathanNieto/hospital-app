import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public userService: UserService, public router: Router){}
  canActivate() {
    console.log(this.userService.user);
    if (this.userService.user.getRole() === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('bloqueado por admin guard');
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'No tiene permisos para ver ese recurso',
        footer: 'Inicie sesión nuevamente'
      })
      /* this.router.navigate(['/login']); */
      this.userService.logout();
      return false;
    }
  }
  
}
