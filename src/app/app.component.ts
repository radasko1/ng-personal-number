import { Component } from '@angular/core'

@Component({
    selector: 'app-root',
    template: `
        <div class="app w-full h-full bg-slate-50">
            <div class="flex items-center justify-center">
                <app-birth-code
                    class="bg-violet text-white p-12 rounded-3xl min-w-[680px] min-h-[360px] relative flex flex-col justify-between"
                />
            </div>
        </div>
    `,
})
export class AppComponent {}
