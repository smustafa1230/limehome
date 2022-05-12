import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {DataService} from './../../services/data/data.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  reservationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private service: DataService) { }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      checkInDate: [null, Validators.required],
      checkOutDate: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      billingAddress: [null, Validators.required],
      country: [null, Validators.required],
      noOfGuests: [null, Validators.required],
      city: [null, Validators.required],
      postalCode: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
  }

  submit() {
    if (!this.reservationForm.valid) {
      return;
    }
    this.service.saveReservation(this.reservationForm.value).subscribe((data: any) => {
      console.log("data:", data);
      this.showError("Reservation saved successfully.");
    }, async error  =>{
      const errors = error.error.errors;
      this.showError("There are some error, please try again later.")
      console.log("error:", error);
    });
  }
  async showError (msg: any) {
    await this._snackBar.open(msg, "OK", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"

    });
  }

}
