import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Crud } from './store/crud';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<Crud[]>('http://localhost:3000/crud');
  }

  create(payload: Crud) {
    return this.http.post<Crud>('http://localhost:3000/crud', payload);
  }

  update(payload: Crud) {
    return this.http.put<Crud>(
      `http://localhost:3000/crud/${payload.id}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/crud/${id}`);
  }
}
