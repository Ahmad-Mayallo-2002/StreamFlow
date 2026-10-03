import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Types } from 'mongoose';

export function IsObjectId(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return typeof value === 'string' && Types.ObjectId.isValid(value);
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid MongoDB ObjectId`;
        },
      },
    });
  };
}
