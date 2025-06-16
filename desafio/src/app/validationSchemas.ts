import * as Yup from 'yup';

const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
const zipCodeRegex = /^\d{5}-\d{3}$/;

const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const personalDataSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .required('Nome completo é obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  phone: Yup.string()
    .matches(phoneRegex, 'Telefone deve ter formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX')
    .test('min-digits', 'Telefone deve ter pelo menos 10 dígitos', (value) => {
      if (!value) return false;
      const digits = value.replace(/\D/g, '');
      return digits.length >= 10;
    })
    .required('Telefone é obrigatório'),
});

export const addressDataSchema = Yup.object().shape({
  address: Yup.string()
    .min(5, 'Endereço deve ter pelo menos 5 caracteres')
    .required('Endereço é obrigatório'),
  number: Yup.string()
    .required('Número é obrigatório'),
  city: Yup.string()
    .min(2, 'Cidade deve ter pelo menos 2 caracteres')
    .required('Cidade é obrigatório'),
  state: Yup.string()
    .oneOf(brazilianStates, 'Estado deve ser uma sigla válida do Brasil')
    .required('Estado é obrigatório'),
  zip_code: Yup.string()
    .matches(zipCodeRegex, 'CEP deve ter formato XXXXX-XXX')
    .required('CEP é obrigatório'),
});
