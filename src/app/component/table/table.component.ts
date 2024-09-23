import { Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent { 
  private _total: number = 0;
  private _currentPage: number = 1; 
  private _pageSize: number = 2
  @Output() refresh: EventEmitter<Pagination> = new EventEmitter<Pagination>();
  @Input() fields: Array<{ key: string, name: string, thClass?: string, tdClass?: string, formatter?: (value: any) => string }> = [];
  @Input() items: any[] = []; 
  @Input() isBusy: boolean = false;
  @Input() set pageSize(pageSize: number ) {  
      console.log('setPageSize');
      this._pageSize = pageSize; 
      this.updatepagination();
  } 
  get pageSize(): number {
    return this._pageSize;
  }
  
  @Input() set total(total: number) { 
    console.log('setTotal');
    this._total = total; 
    this.updatepagination();
  }; 

  get total(): number {
    return this._total;
  }

  @ContentChildren(TemplateRef) templates!: QueryList<TemplateRef<any>>;

  private templateMap: Map<string, TemplateRef<any>> = new Map();

;

  @Input() set currentPage(page: number) {  
    this._currentPage = page; 
    console.log('currentPage'); 
    // this.refresh.emit({pageSize: this._pageSize, pageNumber: this._currentPage});
  } 

  get currentPage(): number {
    return this._currentPage;
  }
 
  sizes: number[] = [2, 5, 10, 20, 50, 100];
  
  
  totalPages: number = 0;
  pages: number[] = [];

  ngAfterContentInit() {
    this.templates.forEach(template => {
      if(template['_declarationTContainer'].localNames == null) return 
      const keys = template['_declarationTContainer'].localNames;
      const key = keys[0]; 
      if (key) {
        const match = key.match(/\(([^)]+)\)/);  
        this.templateMap.set(match[1], template);
      }
    });
  }

  getTemplate(key: string): TemplateRef<any> | null { 
    return this.templateMap.get(key) || null;
  } 


   previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.refreshTable();
    }
   }

   selectPage(numPage) { 
     if(numPage == '...') return;
     if(numPage !== this.currentPage) {
      this.currentPage = numPage; 
      this.refreshTable();
     }
   }

   nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.refreshTable();
    }
   }

   updatepagination() {
     this.totalPages = Math.ceil(this._total/ this._pageSize); 
     this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
   }

   refreshTable(event = null) {
    console.log('refreshTable');
    console.log(event);
    const x = (Number) (event ?? this._pageSize);
    this.currentPage = (Number) (event ? 1 : this._currentPage);
     this.refresh.emit({pageSize: x, pageNumber: this._currentPage});
   }

   getVisiblePages(): (number | string)[] {
    const _pages = [];
    const _totalPages = this.totalPages;
    const _currentPage = this.currentPage;
  
    if (_totalPages <= 5) {
      // Si hay 5 o menos páginas, mostrar todas
      for (let i = 1; i <= _totalPages; i++) {
        _pages.push(i);
      }
    } else {
      // Si currentPage es 1, 2, o 3, mostrar las primeras tres páginas
      if (_currentPage < 3) {
        _pages.push(1, 2, 3, '...', _totalPages);
      } else  if(_currentPage == 3){
        _pages.push(1, 2, 3, 4, '...', _totalPages);
      } else if(_currentPage == _totalPages - 2 ){
        _pages.push(1, '...', _totalPages - 3 , _totalPages - 2, _totalPages - 1, _totalPages);
      }
      // Si currentPage está en las últimas 3 páginas, mostrar las últimas páginas
      else if (_currentPage > _totalPages - 2) {
        _pages.push(1, '...', _totalPages - 2, _totalPages - 1, _totalPages);
      } 
      // Mostrar el rango centrado en la página actual
      else {
        _pages.push(1, '...', _currentPage - 1, _currentPage, _currentPage + 1, '...', _totalPages);
      }
    }
  
    return _pages;
  }

}

interface Pagination {
  pageSize: number;
  pageNumber: number;
}
