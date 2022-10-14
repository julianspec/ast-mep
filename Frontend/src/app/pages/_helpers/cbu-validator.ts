import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseCoelsa } from "../_model";
import { CobisService } from "../_servicios";

export class CbuValidator {
   static createValidator(cobis: CobisService, moneda: string): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors> => {
         return cobis.validaCBU(control.value, moneda).pipe(
            map((result: ResponseCoelsa) => result.code == 0 ? null : {invalidCBUAsync: true}));
      };
   }
}

export class ResponseValidator{
   result: ValidationErrors;
   message: string;

   constructor(result:ValidationErrors, message: string) {
      this.result = result;
      this.message = message;
   }
}
