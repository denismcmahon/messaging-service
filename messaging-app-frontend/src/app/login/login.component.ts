import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password)
      .subscribe(() => {
        // redirect to dashboard upoin successful login
      }, (error: any) => {
        console.error('Login failed:', error);
        // handle login error, e.g., display error message to the user
      })
  }

}
