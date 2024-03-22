import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password)
      .subscribe(() => {
        this.router.navigate(['/messaging-home']);
      }, (error: any) => {
        console.error('Login failed:', error);
        // handle login error, e.g., display error message to the user
      })
  }

}
