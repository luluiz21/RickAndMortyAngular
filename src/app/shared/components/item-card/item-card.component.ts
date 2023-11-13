import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() name: string = '';
  @Input() count: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
