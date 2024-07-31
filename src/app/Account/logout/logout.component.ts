import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  message: string = '';

  constructor(private dataService: DataService) {}

  logout() {
    this.dataService.logout().subscribe(
      response => {
        this.message = response.message;
      },
      error => {
        this.message = 'Logout failed';
        console.error(error);
      }
    );
  }
}

