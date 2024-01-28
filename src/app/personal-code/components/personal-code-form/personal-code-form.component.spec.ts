import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCodeFormComponent } from './personal-code-form.component';

describe('BirthCodeFormComponent', () => {
	let component: PersonalCodeFormComponent;
	let fixture: ComponentFixture<PersonalCodeFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PersonalCodeFormComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PersonalCodeFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
