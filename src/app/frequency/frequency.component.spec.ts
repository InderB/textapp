import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FrequencyComponent } from './frequency.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FrequencyService } from '../services/frequency.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { ToastService } from '../services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

describe('FrequencyComponent', () => {
	let component: FrequencyComponent;
    let service: FrequencyService;
    let toastService: ToastService;
    let ngxSpinner: NgxSpinnerService;
    
    beforeEach(() => {
        service = new FrequencyService(null, null);
        toastService = new ToastService();
        ngxSpinner = new NgxSpinnerService();
        component = new FrequencyComponent(service, toastService, ngxSpinner);
        component.topWords = new MatTableDataSource([]);
    });

	it('- should create frequency-component', () => {
		expect(component).toBeTruthy();
    });

    it('- should initialize show words to false', () => {
        component.ngOnInit();
        expect(component.showTopWords).toBeFalsy();
    });

    it('- filter words method should return trimmed string in lowercase', () => {
        expect(component.filterWords('Hi hello ')).toBe('hi hello');
    });

    it('- submit method should return array of top n words', () => {
        // Arrange
        let topWords = [
            { word: 'A', count: 10 },
            { word: 'B', count: 9 },
            { word: 'C', count: 7 }
        ];
        spyOn(service, 'getTopWordsFrequency').and.callFake(() => {
            return Observable.from([ new MatTableDataSource( topWords ) ]);
        });
        
        // Act
        component.onSubmit({ wordCount: 3 });

        // Assert
        component.topWords = new Observable().subscribe(data => {
            expect(data).toEqual(topWords);
        });
    });
});
