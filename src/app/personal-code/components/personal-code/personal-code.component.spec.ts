import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCodeComponent } from './personal-code.component';

describe('BirthCodeComponent', () => {
    let component: PersonalCodeComponent;
    let fixture: ComponentFixture<PersonalCodeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PersonalCodeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PersonalCodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
