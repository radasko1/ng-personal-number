import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthCodeComponent } from './birth-code.component';

describe('BirthCodeComponent', () => {
    let component: BirthCodeComponent;
    let fixture: ComponentFixture<BirthCodeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BirthCodeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BirthCodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
