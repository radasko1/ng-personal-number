import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';
import moment, { Moment } from 'moment';
import 'moment/locale/cs.js';

import locale from '../../../../shared/locale/root.locale.json';
import { KeyValuePair } from '../../../../shared/models/key-value.interface';
import { ParsedCode } from '../../models/parsed-code.interface';

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
    protected readonly locale: KeyValuePair<string> = locale;
    // I choose Map to keep order of assigned values
    protected personInfo = new Map<string, string>();

    /**
     * Handle personal code written by user
     * @param code Parsed data = date + digits from code
     */
    protected onCodeChange(code: ParsedCode) {
        const [year, month, day] = code.date;
        const [, monthDigits] = code.digits;
        const birthdayDate = moment([year, month - 1, day]);

        this.calculateGender(monthDigits);
        this.calculateAge(birthdayDate);
        this.calculateWeekDay(birthdayDate);
        this.calculateBirthday(birthdayDate);
    }

    /**
     * Calculate gender based on written month
     * @param month Month in digits
     */
    private calculateGender(month: string) {
        const monthNumber = parseInt(month, 10);

        if (monthNumber >= 1 && monthNumber <= 12) {
            this.personInfo.set('GENDER', locale['MALE']);
        } else if (monthNumber >= 51 && monthNumber <= 62) {
            this.personInfo.set('GENDER', locale['FEMALE']);
        }
    }

    /**
     * Calculate age based on written personal code
     * @param birthdayDate Birthday date in Moment date object
     */
    private calculateAge(birthdayDate: Moment) {
        const todayDate = moment();
        const difference = todayDate.diff(birthdayDate, 'years').toPrecision();

        this.personInfo.set('AGE', difference);
    }

    /**
     * Calculate week day from birthday date
     * @param birthdayDate Birthday date in Moment date object
     */
    private calculateWeekDay(birthdayDate: Moment) {
        const dayName = birthdayDate.format('dddd');

        this.personInfo.set('WEEKDAY', dayName);
    }

    /**
     * Calculate birthday date to locale format
     * @param birthdayDate Birthday date in Moment date object
     */
    private calculateBirthday(birthdayDate: Moment) {
        this.personInfo.set(
            'BIRTHDAY_DATE',
            birthdayDate.locale('cs-cz').format('LL'),
        );
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
