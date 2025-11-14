import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../interfaces/app.interface';



export const addFormDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
