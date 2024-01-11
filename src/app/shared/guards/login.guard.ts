import { CanActivateFn } from '@angular/router';
import { GuardService } from '../services/guard.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  return inject(GuardService).Login(route, state)
};
