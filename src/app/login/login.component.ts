import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api/api.service'
import { AuthService } from '../services/auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
  ) { }

  ngOnInit() {
    // check if the player is already login when the component is opened
    this.checkPlayerAlreadyLogin();
  }

  // form submit action to login player
  onSubmit(form: NgForm) {

    // send HTTP POST request
    this._api.postRequest('/login', form.value).subscribe((res: any) => {
      if (res) {

        // check response has token
        if (res.token) {
          // save player data into localStorage
          let player = form.value;
          let playerJson = JSON.stringify(player)
          this._auth.save('player', playerJson);

          // save token into localStorage
          this._auth.save('token', res.token);

          // nagivate to board page
          this._router.navigate(['board']);

          // check error response has a message
        } else if (res.message) {

          // give alert with error message from response
          alert(res.message)
        }
      } else {

        // give alert with standard error
        alert('Error!')
      }
    });
  }

  // check the player is already login
  checkPlayerAlreadyLogin() {

    // if localStorage has player data, navigate to board page
    if (this._auth.get('player') != null) {
      this._router.navigate(['board']);
    }
  }

  // nagivate to register page
  goToRegisterPage() {
    this._router.navigate(['register'],);
  }
}
