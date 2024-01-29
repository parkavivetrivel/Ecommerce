import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signup = this.fb.group({
    username: new FormControl('', Validators.required),
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  success: boolean = false;
  showGif:boolean = false; 
  signUpSuccess: boolean = false;
  signUpFailure: boolean = false;
  signUpCard: boolean = true;

  constructor(private router: Router, private AuthenticationService: AuthenticationService,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  signupuserdata(uservalues: any) {
    console.log("updated", uservalues);
    this.signUpCard  = false;
    this.showGif = true;

    this.AuthenticationService.signupuserData(uservalues).subscribe((res: any) => {
      this.showGif = false;

      if (res == true) {
        this.signUpCard  = false;
        this.signUpSuccess = true;
        this.signUpFailure = false;



      }
      else {
        this.signUpCard = false;
        this.signUpSuccess = false;
        this.signUpFailure = true;

      }
      this.ngOnInit();
      console.log("updated");
      this.signup = this.fb.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
      })
      this.success = true;
      return res;
    }, (err: any) => {
      console.log(err);
    }
    );
  }

}

