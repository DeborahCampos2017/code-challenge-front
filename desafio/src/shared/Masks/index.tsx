export const phoneMask = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  
  const limitedValue = cleanValue.substring(0, 11);
  
  if (limitedValue.length <= 2) {
    return `(${limitedValue}`;
  } else if (limitedValue.length <= 6) {
    return `(${limitedValue.substring(0, 2)}) ${limitedValue.substring(2)}`;
  } else if (limitedValue.length <= 10) {
    return `(${limitedValue.substring(0, 2)}) ${limitedValue.substring(2, 6)}-${limitedValue.substring(6)}`;
  } else {
    return `(${limitedValue.substring(0, 2)}) ${limitedValue.substring(2, 7)}-${limitedValue.substring(7)}`;
  }
};

export const zipCodeMask = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  
  const limitedValue = cleanValue.substring(0, 8);
  
  if (limitedValue.length <= 5) {
    return limitedValue;
  } else {
    return `${limitedValue.substring(0, 5)}-${limitedValue.substring(5)}`;
  }
};

export const formatZipCodeForAPI = (maskedZipCode: string): string => {
  const cleanValue = maskedZipCode.replace(/\D/g, '');
  
  if (cleanValue.length === 8) {
    return `${cleanValue.substring(0, 5)}-${cleanValue.substring(5)}`;
  }
  
  return maskedZipCode;
};

export const formatPhoneForAPI = (maskedPhone: string): string => {
  const cleanValue = maskedPhone.replace(/\D/g, '');
  
  if (cleanValue.length === 10) {
    return `(${cleanValue.substring(0, 2)}) ${cleanValue.substring(2, 6)}-${cleanValue.substring(6)}`;
  } else if (cleanValue.length === 11) {
    return `(${cleanValue.substring(0, 2)}) ${cleanValue.substring(2, 7)}-${cleanValue.substring(7)}`;
  }
  
  return maskedPhone; 
};


export const isValidPhone = (phone: string): boolean => {
  const cleanValue = phone.replace(/\D/g, '');
  return cleanValue.length === 10 || cleanValue.length === 11;
};


export const isValidZipCode = (zipCode: string): boolean => {
  const cleanValue = zipCode.replace(/\D/g, '');
  return cleanValue.length === 8;
};
