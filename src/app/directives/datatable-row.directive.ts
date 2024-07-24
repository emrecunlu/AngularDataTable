import { Directive, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appDatatableRow]',
  standalone: true,
})
export class DatatableRowDirective {
  rowName = input.required<string>({ alias: 'row-name' });

  constructor(public templateRef: TemplateRef<any>) {}
}
