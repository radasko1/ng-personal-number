import { Component } from '@angular/core';
import moment, { Moment } from 'moment';
import 'moment/locale/cs.js';

import locale from '../../locale/root.locale.json';
import { Gender } from '../../models/gender.type';
import { PersonalCode } from '../../models/personal-code.interface';
import { weekDay } from '../../constants/week-day.constant';

@Component({
    selector: 'app-birth-code',
    template: `
        <app-birth-code-form (onCodeChange$)="onCodeChange($event)" />

        <div>
            <app-birth-code-info
                [title]="locale['GENDER']"
                [value]="this.gender ? locale[this.gender] : undefined"
            />
            <app-birth-code-info [title]="locale['AGE']" [value]="age" />
            <app-birth-code-info
                [title]="locale['WEEKDAY']"
                [value]="dayInWeek"
            />
            <app-birth-code-info
                [title]="locale['BIRTHDAY_DATE']"
                [value]="birthDate"
                [isLast]="true"
            />
        </div>
    `,
})
export class BirthCodeComponent {
    private personalCode: PersonalCode | undefined;
    protected readonly locale = locale;

    /** Gender type calculated from month date */
    protected gender: Gender | undefined;
    /** Age calculated from date */
    protected age: number | undefined;
    /** Day in week calculated from birthdate */
    protected dayInWeek: string | undefined;
    /** Birthdate in locale format */
    protected birthDate: string | undefined;

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
            this.gender = 'MALE';
        } else if (monthNum >= 51 && monthNum <= 62) {
            this.gender = 'FEMALE';
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

        this.age = difference;
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

        this.dayInWeek = weekDay[weekDayISO - 1];
    }

    private calculateBirthday() {
        const birthDate = this.getBirthdateDate();
        if (!birthDate) {
            return;
        }

        this.birthDate = birthDate.locale('cs-cz').format('LL');
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
}
