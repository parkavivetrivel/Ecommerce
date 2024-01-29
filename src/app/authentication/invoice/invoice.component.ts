import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit{
  newvalue: any ;
  orderDetails: any;


  constructor( private authenticationService : AuthenticationService , 
    ) { }

  ngOnInit(){
    this.authenticationService .AccessOrderData(). subscribe((kavi: any) =>{
      console.log("checking",kavi);
      this.newvalue = kavi;
      let indexValue = this.newvalue.length-1;
      console.log(indexValue);
      this.orderDetails =this.newvalue[indexValue];
      console.log(this.orderDetails);
    },(err: any)=>{
      console.log(err);
    });

  
  }

}
