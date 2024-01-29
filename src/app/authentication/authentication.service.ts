import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Product } from './models/Product';
import { Subject } from "rxjs";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({ 
  providedIn: 'root'
})
export class AuthenticationService {
  
  readonly url = "http://localhost:3000/api/profiles";
  private products: Product[] = [];
  private products$ = new Subject<Product[]>();
  private selectedProductSubject = new BehaviorSubject<any>(null);
  selectedProduct$: Observable<any> = this.selectedProductSubject.asObservable();
  selectedProduct: any;
  

  constructor(private http:HttpClient) { }  
  clearSelectedProduct() {
    this.selectedProductSubject.next(null);
  }
  signupuserData(uservalues: any){
    let headers2 = new HttpHeaders({'Content-Type':'application/json'});
    let options = ({headers:headers2});
    let body = {
      
      username: uservalues.username,
      email: uservalues.email,
      password: uservalues.password
    }
    return this.http.post('http://localhost:3000/signup', JSON.stringify(body),options);
  }
  loginuserdata(uservalues: any){
    let headers2 = new HttpHeaders({'Content-Type':'application/json'});
    let options = ({headers:headers2});
    let body = {
      
      username: uservalues.username,
      password: uservalues.password
    }
    let par = this.http.post('http://localhost:3000/login', JSON.stringify(body),options);
    return par;

  }
 orderuserData(uservalues: any){
    let headers2 = new HttpHeaders({'Content-Type':'application/json'});
    let options = ({headers:headers2});
    let body = {      
      ServiceType: uservalues.ServiceType,
      NoOfShirts: uservalues.NoOfShirts,
      NoOfPants: uservalues.NoOfPants,
      NoOfLadiesTop: uservalues.NoOfLadiesTop,
      NoOfBlouse: uservalues.NoOfBlouse,
      NoOfDhoti: uservalues.NoOfDhoti,
      NoOfSaree: uservalues.NoOfSaree,
      NoOfShaul: uservalues.NoOfShaul,
      totalitems: uservalues.totalitems,
      totalamount: uservalues.totalamount,
    }
    let parkavi = this.http.post('https://thelaundrybasket.onrender.com/orderList', JSON.stringify(body),options);
    return parkavi;
  }
  AccessOrderData(){
    let parkavi = this.http.get('https://thelaundrybasket.onrender.com/orderList');
    return parkavi;
  }
  addProfile(name: string, image: File,description: string, price:string): void {
    const profileData = new FormData();
    profileData.append("name", name);
    profileData.append("image", image, name);
    profileData.append("description", description);
    profileData.append("price", price);
    console.log()
    this.http
      .post<{ profile: Product }>(this.url, profileData)
      .subscribe((profileData) => {
        const profile: Product = {
          _id: profileData.profile._id,
          name: name,
          imagePath: profileData.profile.imagePath,
          description: description,
          price:price
        };
        console.log("profile",profile)
        this.products.push(profile);
        this.products$.next(this.products);
      });
  }
  getProfilesStream() {
    return this.products$.asObservable();
  }
  getProducts() {
    this.http
      .get<{ profiles: Product[] }>(this.url)
      .pipe(
        map((profileData) => {
          return profileData.profiles;
        })
      )
      .subscribe((products) => {
        this.products = products;
        this.products$.next(this.products);
      });
  }
  insertToCartProduct(product: any): Observable<any> {
    console.log("service",product)
    return this.http.post<any>('http://localhost:3000/cartProduct', product);
  }
  ProductInCart(){
    let parkavi = this.http.get('http://localhost:3000/cartProduct');
    console.log(parkavi)
    return parkavi;


  }
 deleteProductInCart(product: any) {
  console.log("service", product.name);
  
  // Assuming product contains an identifier like product.id or product.name
  const url = `http://localhost:3000/cartProduct/${product.name}`; // Adjust the URL based on your API

  // The second parameter is optional and can be used for configuring the request
  return this.http.delete(url);
}

}


