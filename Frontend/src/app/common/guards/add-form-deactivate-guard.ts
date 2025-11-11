import { CanDeactivateFn } from '@angular/router';

export const addFormDeactivateGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
