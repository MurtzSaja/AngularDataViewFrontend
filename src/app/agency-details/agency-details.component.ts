import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { DataFetcherService } from '../Services/data-fetcher.service';
import { MatList } from '@angular/material/list'

@Component({
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrl: './agency-details.component.css',
  providers: [DataFetcherService],
})
export class AgencyDetailsComponent {

 public listData: string[] = [];

  constructor(private route: ActivatedRoute, private dataFetcher: DataFetcherService) { }

  ngOnInit() {
    let link = this.route.snapshot.paramMap.get('id');

    if (link == null || link == '') {
      return;
    }

    this.dataFetcher.FetchRelationsShips(link!).subscribe({
      next: (response) => {
        this.listData = response;
      },

      error: (error) => {

      }
    });

  }

}
