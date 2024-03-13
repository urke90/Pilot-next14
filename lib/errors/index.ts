import { CredentialsSignin } from '@auth/core/errors';

export class CustomError extends CredentialsSignin {
  code = 'custom_error';
}
