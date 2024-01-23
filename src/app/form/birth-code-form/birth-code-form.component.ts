import { Component, OnDestroy, OnInit } from '@angular/core'
import { NonNullableFormBuilder, Validators } from '@angular/forms'
import { debounceTime, Subject, takeUntil } from 'rxjs'

// TODO: json file for error messages?
const invalidPatternMsg = 'Zadaná hodnota není validní'

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
                <label class="text-[60px] inline-block mx-2.5 leading-[60px]">
                    /
                </label>
                <label class="text-[50px] inline-block leading-[50px]">
                    XXXX
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
                {{ invalidPatternMsg }}
            </div>
        </div>
    `,
})
export class BirthCodeFormComponent implements OnInit, OnDestroy {
    private subs$ = new Subject<boolean>()
    /** Form for birth code number */
    protected formGroup = this.fb.group({
        code: this.fb.control<string>('', {
            validators: [Validators.pattern(new RegExp(/[0-9]{6}/))],
        }),
    })
    /** Error message indicator */
    protected hasPatternError = false
    /** Error message for invalid number */
    protected invalidPatternMsg = invalidPatternMsg

    constructor(private fb: NonNullableFormBuilder) {}

    ngOnInit() {
        this.formGroup.controls.code.valueChanges
            .pipe(debounceTime(800), takeUntil(this.subs$))
            .subscribe({
                next: (value) => {
                    this.hasPatternError =
                        this.formGroup.controls.code.hasError('pattern')
                },
            })
    }

    ngOnDestroy() {
        this.subs$.next(true)
        this.subs$.unsubscribe()
    }
}
