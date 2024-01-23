import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthCodeFormComponent } from './birth-code-form.component';

describe('BirthCodeFormComponent', () => {
    let component: BirthCodeFormComponent;
    let fixture: ComponentFixture<BirthCodeFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BirthCodeFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BirthCodeFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
