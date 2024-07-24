import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  input,
  model,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { DatatableHeader } from '../interfaces/datatable.interface';
import { DatatableRowDirective } from '../directives/datatable-row.directive';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datatable.component.html',
})
export class DatatableComponent<T> implements AfterContentInit {
  data = input.required<T[]>();
  headers = input.required<DatatableHeader[]>();

  @ContentChildren(DatatableRowDirective, {
    read: TemplateRef,
    descendants: true,
  })
  rows!: QueryList<DatatableRowDirective>;

  ngAfterContentInit() {
    this.rows.forEach((row) => {
      /* BURADA DIRECTİVE'DE TANIMLADIĞIMIZ ROW-NAME'E ULAŞAMIYORUM... */
      console.log(row);
    });
  }

  getRowTemplate(name: string) {
    return this.rows.find((x) => x.rowName() === name)?.template || null;
  }

  getRowValue(row: any, name: string) {
    return row[name];
  }

  getRowAlignmentClass(alignment?: string) {
    switch (alignment) {
      case 'start':
        return 'text-start';
      case 'center':
        return 'text-center';
      case 'end':
        return 'text-end';
      default:
        return 'text-center';
    }
  }
}
