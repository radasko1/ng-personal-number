import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BirthCodeComponent } from './components/personal-code/birth-code.component';
import { BirthCodeFormComponent } from './components/personal-code-form/birth-code-form.component';
import { BirthCodeInfoComponent } from './components/personal-code-person-info/birth-code-info.component';
import { PersonalCodeService } from './services/personal-code.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [BirthCodeComponent, BirthCodeFormComponent, BirthCodeInfoComponent],
	exports: [BirthCodeComponent],
	imports: [CommonModule, ReactiveFormsModule, SharedModule],
	providers: [PersonalCodeService],
})
export class PersonalCodeModule {}
