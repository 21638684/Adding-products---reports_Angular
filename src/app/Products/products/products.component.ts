import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Product } from '../../shared/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filterText: string = '';
  sortBy: string = 'name';
  orderBy: string = 'asc';
  pageSize: number = 5;
  pageNumber: number = 1;

  constructor(private dataService: DataService,private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.dataService.getProductsPage(this.pageSize, this.pageNumber).subscribe(
      (data: Product[]) => {
        this.products = data;
        this.products.forEach(product => {
          console.log('Product:', product);
          console.log('Product Image:', product.image); // Updated property name
        });
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  onFilter(): void {
    this.dataService.filterProducts(this.filterText).subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  onSort(sortBy: string): void {
    this.orderBy = this.orderBy === 'asc' ? 'desc' : 'asc';
    this.dataService.sortProducts(sortBy, this.orderBy).subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadProducts();
  }
  navigateToAddProduct() {
    this.router.navigate(['/add-product']);
  }
}

