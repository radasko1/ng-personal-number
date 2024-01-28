import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PersonalCodeComponent } from './components/personal-code/personal-code.component';
import { PersonalCodeFormComponent } from './components/personal-code-form/personal-code-form.component';
import { PersonalCodePersonInfoComponent } from './components/personal-code-person-info/personal-code-person-info.component';
import { CodeInformationService } from './services/code-information.service';
import { CodeParserService } from './services/code-parser.service';
import { CodeValidationService } from './services/code-validation.service';
import { ErrorModule } from '../error-module/error.module';

@NgModule({
	declarations: [PersonalCodeComponent, PersonalCodeFormComponent, PersonalCodePersonInfoComponent],
	exports: [PersonalCodeComponent],
	imports: [CommonModule, ReactiveFormsModule, ErrorModule],
	providers: [CodeInformationService, CodeParserService, CodeValidationService],
})
export class PersonalCodeModule {}
