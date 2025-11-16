import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

import { map, Observable } from "rxjs";
import { Income, ResponseItem } from "../interfaces/app.interface";

@Injectable({ providedIn: "root" })
export class IncomeService {
    private httpClient = inject(HttpClient);
    private API_URL = `${environment.API_URL}income`;

    getAll(): Observable<Income[]> {
        return this.httpClient.get<ResponseItem<Income[]>>(this.API_URL).pipe(map(res => res.data));
    }

    add(income: Partial<Income>): Observable<Income> {
        return this.httpClient.post<ResponseItem<Income>>(this.API_URL, income).pipe(map(res => res.data));
    }

    update(id: string, income: Partial<Income>): Observable<Income> {
        return this.httpClient.put<ResponseItem<Income>>(`${this.API_URL}/${id}`, income).pipe(map(res => res.data));
    }

    delete(_id: string): Observable<Income> {
        return this.httpClient.delete<Income>(`${this.API_URL}/${_id}`);
    }
}
