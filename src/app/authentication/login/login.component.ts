import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  globalData: any;
  public login = this.fb.group({
    username: new FormControl('', Validators.required),
    password: ['', Validators.required],
  })
  success: boolean = false;
  loginCard: boolean = true;
  showGif:boolean = false;
  loginFailed:boolean = false;

  http: any;
  constructor(private router: Router, private AuthenticationService: AuthenticationService,
    private fb: FormBuilder, private cookieService: CookieService) { }


  ngOnInit() {

  }
  refreshLogin(){
          window.location.reload();
  }
  loginuserdata(uservalues: any) {
    console.log("updated", uservalues);
    this.loginCard = false;
    this.showGif = true;
    this.globalData = uservalues;
    this.AuthenticationService.loginuserdata(uservalues).subscribe((kavi: any) => {
      this.cookieService.set('username', this.globalData.username);

      this.ngOnInit();
      console.log("updated");
      this.login = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      })

      console.log("checking", kavi);
      this.showGif = false;
      if (kavi == true) {
       
        this.router.navigate(['/entireProduct']).then(() => {
          window.location.reload();

        });
       
      }
      else{
        this.loginFailed = true;
          
      }
      


    }, (err: any) => {
      console.log(err);
    });
  }



}
