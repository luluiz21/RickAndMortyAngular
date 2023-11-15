import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {

  @Output() scrollToEnd = new EventEmitter<void>();

  constructor() { }

  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    const target = event.target;
    const scrollPosition = target.scrollHeight - target.scrollTop;
    const offset = target.clientHeight;
    
    // Verifica se o usuário chegou ao final do elemento
    if (scrollPosition === offset) {
      this.scrollToEnd.emit();
    }
  }

  

}
