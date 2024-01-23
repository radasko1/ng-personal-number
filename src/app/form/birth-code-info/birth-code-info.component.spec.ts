import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BirthCodeInfoComponent } from './birth-code-info.component'

describe('BirthCodeInfoComponent', () => {
    let component: BirthCodeInfoComponent
    let fixture: ComponentFixture<BirthCodeInfoComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BirthCodeInfoComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(BirthCodeInfoComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
