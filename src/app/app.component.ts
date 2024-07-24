import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatatableComponent } from './datatable/datatable.component';
import { User } from './interfaces/user.interface';
import { finalize, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatatableHeader } from './interfaces/datatable.interface';
import { DatatableRowDirective } from './directives/datatable-row.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DatatableComponent,
    CommonModule,
    DatatableRowDirective,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private httpClient = inject(HttpClient);

  headers: DatatableHeader[] = [
    {
      name: 'ad',
      title: 'Ad',
    },
    {
      name: 'soyad',
      title: 'Soyad',
    },
    {
      name: 'tc_no',
      title: 'T.C Numarası',
    },
    {
      name: 'dogum_tarihi',
      title: 'Doğum Tarihi',
    },
    {
      name: 'aktif',
      title: 'Durum',
    },
  ];

  loading: boolean = false;
  userList: User[] = [];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.httpClient
      .get<User[]>('http://localhost:7171/users')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result) => {
          this.userList = result;
        },
      });
  }
}
