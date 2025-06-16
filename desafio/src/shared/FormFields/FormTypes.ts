export type FormErrors= {
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  number?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  terms_accepted?: string;
}

export type FormTouched ={
  full_name?: boolean;
  email?: boolean;
  phone?: boolean;
  address?: boolean;
  number?: boolean;
  city?: boolean;
  state?: boolean;
  zip_code?: boolean;
  terms_accepted?: boolean;
}

export type PersonalDataValues ={
  full_name: string;
  email: string;
  phone: string;
}

export type AddressDataValues = {
  address: string;
  number: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface TermsValues {
  terms_accepted: boolean;
}

export interface AllFormValues extends PersonalDataValues, AddressDataValues, TermsValues {}

export type SetFieldValueFunction = (field: string, value: unknown, shouldValidate?: boolean) => void;
