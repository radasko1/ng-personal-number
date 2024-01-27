import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormErrorComponent } from './components/form-error/form-error.component';
import { FormErrorService } from './services/form-error.service';

@NgModule({
	declarations: [FormErrorComponent],
	imports: [CommonModule],
	providers: [FormErrorService],
	exports: [FormErrorComponent],
})
export class SharedModule {}
