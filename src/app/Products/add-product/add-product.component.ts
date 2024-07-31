import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ProductPostVM } from '../../shared/ProductPostVM';
import { Brand } from '../../shared/Brand';
import { ProductType } from '../../shared/ProductType';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  brands: Brand[] = [];
  productTypes: ProductType[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.fetchBrands();
    this.fetchProductTypes();
    this.createForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      description: ['', Validators.required],
      brandId: ['', Validators.required],
      productTypeId: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.productForm.patchValue({
      image: file
    });
    this.productForm.get('image')!.updateValueAndValidity();
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')!.value);
      formData.append('price', this.productForm.get('price')!.value.toString());
      formData.append('description', this.productForm.get('description')!.value);
      formData.append('brandId', this.productForm.get('brandId')!.value.toString());
      formData.append('productTypeId', this.productForm.get('productTypeId')!.value.toString());
      formData.append('image', this.productForm.get('image')!.value);

      this.dataService.createProduct(formData).subscribe(
        (data: ProductPostVM) => {
          console.log('Product created:', data);
          alert(`${data.name} created successfully`);
          this.router.navigate(['/products']); // Redirect to product listing page
        },
        (error) => {
          console.error('Error creating product:', error);
        }
      );
    }
  }

  fetchBrands() {
    this.dataService.getProductBrands().subscribe(
      (brands: Brand[]) => {
        this.brands = brands;
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  fetchProductTypes() {
    this.dataService.getProductTypes().subscribe(
      (productTypes: ProductType[]) => {
        this.productTypes = productTypes;
      },
      (error) => {
        console.error('Error fetching product types:', error);
      }
    );
  }
}
