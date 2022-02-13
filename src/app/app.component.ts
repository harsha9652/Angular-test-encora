import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private router: Router,) { }
  fetchData: boolean = true;
  loadData: boolean = false;
  ngOnInit() {

  }
  onFetchData() {
    this.loadData = true;
    setTimeout(() => {
      this.fetchData = false;
      this.loadData = false;
      this.router.navigate(['contact-list']);
    }, 3000);
  }

}
