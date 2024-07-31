import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = ''; 
  registered: boolean = false; 

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router // Inject Router service
  ) {
    this.loginForm = this.fb.group({
      emailaddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.registered = params['registered'] === 'true';
      if (this.registered) {
        this.message = 'Registered successfully.';
      }
    });
  }
  login() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.dataService.login(user).subscribe(
        () => { // Remove the 'response' parameter
          this.router.navigate(['/products']); 
        },
        error => {
          console.error('Login failed', error); // Log the error
          this.message = 'Login failed. Invalid email OR Password.'; 
        }
      );
    }
  }
}




