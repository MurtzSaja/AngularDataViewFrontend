import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgencyData, Daum } from '../Interfaces/agency-data';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AgencyMetaData } from '../Interfaces/agency-meta-data';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataFetcherService
{
  public agencyDataCache$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private apiKey = 'pbT8uXmvLKVanjM18bXndImTU33DrcpzHXf28YFM';
  private dataUrl: string = 'https://api.foia.gov/api/agency_components?&fields[agency_component]=title,abbreviation,website,submission_address';
  constructor(private client: HttpClient) {
  }

  FetchData(): Observable<any>
  {

    if (this.agencyDataCache$.value) {
      return this.agencyDataCache$.asObservable();
    }
    else {
      const headers = new HttpHeaders({
        'X-API-Key': this.apiKey,
      });
      return this.client.get<any>(this.dataUrl, { headers, responseType: 'json', }).pipe(
        tap((data) => {
          this.agencyDataCache$.next(data)
        }),
        map((response) => {

          return response.data.map((item: any) => {

            let submissionAdd = item.attributes.submission_address;
            let concatinatedData = submissionAdd != null ? submissionAdd.address_line1 + "," + submissionAdd.address_line2 + "," + submissionAdd.locality + "," + submissionAdd.administrative_area + " " + submissionAdd.postal_code + "," + submissionAdd.postal_code : '-';
            return {
              title: item.attributes.title + "(" + item.attributes.abbreviation + ")",
              website: item.attributes.website != null ? item.attributes.website.url : '-',
              address: concatinatedData,
              id: item.id
            }
          })

        })
      );
    }
  }

  FetchRelationsShips(agencyId: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'X-API-Key': this.apiKey,
    });

    if (this.agencyDataCache$) {

      return this.agencyDataCache$.pipe(
        map((tempData: any) => {
          const agency = tempData.data.find((item: any) => item.id === agencyId);
          return agency ? agency.links.self.href : null;
        }),
        switchMap((link: string | null) => {
          if (link) {
            return this.client.get<any>(link, { headers, responseType: 'json' }).pipe(
              map((response) => Object.keys(response.data.relationships)),
              catchError((error) => {
                console.error('Error fetching relationships:', error);
                return of([]);
              })
            );
          } else {
            // If no link was found, return an empty observable
            return of([]);
          }
        })
      );
    }
    else {
      return this.client.get<AgencyData>(this.dataUrl, { headers, responseType: 'json' }).pipe(
        switchMap((response) => {
          const match = response.data.find(x => x.id === agencyId);

          if (!match) {
            return [];
          }

          return this.client.get<any>(match.links.self.href, { headers, responseType: 'json' }).pipe(
            map((response) => {

              return Object.keys(response.data.relationships);
            }),
            catchError((error) => {
              console.error('Error fetching relationships:', error);
              return [];
            })
          );
        }),
        catchError((error) => {
          console.error('Error fetching agency data:', error);
          return []; // Return an empty array on error
        })
      );
    }
  }
}
