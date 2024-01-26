import { ChangeDetectionStrategy, Component } from '@angular/core';
import 'moment/locale/cs.js';

import locale from '../../../../shared/locale/root.locale.json';
import { KeyValuePair } from '../../../../shared/models/key-value.interface';
import { FormValue } from '../../models/form-value.interface';
import { PersonalCodeService } from '../../services/personal-code.service';

@Component({
	selector: 'app-birth-code',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<app-birth-code-form (onValueChange)="onCodeChange($event)" />
		<div>
			<app-birth-code-info
				*ngFor="let info of personInfo | keyvalue: sortFn; last as isLast"
				[title]="locale[info.key]"
				[value]="info.value"
				[isLast]="isLast"
			/>
		</div>
	`,
})
export class BirthCodeComponent {
	protected readonly locale: KeyValuePair<string> = locale;
	// I choose Map to keep order of assigned values
	protected personInfo = new Map<string, string>();

	constructor(private codeService: PersonalCodeService) {}

	/**
	 * Handle personal code written by user
	 * @param value Form value object
	 */
	protected onCodeChange(value: FormValue | undefined) {
		if (!value) {
			this.personInfo.clear();
			return;
		}

		const [, monthDigits] = value.digits;

		const birthdayDate = this.codeService.getBirthDate(value);
		const gender = this.codeService.getGender(monthDigits);
		const age = this.codeService.getAge(birthdayDate);
		const weekday = this.codeService.getWeekDay(birthdayDate);
		const birthday = this.codeService.getBirthday(birthdayDate);

		this.personInfo.set('GENDER', gender);
		this.personInfo.set('AGE', age);
		this.personInfo.set('WEEKDAY', weekday);
		this.personInfo.set('BIRTHDAY_DATE', birthday);
	}

	/**
	 * KeyValue pipe compare function
	 */
	protected sortFn(): number {
		return 0;
	}
}
