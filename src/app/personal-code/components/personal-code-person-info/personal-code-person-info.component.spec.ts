import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCodePersonInfoComponent } from './personal-code-person-info.component';

describe('BirthCodeInfoComponent', () => {
    let component: PersonalCodePersonInfoComponent;
    let fixture: ComponentFixture<PersonalCodePersonInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PersonalCodePersonInfoComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PersonalCodePersonInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
