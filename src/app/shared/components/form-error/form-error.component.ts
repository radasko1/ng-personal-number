import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormErrorService } from '../../services/form-error.service';

@Component({
	selector: 'app-form-error',
	template: `
		<div class="block text-center mt-2 font-roboto text-yellow text-lg font-medium h-[20px]">
			<div *ngIf="errorService.hasError$ | async" class="leading-[20px]">
				{{ errorService.error }}
			</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
	constructor(protected errorService: FormErrorService) {}
}
