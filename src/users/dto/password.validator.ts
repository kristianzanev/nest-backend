import { registerDecorator, ValidationOptions } from 'class-validator';

import * as zxcvbn from 'zxcvbn';
// each password score:
// 0 # too guessable: risky password. (guesses < 10^3)

// 1 # very guessable: protection from throttled online attacks. (guesses < 10^6)

// 2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)

// 3 # safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)

// 4 # very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)
export function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) {
            this.error = 'Empty password';
            return false;
          }
          const result = zxcvbn(value);
          if (result.score < 3) {
            const text = 'Password is weak.';
            const concatedError = [
              text,
              result.feedback.warning,
              ...result.feedback.suggestions,
            ].join(' \n ');

            this.error = concatedError; // doesn't allow to assign something different than a string
            return false;
          }
          return true;
        },
        defaultMessage(): string {
          return this.error || 'Something went wrong';
        },
      },
    });
  };
}
