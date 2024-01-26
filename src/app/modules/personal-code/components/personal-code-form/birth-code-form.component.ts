import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { debounceTime, noop, Subject, takeUntil } from 'rxjs';

import { PersonalCodeService } from '../../services/personal-code.service';
import locale from '../../../../shared/locale/root.locale.json';
import { FormValue } from '../../models/form-value.interface';

@Component({
	selector: 'app-birth-code-form',
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
		<div class="block text-center mt-2 font-roboto text-yellow text-lg font-medium h-[20px]">
			<div
				*ngFor="let error of errorMsgs"
				[class.block]="error"
				[class.hidden]="!error"
				class="leading-[20px]"
			>
				{{ error }}
			</div>
		</div>
	`,
})
export class BirthCodeFormComponent implements OnInit, OnDestroy {
	private subs$ = new Subject<boolean>();
	/** Form for birth code number */
	protected formGroup = this.fb.group({
		code: this.fb.control<string>('', {
			// basic regex to control pattern validity (because February month)
			validators: [Validators.pattern('[0-9]{6}')],
		}),
	});
	/** Error message indicator */
	protected errorMsgs: string[] = [];

	/** Whether the code pass pattern, then it's emitted */
	@Output() onValueChange = new EventEmitter<FormValue | undefined>();

	constructor(
		private fb: NonNullableFormBuilder,
		private codeService: PersonalCodeService,
	) {}

	ngOnInit() {
		this.formGroup.controls.code.valueChanges
			.pipe(debounceTime(800), takeUntil(this.subs$))
			.subscribe({
				next: (value) => {
					this.errorMsgs = []; // cleaning
					const codeControl = this.formGroup.controls.code;

					// written code is out of pattern
					if (codeControl.hasError('pattern')) {
						this.errorMsgs.push(locale['INVALID_PATTERN']);
						this.onValueChange.next(undefined);
						return;
					}

					// calculate data in service
					const parsedCode = this.codeService.parseCode(value);
					const [year, month, day] = parsedCode.date;
					const isDateValid = this.codeService.checkDateValidity(year, month, day);

					// written code is not valid date
					if (!isDateValid) {
						this.errorMsgs.push(locale['INVALID_DATE']);
						this.onValueChange.next(undefined);
						return;
					}

					this.onValueChange.next(parsedCode);
				},
				error: (err) => noop(),
			});
	}

	ngOnDestroy() {
		this.subs$.next(true);
		this.subs$.unsubscribe();
	}
}
