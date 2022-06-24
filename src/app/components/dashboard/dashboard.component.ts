import { Component, OnInit } from '@angular/core';
import { AuthorInfo } from '../../enums/author-info.enum';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Restaurant} from "../../models/restaurant.model";
import {ApiService} from "../../services/api.service";
import {initialRest, initialRestFormValue} from "../../models/initial-rest-values";
import {lessFourSecondsRantomTimeoutValue} from "../values/values";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formValue!: FormGroup;
  restaurantModel: Restaurant | any = initialRest;
  restaurantsData: any;
  showAdd!: boolean;
  showBtn!: boolean;
  authorSite: string = AuthorInfo.Site;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(initialRestFormValue);
    setTimeout(() => {
      this.getRests();
    }, lessFourSecondsRantomTimeoutValue);
  };

  getRests(): void {
    this.api.getRestaurantsList().subscribe(
      (data: Restaurant) => {
        this.restaurantsData = data;
      },
      (err: any) => {
        console.error(err);
      },
    )
  };

  addRest(): void {
    for (let key in this.restaurantModel) {
      this.restaurantModel[key] = this.formValue.value[key];
    }
    this.api.postRestaurant(this.restaurantModel).subscribe(
      (res) => {
        this.clearForm();
        this.getRests();
        alert('Item added!');
      },
      (err) => {
        console.error(err);
        console.log('Something went wrong...');
      },
    )
  };

  deleteRest(id: number) {
    this.api.deleteRestaurant(id).subscribe(
      () => {
      alert('Item deleted!');
      this.getRests();
    },
      (err) => {
        this.throwError(err);
      });
  };

  loadRestData(data: any) {
      this.showAdd = false;
      this.showBtn = true;
      this.restaurantModel.id = data.id;
      this.formValue.controls['name']?.setValue(data.name);
      this.formValue.controls['email']?.setValue(data.email);
      this.formValue.controls['mobile']?.setValue(data.mobile);
      this.formValue.controls['address']?.setValue(data.address);
      this.formValue.controls['services']?.setValue(data.services);
    };

  updateRest(): void {
    this.restaurantModel.name = this.formValue.value.name;
    this.restaurantModel.email = this.formValue.value.email;
    this.restaurantModel.mobile = this.formValue.value.mobile;
    this.restaurantModel.address = this.formValue.value.address;
    this.restaurantModel.services = this.formValue.value.services;
    this.api.updateRestaurant(this.restaurantModel, this.restaurantModel.id).subscribe(
      () => {
        alert('Item updated!');
        this.clearForm();
        this.getRests();
      },
      (err) => {
        this.throwError(err);
      })
  };

  throwError(err: any): void {
    console.error(err);
    console.log('Something went wrong...');
  };

  clearForm() {
    this.formValue.reset();
  };

  clickAddResto() {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  };

}
