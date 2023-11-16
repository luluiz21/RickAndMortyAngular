import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
  /* Input com a data e coluna para construção da tabela */
  @Input() data: any[] = [];
  @Input() columns: { key: string; title: string }[] = [];
  /* Evento para pedir mais dados para a tabela( quando chega ao final do scroll) */
  @Output() needMoreData = new EventEmitter<void>();
  @ViewChild('scrollContainer') private scrollContainer: ElementRef | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }


  ngOnChanges(changes: SimpleChanges) {
    /* Ele chama o restScrollPosition quando o data muda( quando é feito a filtragem) */
    if (changes['data']) {
      this.resetScrollPosition();
    }
  }
  /* Evento que para carregar mais dados */
  loadMoreData(){
    this.needMoreData.emit();
  }
  /* Vai para a tela de detalhe do item clicado */
  goToItem(id: number){
    this.router.navigate([id], { relativeTo: this.route });
  }
  /* Função para resetar o scroll */
  resetScrollPosition() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = 0;
    }
  }
}

