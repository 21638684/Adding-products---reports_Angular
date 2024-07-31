import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { Product } from '../shared/product';
import { ProductPostVM } from '../shared/ProductPostVM';
import { ProductType } from '../shared/ProductType';
import { Brand } from '../shared/Brand';
import { ChartData } from '../shared/ChartData';
import { ActiveProductsReport } from '../shared/ActiveProductsReport';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5240/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  register(user: { emailaddress: string; password: string }): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}User/register`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(user: { emailaddress: string; password: string }): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}User/login`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}User/logout`, {}, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Product related methods
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}products`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}products/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  filterProducts(filterText: string): Observable<Product[]> {
    const params = new HttpParams().set('filterText', filterText);
    return this.httpClient.get<Product[]>(`${this.apiUrl}products/filter`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  sortProducts(sortBy: string, orderBy: string): Observable<Product[]> {
    const params = new HttpParams().set('sortBy', sortBy).set('orderBy', orderBy);
    return this.httpClient.get<Product[]>(`${this.apiUrl}products/sort`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductsPage(pageSize: number, pageNumber: number): Observable<Product[]> {
    const params = new HttpParams().set('pageSize', pageSize.toString()).set('pageNumber', pageNumber.toString());
    return this.httpClient.get<Product[]>(`${this.apiUrl}products/page`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }
   
   getProductBrands(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${this.apiUrl}products/brands`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductTypes(): Observable<ProductType[]> {
    return this.httpClient.get<ProductType[]>(`${this.apiUrl}products/types`)
      .pipe(
        catchError(this.handleError)
      );
  }
  createProduct(product: FormData): Observable<ProductPostVM> {
    return this.httpClient.post<ProductPostVM>(`${this.apiUrl}products/create`, product).pipe(
      tap(data => console.log('Added product:', data)),
      catchError(this.handleError)
    );
  }

  getProductCountByBrand(): Observable<ChartData[]> {
    return this.httpClient.get<ChartData[]>(`${this.apiUrl}reports/productcountbybrand`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductCountByProductType(): Observable<ChartData[]> {
    return this.httpClient.get<ChartData[]>(`${this.apiUrl}reports/productcountbyproducttype`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getActiveProductsReport(): Observable<ActiveProductsReport[]> {
    return this.httpClient.get<ActiveProductsReport[]>(`${this.apiUrl}reports/activeproductsreport`)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error;
  }

}




