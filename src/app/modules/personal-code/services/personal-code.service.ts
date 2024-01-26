import { Injectable } from '@angular/core';
import moment, { Moment } from 'moment/moment';

import locale from '../../../shared/locale/root.locale.json';
import { FormValue } from '../models/form-value.interface';

@Injectable()
export class PersonalCodeService {
	public getBirthDate(value: FormValue) {
		const [year, month, day] = value.date;
		return moment([year, month - 1, day]);
	}

	/**
	 * Parse written code into small pieces
	 * @param codeValue Written value in form input
	 */
	public parseCode(codeValue: string): FormValue {
		const code = codeValue.trim();

		// string values
		const yearDigits = code.substring(0, 2);
		const monthDigits = code.substring(2, 4);
		const dayDigits = code.substring(4, 6);

		// number values
		const yearNum = parseInt(yearDigits, 10);
		const monthNum = parseInt(monthDigits, 10);
		const day = parseInt(dayDigits, 10);
		const year = this.getFullYear(yearNum);
		const month = this.getFullMonth(monthNum); // may return -1

		return {
			date: [year, month, day],
			digits: [yearDigits, monthDigits, dayDigits],
		};
	}

	/**
	 * Get full year from personal code
	 * @param year Last 2 digits from year
	 */
	private getFullYear(year: number): number {
		// before 54 the personal code has 3 digits after slash
		if (year >= 54 && year <= 99) {
			return parseInt('19' + year, 10);
		}
		return parseInt('20' + year, 10);
	}

	/**
	 * Get correct month from personal code
	 * @param month Date month number
	 */
	private getFullMonth(month: number): number {
		if (month >= 1 && month <= 12) {
			return month;
		} else if (month >= 51 && month <= 62) {
			return month - 50;
		} else {
			return -1;
		}
	}

	/**
	 * Check if written date is valid
	 * @param year Date year
	 * @param month Date month
	 * @param day Date day
	 */
	public checkDateValidity(year: number, month: number, day: number): boolean {
		return moment([year, month - 1, day]).isValid();
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
