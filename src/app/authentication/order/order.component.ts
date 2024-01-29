import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent  implements OnInit{
  selectedProduct: any;
  NoOfShirts: number = 0;
  NoOfPants: number = 0;
  NoOfLadiesTop: number = 0;
  NoOfBlouse: number = 0;
  NoOfDhoti: number = 0;
  NoOfSaree: number = 0;
  NoOfShaul: number = 0;
  cartProduct:any;

  public orders = this.fb.group({
    ServiceType: new FormControl('', Validators.required),
    NoOfShirts: ['', Validators.required],
    NoOfPants: ['', Validators.required],
    NoOfLadiesTop: ['', Validators.required],
    NoOfBlouse: ['', Validators.required],
    NoOfDhoti: ['', Validators.required],
    NoOfSaree: ['', Validators.required],
    NoOfShaul: ['', Validators.required],
    totalitems: ['', Validators.required],
    totalamount: ['', Validators.required],
  })
  success: boolean = false;
  constructor(private router: Router, private AuthenticationService: AuthenticationService,
    private fb: FormBuilder,private route: ActivatedRoute) { 
    }
    
  ngOnInit()
   {
    this.AuthenticationService.ProductInCart(). subscribe((kavi: any) =>{
      this.cartProduct = kavi;

    },(err: any)=>{
      console.log(err);
    });

    // this.route.queryParams.subscribe(params => {
    //   this.selectedProduct = params['product'] ? JSON.parse(params['product']) : null;
    //   console.log('Order Component - Selected Product:', this.selectedProduct);
    // });
    this.AuthenticationService.selectedProduct$.subscribe(product => {
      this.selectedProduct = product;
      console.log('Order Component - Selected Product:', this.selectedProduct);
    });
   }
   clearSelectedProduct(profile: any) {
  this.AuthenticationService.deleteProductInCart(profile)
    .subscribe(
      () => {
        console.log("Product deleted successfully");
        // Perform any additional actions after successful deletion
      },
      (error) => {
        console.error("Error deleting product:", error);
        // Handle errors if necessary
      }
    );
}

  orderuserdata(orders: any) {
  orders.totalitems =orders.NoOfShirts + orders.NoOfPants + orders.NoOfLadiesTop + orders.NoOfBlouse + orders.NoOfDhoti + orders.NoOfSaree + orders.NoOfShaul;
  orders.totalamount =8*orders.NoOfShirts + 8*orders.NoOfPants + 9*orders.NoOfLadiesTop + 5*orders.NoOfBlouse + 15*orders.NoOfDhoti + 40*orders.NoOfSaree + 8*orders.NoOfShaul;

    this.AuthenticationService.orderuserData(orders).subscribe((res: any) => {
      console.log('checking',res);
      if(res==true){
        this.router.navigate(['/invoice']);
      }
      
      // this.ngOnInit();
      // console.log("updated");
      // this.orders = this.fb.group({
      //   ServiceType: ['', Validators.required],
      //   NoOfShirts: ['', Validators.required],
      //   NoOfPants: ['', Validators.required],
      //   NoOfLadiesTop: ['', Validators.required],
      //   NoOfBlouse: ['', Validators.required],
      //   NoOfDhoti: ['', Validators.required],
      //   NoOfSaree: ['', Validators.required],
      //   NoOfShaul: ['', Validators.required],
      //   totalitems: ['', Validators.required],
      //   totalamount: ['', Validators.required],
      // })
    }, (err: any) => {
      console.log("error in connecting",err);
    }
    );
  }
  
  
}
