import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService) {}

  register(): void {
    if (this.registrationData.password !== this.registrationData.confirmPassword) {
      console.error('Passwords do not match!');
      // Handle password mismatch error (e.g., display error message to the user)
      return;
    }

    this.authService.register(this.registrationData).subscribe(
      response => {
        console.log('Registration successful!', response);
        // Redirect the user to the login page or perform other actions as needed
      },
      error => {
        console.error('Registration failed!', error);
        // Handle registration errors (e.g., display error message to the user)
      }
    );
  }
}
