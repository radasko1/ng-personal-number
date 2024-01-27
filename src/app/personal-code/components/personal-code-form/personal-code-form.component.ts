import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { debounceTime, noop, Subject, takeUntil } from 'rxjs';

import { FormValue } from '../../models/form-value.interface';
import { CodeValidationService } from '../../services/code-validation.service';

@Component({
	selector: 'app-personal-code-form',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formGroup]="formGroup">
			<div class="flex items-center justify-center font-open-sans font-bold">
				<input
					type="text"
					class="text-[50px] h-[60px] bg-transparent text-right w-[175px] focus:outline-none"
					maxlength="6"
					placeholder="000000"
					formControlName="code"
					tabindex="0"
					autofocus
				/>
				<label class="text-[60px] inline-block mx-2.5 leading-[60px] select-none">
					&#8725;
				</label>
				<label class="text-[50px] inline-block leading-[50px] select-none">
					&Star;&Star;&Star;&Star;
				</label>
			</div>
		</form>
		<!-- Form Error Message -->
		<app-form-error />
	`,
})
export class PersonalCodeFormComponent implements OnInit, OnDestroy {
	private subs$ = new Subject<boolean>();
	/** Form for birth code number */
	protected formGroup = this.fb.group({
		code: this.fb.control<string>('', {
			// basic regex to control pattern validity (because February month)
			validators: [Validators.pattern('[0-9]{6}')],
		}),
	});

	/** Whether the code pass pattern, then it's emitted */
	@Output() onValueChange = new EventEmitter<FormValue | undefined>();

	constructor(
		private fb: NonNullableFormBuilder,
		private codeValidation: CodeValidationService,
	) {}

	ngOnInit() {
		this.formGroup.controls.code.valueChanges
			.pipe(debounceTime(800), takeUntil(this.subs$))
			.subscribe({
				next: () => {
					const codeControl = this.formGroup.controls.code;
					const value = this.codeValidation.validate(codeControl);

					this.onValueChange.next(value);
				},
				error: (err: any) => noop(),
			});
	}

	ngOnDestroy() {
		this.subs$.next(true);
		this.subs$.unsubscribe();
	}
}
