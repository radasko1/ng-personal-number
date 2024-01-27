import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-birth-code-info',
	changeDetection: ChangeDetectionStrategy.OnPush,
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
export class PersonalCodePersonInfoComponent {
	/** Data key title */
	@Input({ required: true }) title = '';
	/** Data key value */
	@Input() value: string = '';
	/** Whether is item last in list */
	@Input() isLast = false;
}
