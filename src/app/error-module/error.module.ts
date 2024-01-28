import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './components/error/error.component';
import { ErrorService } from './services/error.service';

@NgModule({
	declarations: [ErrorComponent],
	imports: [CommonModule],
	providers: [ErrorService],
	exports: [ErrorComponent],
})
export class ErrorModule {}
