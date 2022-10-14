import { UwWsResponse } from '@accusys/uw-core-service-model';
import { HttpErrorResponse } from '@angular/common/http';
export enum UwServiceErrorViewerModes {
	warn = 'warn',
	error = 'error'
}

export class UwServiceErrorViewer {
	code?: string;
	text?: string[];
	texti18n?: string[];
	data?: any;
	mode?: UwServiceErrorViewerModes = UwServiceErrorViewerModes.error;

	generateError(dataErrorHttp?: HttpErrorResponse, dataErrorResponse?: UwWsResponse<any>) {
		if (dataErrorResponse) {
			this.code = dataErrorResponse.message.messageCode;
			this.text = [dataErrorResponse.message.message];
			this.texti18n = null;
			this.data = dataErrorResponse;
		} else if (dataErrorHttp) {
			this.code = dataErrorHttp.status.toString();
			this.text = [dataErrorHttp.statusText];
			this.texti18n = null;
			this.data = dataErrorHttp;
		}

		return this;
	}
}
