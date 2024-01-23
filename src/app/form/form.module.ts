import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { BirthCodeComponent } from './birth-code/birth-code.component'
import { BirthCodeFormComponent } from './birth-code-form/birth-code-form.component'
import { BirthCodeInfoComponent } from './birth-code-info/birth-code-info.component'

@NgModule({
    declarations: [
        BirthCodeComponent,
        BirthCodeFormComponent,
        BirthCodeInfoComponent,
    ],
    exports: [BirthCodeComponent],
    imports: [CommonModule, ReactiveFormsModule],
})
export class FormModule {}
