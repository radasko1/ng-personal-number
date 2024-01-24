import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div
            class="app w-full h-full bg-white absolute left-0 top-0 flex items-center justify-center"
        >
            <app-birth-code
                class="bg-violet text-white p-12 rounded-3xl min-w-[680px] min-h-[360px] relative flex flex-col justify-between shadow-2xl"
            />
        </div>
    `,
})
export class AppComponent {}
