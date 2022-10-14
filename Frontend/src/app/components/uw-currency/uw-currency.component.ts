import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UwCurrencyNotifierService } from 'src/app/components/uw-currency/uw-currency-notifier.service';

@Component({
	selector: 'uw-currency',
	templateUrl: './uw-currency.component.html',
	styleUrls: ['./uw-currency.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class UwCurrencyComponent implements OnInit, OnDestroy {
	@Input() set value(val: any) {
		if (this.absolute) {
			val = Math.abs(val);
		}

		if (this.round) {
			this.decimalPart = 0;
			this.integerPart = Math.round(val);
		} else {
			var decimal = Math.abs(val);
			this.decimalPart = Math.abs(decimal - Math.floor(decimal));
			this.decimalPart = Math.abs(this.decimalPart * 100);
			this.integerPart = Math.trunc(val);
		}
	}

	@Input() currencyCode: string;
	@Input() symbol: string = 'symbol-narrow'; //symbol-narrow,
	@Input() prefix: string = '';
	@Input() showDecimal: boolean = true;
	/**Round value */
	@Input() round: boolean = false;
	/**Show Value as absolute (always positive) */
	@Input() absolute: boolean = false;

	integerPart: number | string;
	decimalPart: number | string;

	lang: string;

	subscription: Subscription = new Subscription();

	constructor(private translateService: TranslateService, private uwCurrencyNotifierService: UwCurrencyNotifierService) {}

	ngOnInit(): void {
		this.currencyCode = this.uwCurrencyNotifierService.getCurrencyValueString;
		this.subscription.add(
			this.uwCurrencyNotifierService.currencyEmitter.subscribe((x) => {
				this.currencyCode = x.toString();
			})
		);

		this.lang = this.translateService.currentLang;
		this.subscription.add(
			this.translateService.onLangChange.subscribe((x) => {
				this.lang = x.lang;
			})
		);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
