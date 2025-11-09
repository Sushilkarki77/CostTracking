import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Expense, ResponseItem } from "../interfaces/app.interface";
import { map, Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class ExpensesService {
    private httpClient = inject(HttpClient);
    private API_URL = `${environment.API_URL}exp`;

    getAll(): Observable<Expense[]> {
        return this.httpClient.get<ResponseItem<Expense[]>>(this.API_URL).pipe(map(res => res.data));
    }

    add(expense: Partial<Expense>): Observable<Expense> {
        return this.httpClient.post<ResponseItem<Expense>>(this.API_URL, expense).pipe(map(res => res.data));
    }

    delete(_id: string): Observable<Expense> {
        return this.httpClient.delete<Expense>(`${this.API_URL}/${_id}`)
    }


}