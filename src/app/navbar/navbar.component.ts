import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  pageTitle = 'Angular Device Manager';

  constructor() {}

  ngOnInit(): void {}
}
