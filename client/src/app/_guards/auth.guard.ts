import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
class PermisionService {
  constructor(private accountService: AccountService, private toastr: ToastrService) { }
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.toastr.error('You shall not pass!');
          return false; // Add a return statement for the false case
        }
      })
    );
  }
}
export const AuthGuard: CanActivateFn = async (): Promise<boolean> => {
  const permissionService = inject(PermisionService);
  const canActivate = await firstValueFrom(permissionService.canActivate());
  return canActivate;
};

