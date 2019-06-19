import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { ToastService } from './toast.service';

@Injectable({
    providedIn: 'root'
})
export class FrequencyService {

    constructor(private http: HttpClient, private toastService: ToastService) { }

    getTopWordsFrequency(wordCount) {
        return this.http.get(`http://localhost:4005/api/getFrequency/${wordCount}`)
            .pipe(
                tap(console.log),
                map((response: { success: Boolean, data?: any, errors?: any }) => {
                    if (response.success) {
                        return response.data;
                    } else {
                        this.toastService.showToast(`Error: ${response.errors[0]}`, 'danger');
                        return null;
                    }
                })
            )
        // .subscribe();
    }
}
