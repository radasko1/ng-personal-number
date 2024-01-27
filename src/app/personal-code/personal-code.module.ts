import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BirthCodeComponent } from './components/personal-code/birth-code.component';
import { BirthCodeFormComponent } from './components/personal-code-form/birth-code-form.component';
import { BirthCodeInfoComponent } from './components/personal-code-person-info/birth-code-info.component';
import { CodeInformationService } from './services/code-information.service';
import { CodeParserService } from './services/code-parser.service';
import { CodeValidationService } from './services/code-validation.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [BirthCodeComponent, BirthCodeFormComponent, BirthCodeInfoComponent],
	exports: [BirthCodeComponent],
	imports: [CommonModule, ReactiveFormsModule, SharedModule],
	providers: [CodeInformationService, CodeParserService, CodeValidationService],
})
export class PersonalCodeModule {}
