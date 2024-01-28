import { Injectable } from '@angular/core';
import moment, { Moment } from 'moment/moment';

import locale from '../../shared/locale/root.locale.json';
import { FormValue } from '../models/form-value.interface';

@Injectable()
export class CodeInformationService {
	public getBirthDate(value: FormValue) {
		const [year, month, day] = value.date;
		return moment([year, month - 1, day]);
	}

	/**
	 * Calculate gender based on written month
	 * @param month Month in digits
	 */
	public getGender(month: string): string {
		const monthNumber = parseInt(month, 10);

		if (monthNumber >= 1 && monthNumber <= 12) {
			return locale['MALE'];
		} else if (monthNumber >= 51 && monthNumber <= 62) {
			return locale['FEMALE'];
		}
		// this should not happen, written code is validated, and if not valid, no personal info are shown
		return '';
	}

	/**
	 * Calculate age based on written personal code
	 * @param birthdayDate Birthday date in Moment date object
	 */
	public getAge(birthdayDate: Moment): string {
		const todayDate = moment();
		return todayDate.diff(birthdayDate, 'years').toPrecision();
	}

	/**
	 * Calculate week day from birthday date
	 * @param birthdayDate Birthday date in Moment date object
	 */
	public getWeekDay(birthdayDate: Moment): string {
		return birthdayDate.format('dddd');
	}

	/**
	 * Calculate birthday date to locale format
	 * @param birthdayDate Birthday date in Moment date object
	 */
	public getBirthday(birthdayDate: Moment): string {
		return birthdayDate.locale('cs-cz').format('LL');
	}
}
