import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Webconfig } from '../webconfig';
import { HttpBase } from './core/http-base';
import { Event } from '../models/event.model';
import 'rxjs/add/operator/map';

@Injectable()
export class EventoService {

    constructor(private http: HttpBase, private webconfig: Webconfig) {
    }

    public getAll(): Observable<Event[]> {
        return this.http.get(`${this.webconfig.UrlCore}eventos`, null).map(r => r.json() as Event[])
    };

    public getById(ID: number): Observable<Event> {
        return this.http.get(`${this.webconfig.UrlCore}eventos/${ID}`, null).map(r => r.json() as Event)
    };

    public insert(body: Event): Observable<Event> {
        return this.http.post(`${this.webconfig.UrlCore}eventos`, body, null).map(r => r.json() as Event)
    };

    public put(body: Event): Observable<Event> {
        return this.http.put(`${this.webconfig.UrlCore}eventos`, body, null).map(r => r.json() as Event)
    };

    public delete(ID: number): Observable<Event> {
        return this.http.get(`${this.webconfig.UrlCore}eventos/${ID}`, null).map(r => r.json() as Event)
    };

}
