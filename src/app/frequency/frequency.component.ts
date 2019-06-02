import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrequencyService } from '../services/frequency.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

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

  constructor(private frequencyService: FrequencyService) { }

  ngOnInit() {
    this.showTopWords = false;
  }

  onSubmit(formFieldValues) {
    this.showTopWords = false;
    this.topWords = [];

    console.log('Words to count:-', formFieldValues);
    this.frequencyService.getTopWordsFrequency(formFieldValues.wordCount).subscribe(response => {
      console.log('Response', response);
      this.showTopWords = true;
      this.topWords = new MatTableDataSource(response.data);
      this.topWords.paginator = this.paginator;

      console.log('Top words', this.topWords);
    });
  }

  filterWords(value: string) {
    this.topWords.filter = value.trim().toLowerCase();
  }
}
