import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Category, ResponseItem } from "./app.interface";
import { environment } from "../../environments/environment";



@Injectable({providedIn: 'root'})
export class CategoryService {
    httpClient = inject(HttpClient);
    API_URL = `${environment.API_URL}cat`;

    getAll(): Observable<Category[]> {
        return this.httpClient.get<ResponseItem<Category[]>>(this.API_URL).pipe(map(res => res.data));
    }

}