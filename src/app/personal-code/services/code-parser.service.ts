import { Injectable } from '@angular/core';
import moment from 'moment';
import { FormValue } from '../models/form-value.interface';

@Injectable()
export class CodeParserService {
	/**
	 * Parse written code into small pieces
	 * @param codeValue Written value in form input
	 */
	public parseCode(codeValue: string): FormValue {
		const code = codeValue.trim();

		const [yearDigits, monthDigits, dayDigits] = this.extractDigits(code);
		const [year, month, day] = this.getFullDate(yearDigits, monthDigits, dayDigits);

		return {
			date: [year, month, day],
			digits: [yearDigits, monthDigits, dayDigits],
		};
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
	 * Get digits from written personal code
	 * @param code Code from user input
	 */
	private extractDigits(code: string): string[] {
		return [code.substring(0, 2), code.substring(2, 4), code.substring(4, 6)];
	}

	/**
	 * Get year and month number
	 * @param yearDigits
	 * @param monthDigits
	 * @param dayDigits
	 */
	private getFullDate(yearDigits: string, monthDigits: string, dayDigits: string): number[] {
		const yearNum = parseInt(yearDigits, 10);
		const monthNum = parseInt(monthDigits, 10);
		const day = parseInt(dayDigits, 10);
		const year = this.getFullYear(yearNum);
		const month = this.getFullMonth(monthNum);

		return [year, month, day];
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
}
