import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FormErrorService {
	private errorMessage: string | undefined;
	private hasError = new Subject<boolean>();

	public hasError$ = this.hasError.asObservable();

	/** Get error message */
	public get error(): string | undefined {
		return this.errorMessage;
	}

	/** Set new error */
	public setError(errorMessage: string) {
		this.errorMessage = errorMessage;
		this.hasError.next(true);
	}

	/** Clear error message */
	public clear() {
		this.hasError.next(false);
		this.errorMessage = undefined;
	}
}
