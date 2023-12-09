import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from './account.service';


// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = inject(AccountService);
  const userJSON = localStorage.getItem(user.localStorageKey);
  const data = userJSON ? JSON.parse(userJSON) : null;
  // const logToken = data.token;
  if(data){
    return true;
  } else{
    router.navigate(['/login'])
     return false;
  }
  
};
