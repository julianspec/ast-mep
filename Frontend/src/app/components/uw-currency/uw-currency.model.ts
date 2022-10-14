export enum UwCurrencyTypes {
	ARS = 'ARS',
	USD = 'USD',
	EUR = 'EUR'
}

export class GetsCurrencyFromEnum {
	public static getInt(enumObj: string): number {
		var allValues = [];
		for (var key in UwCurrencyTypes) {
			allValues.push(UwCurrencyTypes[key]);
		}
		var find = allValues.indexOf(enumObj);
		return find;
	}
}
