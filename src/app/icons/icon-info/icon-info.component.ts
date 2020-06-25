import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dm-icon-info',
  templateUrl: './icon-info.component.html',
  styleUrls: ['./icon-info.component.css'],
})
export class IconInfoComponent implements OnInit {
  @Input() color: string;

  constructor() {}

  ngOnInit(): void {}
}
