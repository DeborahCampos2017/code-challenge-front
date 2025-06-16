export const Colors = {
  primary: '#ff4d4d',
  black: 'black',
  redError: 'red.700',
  redBackground: 'red.50',
  redBorder: 'red.500'
} as const;

export const Toast_Config = {
  success: {
    title: 'Cadastro realizado com sucesso!',
    description: 'Usuário foi criado com sucesso.',
    status: 'success' as const,
    duration: 5000,
  },
  error: {
    title: 'Erro no cadastro',
    status: 'error' as const,
    duration: 7000,
  },
  common: {
    isClosable: true,
    position: 'top' as const,
  }
} as const;