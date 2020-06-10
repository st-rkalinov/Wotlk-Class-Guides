import { FormFieldModel } from '../models/form-field.model';

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

const signUpFormErrors = {
  email: {
    required: 'The email field is required',
    email: 'Please enter a correct email',
  },
  password: {
    required: 'The password field is required',
    minlength: ''
  },
  passwordConfirm: {
    required: 'The confirm password field is required',
    minlength: ''
  },
  nickname: {
    required: 'The nickname field is required',
    minlength: ''
  },
};

const globalErrors = {
  notSame: 'The passwords doesnt match'
};

export class FormErrorChecker {
  constructor(private formFields: FormFieldModel[], private formGlobalErrors: object, private formName: string) {
  }

  public hasErrors(): boolean {
    if (this.formGlobalErrors) {
      return true;
    }

    for (const field of this.formFields) {
        if (field.errors !== null) {
          return true;
        }
    }

    return false;
  }

  public getError(): string {
    if (this.formGlobalErrors) {
      return this.getGlobalError();
    }

    return this.getFieldError();
  }

  private getFieldError() {
    for (const field of this.formFields) {
      if (field.errors !== null) {
        const errorType = Object.keys(field.errors)[0];

        if (errorType === 'minlength') {
          return this.minLengthError(field.errors[errorType]['requiredLength'], field.name);
        }

        if (field.name === 'login') {
          return loginFormErrors[field.name][errorType];
        } else {
          return signUpFormErrors[field.name][errorType];
        }
      }
    }
  }

  private getGlobalError() {
    const errorType = Object.keys(this.formGlobalErrors)[0];

    return globalErrors[errorType];
  }

  private minLengthError(minLength, fieldName) {
    return 'The ' + fieldName + ' length must be minimum ' + minLength + ' characters';
  }
}
