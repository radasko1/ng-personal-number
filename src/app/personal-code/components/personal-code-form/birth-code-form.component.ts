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
import { CodeParserService } from '../../services/code-parser.service';
import locale from '../../../shared/locale/root.locale.json';
import { FormErrorService } from '../../../shared/services/form-error.service';

@Component({
	selector: 'app-birth-code-form',
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
export class BirthCodeFormComponent implements OnInit, OnDestroy {
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
		private codeParserService: CodeParserService,
		private formErrorService: FormErrorService,
	) {}

	ngOnInit() {
		this.formGroup.controls.code.valueChanges
			.pipe(debounceTime(800), takeUntil(this.subs$))
			.subscribe({
				next: (value) => {
					const codeControl = this.formGroup.controls.code;

					// written code is out of pattern
					if (codeControl.hasError('pattern')) {
						this.formErrorService.setError(locale['INVALID_PATTERN']);
						this.onValueChange.next(undefined);
						return;
					}

					// calculate data in service
					const parsedCode = this.codeParserService.parseCode(value);
					const [year, month, day] = parsedCode.date;
					const isDateValid = this.codeParserService.checkDateValidity(year, month, day);

					// written code is not valid date
					if (!isDateValid) {
						this.formErrorService.setError(locale['INVALID_DATE']);
						this.onValueChange.next(undefined);
						return;
					}

					this.formErrorService.clear(); // ?
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
