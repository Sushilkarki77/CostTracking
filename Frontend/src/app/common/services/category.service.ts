import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Category, ResponseItem } from "../interfaces/app.interface";




@Injectable({ providedIn: 'root' })
export class CategoryService {
    httpClient = inject(HttpClient);
    API_URL = `${environment.API_URL}cat`;

    getAll(): Observable<Category[]> {
        return this.httpClient.get<ResponseItem<Category[]>>(this.API_URL).pipe(map(res => res.data));
    }

    add(name: string): Observable<Category> {
        return this.httpClient.post<ResponseItem<Category>>(this.API_URL, { name }).pipe(map(res => res.data));
    }

    delete(_id: string): Observable<Category> {
        return this.httpClient.delete<Category>(`${this.API_URL}/${_id}`)
    }

}