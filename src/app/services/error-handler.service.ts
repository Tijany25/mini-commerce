import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorToastComponent } from '../components/shared/error-toast/error-toast.component';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: any, message: string): void {
    console.error(`${message}:`, error);
    this.snackBar.openFromComponent(ErrorToastComponent, {
      data: message,
      duration: 5000,
      panelClass: ['error-toast']
    });
  }
}
