import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

import locale from '../../../../shared/locale/root.locale.json';

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
    private personalCode = new Subject<string>();
    protected readonly locale = locale;
    /** Form for birth code number */
    protected formGroup = this.fb.group({
        code: this.fb.control<string>('000000', {
            validators: [Validators.pattern('[0-9]{6}')],
        }),
    });
    /** Error message indicator */
    protected hasPatternError = false;

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

                    if (codeControl.errors) {
                        return;
                    }

                    // whether code is not valid, don't send
                    this.personalCode.next(value);
                },
                error: (err) => {
                    // do I need do something with error?
                    console.log(err);
                },
            });
    }

    ngOnDestroy() {
        this.subs$.next(true);
        this.subs$.unsubscribe();
    }
}
