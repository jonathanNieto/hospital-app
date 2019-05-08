import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  searchTerm = '';
  objJson: any;
  users: any[] = [];
  doctors: any[] = [];
  hospitals: any[] = [];
  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
    activatedRoute.params.subscribe((params) => {
      this.searchTerm = params['term'];
      this.search(this.searchTerm);
    });
   }

  ngOnInit() {
  }

  search(term: string) {
    const url = `${environment.url}/search/all/${term}`;
    this.http.get(url)
      .subscribe((response: any) => {
        this.users = response.users;
        this.doctors = response.doctors;
        this.hospitals = response.hospitals;
      });
  }

}
