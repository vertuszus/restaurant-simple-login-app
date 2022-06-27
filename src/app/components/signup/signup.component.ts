import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NewUser} from "../../models/new-user.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [''],
      mobile: [''],
      email: [''],
      password: ['']
    })
  }

  signUp(): void {
    this._http.post<NewUser>("http://localhost:3000/signup", this.signupForm.value)
      .subscribe(
        (res) => {
          alert('Registration Successfull');
          console.log(res);
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          console.error(err);
          this.signupForm.reset();
        }
      )
  }

}
