import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../common/services/users.service';
import { AuthService } from '../../common/services/auth.service';
import { map } from 'rxjs/operators';
import { Message } from '../../common/models/message';
import { Params, Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../common/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;

  constructor(private userService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage ({
          text: 'Теперь вы можете войти в систему',
          type: 'success'
        });
      }
    });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }
  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        console.log(user);
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('data', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage({text: 'Неверный пароль', type: 'danger'});
          }
        } else {
          this.showMessage({text: 'Такого пользователя не существует', type: 'danger'});
        }
      });
  }

}
