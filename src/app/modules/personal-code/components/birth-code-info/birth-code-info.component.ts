import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-birth-code-info',
	template: `
		<div
			class="code-info flex align-center justify-start font-rubik text-[20px]"
			[class.mb-4]="!isLast"
			[class.mb-0]="isLast"
		>
			<div class="leading-[24px] inline-block font-normal">{{ title }}:</div>
			<div class="ml-3 leading-[24px] inline-block font-semibold">
				{{ value }}
			</div>
		</div>
	`,
})
export class BirthCodeInfoComponent {
	/** Data key title */
	@Input({ required: true }) title = '';
	/** Data key value */
	@Input({ transform: transformValue }) value: string | undefined;
	/** Whether is item last in list */
	@Input() isLast = false;
}

/** Transform function for 'value' input */
function transformValue(value: string | undefined): string {
	return value ?? '-';
}
