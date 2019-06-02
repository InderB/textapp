import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FrequencyService {

  constructor(private http: HttpClient) { }

  getTopWordsFrequency(wordCount) {
    return this.http.get(`http://localhost:4005/api/getFrequency/${wordCount}`)
      .pipe(
        tap(console.log),
        map((response: { success: Boolean, data?: any, errors?: any }) => {
          if (response.success) {
            return response.data;
          } else {
            return response.errors[0];
          }
        })
      )
      // .subscribe();
  }
}
