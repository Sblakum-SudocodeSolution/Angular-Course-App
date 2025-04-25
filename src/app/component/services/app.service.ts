import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { posts } from '../Interfaces/Posts.Interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public subjectRole$: Subject<string> = new Subject<string>();
  public behaviorSubjectRole$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  constructor() {}

  http = inject(HttpClient);

  fetchPosts(): Observable<posts[]> {
    return this.http.get<posts[]>('https://jsonplaceholder.typicode.com/posts');
  }
}
