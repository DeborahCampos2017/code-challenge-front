export const phoneMask = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export const cepMask = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
};
