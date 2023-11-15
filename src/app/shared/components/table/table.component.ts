import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: { key: string; title: string }[] = [];
  @Output() needMoreData = new EventEmitter<void>();
  @ViewChild('scrollContainer') private scrollContainer: ElementRef | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    
    
    if (changes['data']) {
      this.resetScrollPosition();
    }
  }

  loadMoreData(){
    this.needMoreData.emit();
  }

  goToItem(id: number){
    this.router.navigate([id], { relativeTo: this.route });
  }

  resetScrollPosition() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = 0;
    }
  }
}

