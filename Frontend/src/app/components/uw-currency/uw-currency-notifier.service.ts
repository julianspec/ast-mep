import { EventEmitter, Injectable } from '@angular/core';
import { UwCurrencyTypes } from './uw-currency.model';

@Injectable({
	providedIn: 'root'
})
export class UwCurrencyNotifierService {
	getCurrencyValue: UwCurrencyTypes = UwCurrencyTypes.ARS;
	getCurrencyValueString: string = 'ARS';

	currencyEmitter = new EventEmitter<UwCurrencyTypes>();

	emitCurrencyChange(val: UwCurrencyTypes) {
		this.getCurrencyValue = val;
		this.getCurrencyValueString = val.toString();
		this.currencyEmitter.emit(val);
	}
}
