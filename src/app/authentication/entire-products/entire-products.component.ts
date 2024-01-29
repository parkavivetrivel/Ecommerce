import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-entire-products',
  templateUrl: './entire-products.component.html',
  styleUrls: ['./entire-products.component.css']
})
export class EntireProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isCollapsed = false;
  private productSubscription!: Subscription;
  constructor(private productService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts();

    this.productSubscription = this.productService
      .getProfilesStream()
      .subscribe((profiles: Product[]) => {
        this.products = profiles;
      });
  }
  addToCart(product: any) {
    // this.router.navigate(['/order'], { queryParams: { product: JSON.stringify(product) } });
    this.router.navigate(['/order']);

    // Post the product data to the server
    this.productService.insertToCartProduct(product).subscribe(
      (response) => {
        console.log('Product added to the database:', response);
      },
      (error) => {
        console.error('Error adding product to the database:', error);
      }
    );
  
  

  }
  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
  
}
