import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Webconfig } from '../webconfig';
import { HttpBase } from './core/http-base';
import { EventDetail } from '../models/event-detail.model';
import 'rxjs/add/operator/map';

@Injectable()
export class DetalheEventoService {

    constructor(private http: HttpBase, private webconfig: Webconfig) {
    }

    public getAll(): Observable<EventDetail[]> {
        return this.http.get(`${this.webconfig.UrlCore}eventos/detalhe`, null).map(r => r.json() as EventDetail[])
    };

    public getById(ID: number): Observable<EventDetail> {
        return this.http.get(`${this.webconfig.UrlCore}eventos/detalhe/${ID}`, null).map(r => r.json() as EventDetail)
    };

    public insert(body: EventDetail): Observable<EventDetail> {
        return this.http.post(`${this.webconfig.UrlCore}eventos/detalhe`, body, null).map(r => r.json() as EventDetail)
    };

    public put(body: EventDetail): Observable<EventDetail> {
        return this.http.put(`${this.webconfig.UrlCore}eventos/detalhe`, body, null).map(r => r.json() as EventDetail)
    };

    public delete(ID: number): Observable<EventDetail> {
        return this.http.get(`${this.webconfig.UrlCore}eventos/detalhe/${ID}`, null).map(r => r.json() as EventDetail)
    };

}
