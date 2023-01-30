/**
 * Created by quando on 6/3/17.
 */
import m from './messages';

export const EMAIL_EXISTS = 'email address already exists';
export const EMAIL_DUPLICATED = 'email cannot be duplicated';
export const COGNITO_EXISTS = 'An account with the given email already exists.';
export const EMAIL_EXISTS_ERROR = m.emailExist.defaultMessage;
export const EMAIL_INVALID =
  'User name must be in the form of an email address';
export const EMAIL_INVALID_ERROR = 'does not look like an email';
export const ORG_NAME_EXISTS =
  'The `organisation` instance is not valid. Details: `namekey` namekey not unique.';
export const ORG_NAME_EXISTS_ERROR =
  'this organisation and address has already been registered; please contact the organisation owner.';
export const INVITATION_TOKEN_NOT_FOUND =
  'your invitation token is not found or has expired';
export const PERSON_SERVICE_ERROR =
  'The `person` instance is not valid. Details: `userId` Already in used';
export const OTHER_ERROR =
  'Oops, there is a problem, please reload this page and try again.';
