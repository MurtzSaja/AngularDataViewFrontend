import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataFetcherService } from '../Services/data-fetcher.service';
import { AgencyData, RefinedAgencyData } from '../Interfaces/agency-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router'

@Component({
  selector: 'app-data-view-table',
  templateUrl: './data-view-table.component.html',
  styleUrl: './data-view-table.component.css',
})
export class DataViewTableComponent {

  dataSource!: MatTableDataSource<RefinedAgencyData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dataFetchService: DataFetcherService, private router: Router) { }

  ngOnInit(): void {
 
    this.dataFetchService.FetchData().subscribe({

      next: (response) =>
      {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  RowClick(element: RefinedAgencyData) {
    this.router.navigate(["/AgencyDetails", element.id]);
  }
}
