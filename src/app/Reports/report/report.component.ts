import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChartData } from '../../shared/ChartData';
import { ActiveProductsReport } from '../../shared/ActiveProductsReport';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  productCountByBrand: ChartData[] = [];
  productCountByProductType: ChartData[] = [];
  activeProductsReport: ActiveProductNode[] = [];

  treeControl = new FlatTreeControl<ActiveProductFlatNode>(
    node => node.level, node => node.expandable
  );
  treeFlattener = new MatTreeFlattener(
    (node: ActiveProductNode, level: number) => ({
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    }),
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getProductCountByBrand().subscribe(data => {
      this.productCountByBrand = data;
      this.initBrandChart();
    });
    this.dataService.getProductCountByProductType().subscribe(data => {
      this.productCountByProductType = data;
      this.initProductTypeChart();
    });
    this.dataService.getActiveProductsReport().subscribe(data => {
      this.activeProductsReport = this.buildTree(data);
      this.dataSource.data = this.activeProductsReport;
    });
  }

  private buildTree(data: ActiveProductsReport[]): ActiveProductNode[] {
    const tree: { [key: string]: { [key: string]: ActiveProductNode[] } } = {};

    data.forEach(product => {
      if (!tree[product.productType]) {
        tree[product.productType] = {};
      }
      if (!tree[product.productType][product.brand]) {
        tree[product.productType][product.brand] = [];
      }
      tree[product.productType][product.brand].push({
        name: product.productName,
        children: []
      });
    });

    return Object.entries(tree).map(([productType, brands]) => ({
      name: productType,
      children: Object.entries(brands).map(([brand, products]) => ({
        name: brand,
        children: products
      }))
    }));
  }

  private initBrandChart(): void {
    const ctx = document.getElementById('brandChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.productCountByBrand.map(data => data.label),
        datasets: [{
          label: 'Product Count',
          data: this.productCountByBrand.map(data => data.value),
          backgroundColor: '#90E0EF'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private initProductTypeChart(): void {
    const ctx = document.getElementById('productTypeChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.productCountByProductType.map(data => data.label),
        datasets: [{
          label: 'Product Count',
          data: this.productCountByProductType.map(data => data.value),
          backgroundColor: '#00B4D8'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  hasChild = (_: number, node: ActiveProductFlatNode) => node.expandable;
}

interface ActiveProductNode {
  name: string;
  children?: ActiveProductNode[];
}

interface ActiveProductFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
