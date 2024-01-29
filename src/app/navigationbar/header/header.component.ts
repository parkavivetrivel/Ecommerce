import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  isCollapsed = false;

  constructor(private cookieService: CookieService, private router:Router) { 
    this.username =this.cookieService.get('username');

  
  }
  logout(){
    
    this.ngOnInit();
    this.cookieService.deleteAll();

    this.router.navigate(['/login']).then(() => {
          window.location.reload();});
  }
  ngOnInit() {
    
  }
}


