import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NewUser} from "../../models/new-user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  logIn() {
    this._http.get<Array<NewUser>>('http://localhost:3000/signup').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if(user) {
          alert('Login Successful');
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        } else {
          alert('User not found!');
          console.error('User not found!');
        }
      },
      (err) => {
        console.error(err);
      },
    )
  }

}
