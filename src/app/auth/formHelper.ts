import { LoginFormFieldModel } from '../models/login-formField.model';

const loginFormErrors = {
  email: {
    required: 'The email field is required',
    email: 'Please enter a correct email',
  },
  password: {
    required: 'The password field is required',
    minlength: ''
  }
};


export class CustomFormErrorChecker {
  constructor(private formFields: LoginFormFieldModel[], private formName: string) {
  }

  public hasErrors(): boolean {
    for (const field of this.formFields) {
        if (field.errors !== null) {
          return true;
        }
    }

    return false;
  }

  public getError(): string {
    for (const field of this.formFields) {
      if (field.errors !== null) {
        const errorType = Object.keys(field.errors)[0];

        if (errorType === 'minlength') {
          return this.minLengthError(field.errors[errorType]['requiredLength'], field.name);
        }

        return loginFormErrors[field.name][errorType];
      }
    }
  }

  private minLengthError(minLength, fieldName) {
    return 'The ' + fieldName + ' length must be minimum ' + minLength + ' characters';
  }
}
