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
  providers: [DataFetcherService]
})
export class DataViewTableComponent {

  private agencyData?: AgencyData;

  dataSource!: MatTableDataSource<RefinedAgencyData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dataFetchService: DataFetcherService, private router: Router) { }

  ngOnInit(): void {
 
    this.dataFetchService.FetchData().subscribe({

      next: (response) =>
      {
        this.agencyData = response;
        console.log(this.agencyData);
        let refineData: RefinedAgencyData[] = [];
        this.agencyData.data.forEach((agency) => {

          let address: string = "";
          const submitionAdd = agency.attributes.submission_address;
          if (submitionAdd != null) {
            address = submitionAdd.address_line1 + "," + submitionAdd.address_line2 + "," + submitionAdd.locality + "," + submitionAdd.administrative_area + " " + submitionAdd.postal_code + "," + submitionAdd.postal_code;
          }

          refineData.push(
            {
              title: agency.attributes.title + "(" + agency.attributes.abbreviation + ")",
              website: 'http://www.archives.gov/foia/index.html',
              address: address != '' ? address : "-",
              id: agency.id
            });

        });
        console.log(refineData);
        this.dataSource = new MatTableDataSource(refineData);
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
