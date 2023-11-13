import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: { key: string; title: string }[] = [];
  @Output() needMoreData = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  loadMoreData(){
    this.needMoreData.emit();
  }
}
