export const phoneMask = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 10) {
    return cleanValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    return cleanValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
};

export const zipCodeMask = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  return cleanValue.replace(/(\d{5})(\d{3})/, '$1-$2');
};
