import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ACTION_LOGOUT, ACTION_LOGIN } from '../store/actions/appActions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users/users.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // let showData
  visibal: string;
  visible: true;
  registerForm: FormGroup;
  submitted = false;
  ErrorMessage: string;
  message = 'some Message';
  constructor(private router: Router, 
    private data: DataService, 
    private formBuilder: FormBuilder, 
    private user: UsersService, 
    private localSt:LocalStorage) 
      {
        this.visibal = 'yes new one';
        console.log(router.url);
        this.data.setPageasLogin({ action: ACTION_LOGOUT });
       
      }

  get f() { return this.registerForm.controls; }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit() {
    this.submitted = true;
    this.ErrorMessage = '';
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else {
      this.user.submitLogin({ email: this.registerForm.controls.email.value, password: this.registerForm.controls.password.value })
      .subscribe(
        data => {
          
          this.ErrorMessage = '';
          this.data.setLoginDetails({action:ACTION_LOGIN,user:data});
          this.router.navigate(['']);
          this.localSt.setItem('user',data).subscribe(()=>{});

        }, 
        error => {
          // console.log("asas@asas.asas : - ",error.error.message);
          this.ErrorMessage = error.error.message;
        })

    }
  }

}
