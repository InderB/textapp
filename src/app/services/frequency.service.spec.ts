import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FrequencyService } from './frequency.service';

describe('FrequencyService', () => {
    let injector: TestBed;
    let service: FrequencyService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FrequencyService]
        });
        injector = getTestBed();
        service = injector.get(FrequencyService);
        httpMock = injector.get(HttpTestingController);
    });

    it('- should be created', () => {
        expect(service).toBeTruthy();
    });

    const dummyWords = [{word: 'A', frequency: 10}, {word: 'B', frequency: 8}];
    it('- should return an Observable<Words[]>', () => {
        service.getTopWordsFrequency(2).subscribe(data => {
            expect(data.length).toBe(2);
            // expect(data).toEqual(dummyWords);
        });
    });

    // const req = httpMock.expectOne(`api/getFrequency/2`);
    // expect(req.request.method).toBe("GET");
    // req.flush(dummyWords);

    // afterEach(() => {
    //     httpMock.verify();
    // });
});