import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  /* Inputs que vem do dashboard para construir o card */
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() name: string = '';
  @Input() count: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  /* Vai para o caminhho do card escolhido */
  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

}
