import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrequencyService } from '../services/frequency.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { ToastService } from '../services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'frequency',
    templateUrl: './frequency.component.html',
    styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent implements OnInit {
    frequencyCountForm = new FormGroup({
        wordCount: new FormControl(1, [Validators.required])
    });
    topWords: any;
    showTopWords: Boolean;
    displayedColumns = ['index', 'word', 'frequency'];
    paginator: MatPaginator;

    constructor(
        private frequencyService: FrequencyService,
        private toastService: ToastService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
        this.showTopWords = false;
    }

    onSubmit(formFieldValues) {
        this.toastService.showToast(`Getting most frequent ${formFieldValues.wordCount} words...`, 'info');
        this.showTopWords = false;
        this.topWords = [];
        this.spinner.show();

        console.log('Words to count:-', formFieldValues.wordCount);
        this.frequencyService.getTopWordsFrequency(formFieldValues.wordCount).subscribe(response => {
            console.log('Response', response);
            this.spinner.hide();
            if (response) {
                this.showTopWords = true;
                this.toastService.showToast(`Top ${formFieldValues.wordCount} most frequent words generated...`, 'success');
    
                this.topWords = new MatTableDataSource(response.data);
                this.topWords.paginator = this.paginator;
            }
        });
    }

    filterWords(value: string) {
        this.topWords.filter = value.trim().toLowerCase();
    }
}
