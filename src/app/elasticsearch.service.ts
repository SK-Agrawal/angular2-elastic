import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import {Observable, Observer, ConnectableObservable} from 'rxjs';
import * as elasticsearch from "elasticsearch";

@Injectable()
export class ElasticSearchService {
    constructor() {

    }
    search(value): Observable<any> {
        console.log(value)
        var client = new elasticsearch.Client({
            host: 'http://localhost:9200',
            log: 'trace'
        });
        return Observable.fromPromise(client.search({
            index: 'blog',
            q: `title:${value}`
        }))
    }
    addToIndex(value): Observable<any> {
        var client = new elasticsearch.Client({
            host: 'http://localhost:9200',
            log: 'trace'
        });
        return Observable.fromPromise(client.create(value))
    }
    isAvailable(): Promise<any> {
        var client = new elasticsearch.Client({
            host: 'http://localhost:9200',
            log: 'trace'
        });
        return client.ping({
            requestTimeout: Infinity,
            hello: "elasticsearch!"
        });
    }
}