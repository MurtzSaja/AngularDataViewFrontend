import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgencyData, Daum } from '../Interfaces/agency-data';
import { Observable } from 'rxjs';
import { AgencyMetaData } from '../Interfaces/agency-meta-data';
import { map, catchError, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataFetcherService
{
  private apiKey = 'pbT8uXmvLKVanjM18bXndImTU33DrcpzHXf28YFM';
  private dataUrl: string = 'https://api.foia.gov/api/agency_components?&fields[agency_component]=title,abbreviation,website,submission_address';
  constructor(private client: HttpClient) {
  }

  FetchData()
  {
    const headers = new HttpHeaders({
      'X-API-Key': this.apiKey,
    });
    return this.client.get<AgencyData>(this.dataUrl, { headers, responseType: 'json', });
  }

  FetchRelationsShips(agencyId: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'X-API-Key': this.apiKey,
    });

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
