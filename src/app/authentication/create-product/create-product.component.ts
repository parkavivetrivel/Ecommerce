import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import{Product} from "../models/Product";
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  form!: FormGroup;
  product!: Product;
  imageData!: string;

  constructor(private ProductService: AuthenticationService) {}


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
      price: new FormControl(null),
      description: new FormControl(null),
      
    });
  }

  onFileSelect(event: Event) {
    // Ensure that the event target is an HTMLInputElement
    if (!(event.target instanceof HTMLInputElement)) {
      console.error("Event target is not an HTMLInputElement");
      return;
    }
  
    // Get the selected files from the input element
    const files = event.target.files;
  
    // Check if files were selected
    if (!files || files.length === 0) {
      console.error("No files selected");
      return;
    }
  
    // Get the first file from the list
    const file = files[0];
  
    // Continue with the rest of the code...
    this.form.patchValue({ image: file });
  
    // The rest of your code remains unchanged...
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    this.ProductService.addProfile(this.form.value.name, this.form.value.image,this.form.value.description, this.form.value.price);
    this.form.reset();
    this.imageData = "";
  }
}
