import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BirthCodeComponent } from './components/birth-code/birth-code.component';
import { BirthCodeFormComponent } from './components/birth-code-form/birth-code-form.component';
import { BirthCodeInfoComponent } from './components/birth-code-info/birth-code-info.component';

@NgModule({
    declarations: [
        BirthCodeComponent,
        BirthCodeFormComponent,
        BirthCodeInfoComponent,
    ],
    exports: [BirthCodeComponent],
    imports: [CommonModule, ReactiveFormsModule],
})
export class PersonalCodeModule {}
