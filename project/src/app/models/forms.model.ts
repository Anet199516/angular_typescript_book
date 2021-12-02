import {AbstractControl, FormArray, FormGroup} from "@angular/forms";

export interface ISaveResult<T> {
  error: ErrorResponseBase;
  value: T;
}

export interface IEditableSectionModelChangeEvent<T> {
  model: T;
}

export class ErrorResponseBase {
  code?: number;
  status?: number;
  fullMessage?: string;
  message?: string;
  /** For identity an array item */
  itemId?: number; // TODO: Get rid of all 'extends ErrorResponseBase' classes and use itemId instead. Then ErrorResponseBase can be shortened to ErrorResponse
  /** For proper form resetting of an array item */
  report?: 'success' | null; // TODO: Change to boolean and get rid of 'success' string
  // For form control
  controlName?: string;
  errorObject?: {
    [errorName: string]: {
      message?: string;
      // link?: NavigationRoute;
    }
  };
}

export type FormControls<T extends number | string | symbol> = { [key in T]: AbstractControl; };
export type FormObject<T extends number | string | symbol> = { [key in T]: any[] | FormArray | FormGroup; };
export type FormKeys<T extends number | string | symbol> = { [key in T]: key; };

// export type NavigationRoute = (string | number | ENodeTypeLc)[];

export interface ISearch {
  title: string;
  price: string;
  category: string;
}
