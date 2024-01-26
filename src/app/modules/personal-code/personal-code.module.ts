import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BirthCodeComponent } from './components/personal-code/birth-code.component';
import { BirthCodeFormComponent } from './components/personal-code-form/birth-code-form.component';
import { BirthCodeInfoComponent } from './components/personal-code-person-info/birth-code-info.component';
import { PersonalCodeService } from './services/personal-code.service';

@NgModule({
	declarations: [BirthCodeComponent, BirthCodeFormComponent, BirthCodeInfoComponent],
	exports: [BirthCodeComponent],
	imports: [CommonModule, ReactiveFormsModule],
	providers: [PersonalCodeService],
})
export class PersonalCodeModule {}
