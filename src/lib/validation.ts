/**
 * Common Real-Time Validation Utilities for BRC Brake Chambers Forms
 */

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/;

export function validateRequired(value: string | undefined | null, fieldLabel: string, minLength = 2): string | null {
  if (!value || !value.trim()) {
    return `${fieldLabel} is required`;
  }
  if (value.trim().length < minLength) {
    return `${fieldLabel} must be at least ${minLength} characters`;
  }
  return null;
}

export function validateEmail(value: string | undefined | null): string | null {
  if (!value || !value.trim()) {
    return 'Email address is required';
  }
  if (!EMAIL_REGEX.test(value.trim())) {
    return 'Please enter a valid email address (e.g. name@company.com)';
  }
  return null;
}

export function validatePhone(value: string | undefined | null, isRequired = false): string | null {
  if (!value || !value.trim()) {
    if (isRequired) return 'Phone number is required';
    return null;
  }
  const cleanPhone = value.replace(/[\s()-]/g, '');
  if (cleanPhone.length < 7 || !PHONE_REGEX.test(value.trim())) {
    return 'Please enter a valid phone number with country/area code';
  }
  return null;
}
