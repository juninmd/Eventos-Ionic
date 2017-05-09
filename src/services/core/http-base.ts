import { Injectable } from '@angular/core';
import {
    Http,
    XHRBackend,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Headers,
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoaderService } from "./loader-service";
import 'rxjs/Rx';
import { NavController } from 'ionic-angular';
@Injectable()
export class HttpBase extends Http {
    constructor(backend: XHRBackend,
        options: RequestOptions,
        private loader: LoaderService,
        public navCtrl: NavController) {
        super(backend, options);
    }

    /**
     * Performs a request with `get` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        if (options == null || (options != null && options.headers.keys().filter(q => q == "skiploading").length == 0)) {
            this.requestInterceptor();
        }
        return super.get(url, this.requestOptions(options))
            .catch(this.onCatch)
            .timeout(10000)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                if (options == null || (options != null && options.headers.keys().filter(q => q == "skiperror").length == 0)) {
                    this.onSubscribeError(error);
                }
            })
            .finally(() => {
                if (options == null || (options != null && options.headers.keys().filter(q => q == "skiploading").length == 0)) {
                    this.onFinally();
                }
            });
    }

    getLocal(url: string, options?: RequestOptionsArgs): Observable<any> {
        return super.get(url, options);
    }

    /**
     * Performs a request with `post` http method.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<>}
     */
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        if (options == null || (options != null && options.headers.keys().filter(q => q == "skiploading").length == 0)) {
            this.requestInterceptor();
        }
        return super.post(url, body, this.requestOptions(options))
            .catch(this.onCatch)
            .timeout(10000)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                if (options == null || (options != null && options.headers.keys().filter(q => q == "skiperror").length == 0)) {
                    this.onSubscribeError(error);
                }
            })
            .finally(() => {
                if (options == null || (options != null && options.headers.keys().filter(q => q == "skiploading").length == 0)) {
                    this.onFinally();
                }
            });
    }

    /**
     * Performs a request with `put` http method.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<>}
     */
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        if (options == null || (options != null && options.headers.keys().filter(q => q == "skiploading").length == 0)) {
            this.requestInterceptor();
        }
        return super.put(url, body, this.requestOptions(options))
            .catch(this.onCatch)
            .timeout(10000)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                if (options == null || (options != null && options.headers.keys().filter(q => q == "skiperror").length == 0)) {
                    this.onSubscribeError(error);
                }
            })
            .finally(() => {
                if (options == null || (options != null && options.headers.keys().filter(q => q == "skiploading").length == 0)) {
                    this.onFinally();
                }
            });
    }

    /**
     * Performs a request with `delete` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        if (options == null || (options != null && options.headers.keys().filter(q => q == "skiploading").length == 0)) {
            this.requestInterceptor();
        }
        return super.delete(url, options)
            .catch(this.onCatch)
            .timeout(10000)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                if (options == null || (options != null && options.headers.keys().filter(q => q == "skiperror").length == 0)) {
                    this.onSubscribeError(error);
                }
            })
            .finally(() => {
                if (options == null || (options != null && options.headers.keys().filter(q => q == "skiploading").length == 0)) {
                    this.onFinally();
                }
            });
    }


    /**
     * Request options.
     * @param options
     * @returns {RequestOptionsArgs}
     */
    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }

        if (options.headers.keys().filter(q => q == "skipheaders").length == 1) {
            options.headers = new Headers();
            options.headers.append("Content-Type", 'application/json');
            return options;
        }

        return options;
    }

    /**
     * Request interceptor.
     */
    private requestInterceptor(): void {
        if (localStorage.getItem("loading") == "true") {
            return;
        }

        localStorage.setItem("loading", "true");
        this.loader.showPreloader();
    }

    /**
     * Response interceptor.
     */
    private responseInterceptor(): void {
        if (localStorage.getItem("loading") == "false") {
            return;
        }

        localStorage.setItem("loading", "false");
        this.loader.hidePreloader();
    }

    /**
     * Error handler.
     * @param error
     * @param caught
     * @returns {ErrorObservable}
     */
    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    /**
     * onSubscribeSuccess
     * @param res
     */
    private onSubscribeSuccess(res: Response): void {
    }

    /**
     * onSubscribeError
     * @param error
     */
    private onSubscribeError(error: any): void {
        this.handleError(error);
    }

    /**
     * onFinally
     */
    private onFinally(): void {
        this.responseInterceptor();
    }

    public handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {

            if (this.isJson(error.text())) {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                if (error.status == 0) {
                    errMsg = "Ocorreu uma falha na comunicação do sistema.";
                }
                else if (error.status == 401 && body.message && body.message.userMessage) {
                    errMsg = `${body.message.userMessage}`;
                    this.loader.showError(errMsg);
                    return;
                }
                else if (body.message && body.message.userMessage) {
                    errMsg = `${body.message.userMessage}`;
                }
                else {
                    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
                }
                if (error.json().noValidate == null)
                    this.loader.showError(errMsg);
            }
            else {
                this.loader.showError(error.text());
            }

        } else {
            errMsg = error.message ? error.message : error.toString();
            this.loader.showError(errMsg);
        }

    }
    private isJson(str: string): boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}