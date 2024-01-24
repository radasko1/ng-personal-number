import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { debounceTime, noop, Subject, takeUntil } from 'rxjs';
import moment from 'moment';

import locale from '../../../../shared/locale/root.locale.json';
import { ParsedCode } from '../../models/parsed-code.interface';

@Component({
    selector: 'app-birth-code-form',
    template: `
        <form [formGroup]="formGroup">
            <div
                class="flex items-center justify-center font-open-sans font-bold"
            >
                <input
                    type="text"
                    class="text-[50px] h-[60px] bg-transparent text-right w-[175px] focus:outline-none"
                    maxlength="6"
                    formControlName="code"
                />
                <label
                    class="text-[60px] inline-block mx-2.5 leading-[60px] select-none"
                >
                    &#8725;
                </label>
                <label
                    class="text-[50px] inline-block leading-[50px] select-none"
                >
                    &Star;&Star;&Star;&Star;
                </label>
            </div>
        </form>
        <!-- Form Error Message -->
        <div
            [class.hidden]="!hasPatternError"
            [class.block]="hasPatternError"
            class="text-center mt-2 font-roboto"
        >
            <!-- TODO: absolute space for error message -->
            <div
                *ngIf="hasPatternError"
                class="block text-yellow leading-[20px] text-lg font-medium"
            >
                {{ locale.INVALID_PATTERN }}
            </div>
        </div>
    `,
})
export class BirthCodeFormComponent implements OnInit, OnDestroy {
    private subs$ = new Subject<boolean>();
    private personalCode = new Subject<ParsedCode>();
    protected readonly locale = locale;
    /** Form for birth code number */
    protected formGroup = this.fb.group({
        code: this.fb.control<string>('000000', {
            // basic regex to control pattern validity (because February month)
            validators: [Validators.pattern('[0-9]{6}')],
        }),
    });
    /** Error message indicator */
    protected hasPatternError = false; // TODO: will be more errors

    /** Whether the code pass pattern, then it's emitted */
    @Output() onCodeChange$ = this.personalCode.asObservable();

    constructor(private fb: NonNullableFormBuilder) {}

    ngOnInit() {
        this.formGroup.controls.code.valueChanges
            .pipe(debounceTime(800), takeUntil(this.subs$))
            .subscribe({
                next: (value) => {
                    const codeControl = this.formGroup.controls.code;
                    // better be part of some object with all error, where you can check each of them
                    this.hasPatternError = codeControl.hasError('pattern');

                    // custom validator, date validator?
                    const parsedCode = this.parseCode(value);
                    const [year, month, day] = parsedCode.date;
                    const isDateValid = this.checkDateValidity(
                        year,
                        month,
                        day,
                    );

                    // TODO: error use-cases - not all number digits; not valid date
                    if (codeControl.errors || !isDateValid) {
                        return;
                    }

                    // whether code is not valid, don't send
                    this.personalCode.next(parsedCode);
                },
                error: (err) => noop(),
            });
    }

    ngOnDestroy() {
        this.subs$.next(true);
        this.subs$.unsubscribe();
    }

    /**
     * Parse written code into small pieces
     * @param codeValue Written value in form input
     */
    private parseCode(codeValue: string): ParsedCode {
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
     * Check if written date is valid
     * @param year Date year
     * @param month Date month
     * @param day Date day
     */
    private checkDateValidity(
        year: number,
        month: number,
        day: number,
    ): boolean {
        const date = moment([year, month - 1, day]);

        return date.isValid();
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
