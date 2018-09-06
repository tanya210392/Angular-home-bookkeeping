import { Component, OnInit } from '@angular/core';
import { User } from '../../../../common/models/user';
import { AuthService } from '../../../../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public date = new Date();
  userName: User;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userName = JSON.parse(window.localStorage.getItem('data'));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
