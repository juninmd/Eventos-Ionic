import { Injectable } from '@angular/core';
import { Webconfig } from '../webconfig';
import { HttpBase } from './core/http-base';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class EventoService {

    constructor(private http: HttpBase, private webconfig: Webconfig) {
    }

    public getAll() {
        return this.http.get(`${this.webconfig.UrlCore}eventos`, null).map(r => r.json())
    };

    public getById(ID: number) {
        return this.http.get(`${this.webconfig.UrlCore}eventos/${ID}`, null).map(r => r.json())
    };

    public insert(body: any) {
        return this.http.post(`${this.webconfig.UrlCore}eventos`, body, null).map(r => r.json())
    };

    public put(body: any) {
        return this.http.put(`${this.webconfig.UrlCore}eventos`, body, null).map(r => r.json())
    };

    public delete(ID: number) {
        return this.http.get(`${this.webconfig.UrlCore}eventos/${ID}`, null).map(r => r.json())
    };

}