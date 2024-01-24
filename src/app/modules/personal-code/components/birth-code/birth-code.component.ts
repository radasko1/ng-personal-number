import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';
import moment, { Moment } from 'moment';
import 'moment/locale/cs.js';

import locale from '../../../../shared/locale/root.locale.json';
import { PersonalCode } from '../../models/personal-code.interface';
import { WEEK_DAY } from '../../../../shared/constants/week-day.constant';
import { KeyValuePair } from '../../../../shared/models/key-value.interface';

@Component({
    selector: 'app-birth-code',
    template: `
        <app-birth-code-form (onCodeChange$)="onCodeChange($event)" />
        <div>
            <app-birth-code-info
                *ngFor="
                    let info of personInfo | keyvalue: sortFn;
                    last as isLast
                "
                [title]="locale[info.key]"
                [value]="info.value"
                [isLast]="isLast"
            />
        </div>
    `,
})
export class BirthCodeComponent {
    private personalCode: PersonalCode | undefined;
    protected readonly locale: KeyValuePair<string> = locale;
    // I choose Map to keep order of assigned values
    protected personInfo = new Map<string, string>();

    /**
     * Handle personal code written by user
     * @param code Personal code
     */
    protected onCodeChange(code: string) {
        this.parseCode(code);

        this.calculateGender();
        this.calculateAge();
        this.calculateWeekDay();
        this.calculateBirthday();
    }

    /**
     * Get 6 digits code and cut it into small pieces
     * @param personalCode Personal (birth) code
     */
    private parseCode(personalCode: string) {
        const code = personalCode.trim();

        if (code.length < 6) {
            return;
        }

        // string values
        const yearDigits = code.substring(0, 2);
        const monthDigits = code.substring(2, 4);
        const dayDigits = code.substring(4, 6);

        // number values
        const yearNum = parseInt(yearDigits, 10);
        const monthNum = parseInt(monthDigits, 10);
        const day = parseInt(dayDigits, 10);
        const year = this.getFullYear(yearNum);
        const month = this.getFullMonth(monthNum);

        // TODO: error handler?
        if (month < 0) {
            return;
        }

        if (day < 1 || day > 31) {
            return;
        }

        this.personalCode = {
            dayDigits,
            monthDigits,
            yearDigits,
            year,
            month,
            day,
        };
    }

    /**
     * Calculate gender based on written month
     */
    private calculateGender() {
        if (!this.personalCode) {
            return;
        }

        const month = this.personalCode.monthDigits;
        if (!month) {
            return;
        }

        const monthNum = parseInt(month, 10);

        if (monthNum >= 1 && monthNum <= 12) {
            this.personInfo.set('GENDER', locale['MALE']);
        } else if (monthNum >= 51 && monthNum <= 62) {
            this.personInfo.set('GENDER', locale['FEMALE']);
        }
    }

    /**
     * Calculate age based on written personal code
     */
    private calculateAge() {
        const birthDate = this.getBirthdateDate();
        if (!birthDate) {
            return;
        }

        const todayDate = moment();
        const difference = todayDate.diff(birthDate, 'year');

        this.personInfo.set('AGE', difference.toString());
    }

    /**
     * Calculate week day from birthday date
     */
    private calculateWeekDay() {
        const birthDate = this.getBirthdateDate();
        if (!birthDate) {
            return;
        }

        const weekDayISO = birthDate.isoWeekday();

        this.personInfo.set('WEEKDAY', WEEK_DAY[weekDayISO - 1]);
    }

    private calculateBirthday() {
        const birthDate = this.getBirthdateDate();
        if (!birthDate) {
            return;
        }

        this.personInfo.set(
            'BIRTHDAY_DATE',
            birthDate.locale('cs-cz').format('LL'),
        );
    }

    /**
     * Get full year from personal code
     * @param year Last 2 digits from year
     */
    private getFullYear(year: number): number {
        if (year >= 54 && year <= 99) {
            return parseInt('19' + year, 10);
        }
        return parseInt('20' + year, 10);
    }

    /**
     * Get correct month from personal code
     * @param month Digits from code
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
     * Get birthday date from parsed personal code values
     */
    private getBirthdateDate(): Moment | undefined {
        if (!this.personalCode) {
            return undefined;
        }

        const { year, month, day } = this.personalCode;
        const birthDate = moment([year, month - 1, day]);

        return birthDate;
    }

    /**
     * KeyValue pipe compare function
     * @param a
     * @param b
     */
    protected sortFn(
        a: KeyValue<string, string>,
        b: KeyValue<string, string>,
    ): number {
        return 0;
    }
}
