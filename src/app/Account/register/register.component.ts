import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string = '';  // Provide an initial value

  constructor(private dataService: DataService, 
              private fb: FormBuilder,
              private router: Router) {
    this.registerForm = this.fb.group({
      emailaddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.dataService.register(user).subscribe(
        response => {
          this.message = response.message;
          // Redirect to login page with notification
          this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        },
        error => {
          this.message = 'Registration failed';
          console.error(error);
        }
      );
    }
  }
}
