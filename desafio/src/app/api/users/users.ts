import type { NextApiRequest, NextApiResponse } from 'next';

interface UserData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  number: string;
  city: string;
  state: string;
  zip_code: string;
  terms_accepted: boolean;
}

interface ApiResponse {
  message?: string;
  data?: UserData;
  error?: string;
}

const users: (UserData & { id: number })[] = [];
let nextId = 1;

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10;
};

const isValidZipCode = (zipCode: string): boolean => {
  const cleanZip = zipCode.replace(/\D/g, '');
  return cleanZip.length === 8;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | UserData[]>
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return res.status(200).json(users);

    case 'POST':
      try {
        const userData: UserData = req.body;
        
        if (!userData.full_name?.trim()) {
          return res.status(400).json({ 
            error: 'Validation Error',
            message: 'Nome completo é obrigatório' 
          });
        }

        if (!userData.email?.trim()) {
          return res.status(400).json({ 
            error: 'Validation Error',
            message: 'Email é obrigatório' 
          });
        }

        if (!userData.phone?.trim()) {
          return res.status(400).json({ 
            error: 'Validation Error',
            message: 'Telefone é obrigatório' 
          });
        }

        if (!userData.address?.trim()) {
          return res.status(400).json({ 
            error: 'Validation Error',
            message: 'Endereço é obrigatório' 
          });
        }

        if (!userData.number?.trim()) {
          return res.status(400).json({ 
            error: 'Validation Error',
            message: 'Número é obrigatório' 
          });
        }

        if (!userData.city?.trim()) {
          return res.status(400).json({ 
            error: 'Validation Error',
            message: 'Cidade é obrigatória' 
          });
        }

        if (!userData.state?.trim()) {
          return res.status(400).json({ 
            error: 'Validation Error',
            message: 'Estado é obrigatório' 
          });
        }

        if (!userData.zip_code?.trim()) {
          return res.status(400).json({ 
            error: 'Validation Error',
            message: 'CEP é obrigatório' 
          });
        }

        if (!userData.terms_accepted) {
          return res.status(400).json({ 
            error: 'Validation Error',
            message: 'É necessário aceitar os termos e condições' 
          });
        }

        if (!isValidEmail(userData.email)) {
          return res.status(400).json({ 
            error: 'Validation Error',
            message: 'Email deve ter um formato válido' 
          });
        }

        if (!isValidPhone(userData.phone)) {
          return res.status(400).json({ 
            error: 'Validation Error',
            message: 'Telefone deve ter pelo menos 10 dígitos' 
          });
        }

        if (!isValidZipCode(userData.zip_code)) {
          return res.status(400).json({ 
            error: 'Validation Error',
            message: 'CEP deve ter 8 dígitos' 
          });
        }

        const existingUser = users.find(user => 
          user.email.toLowerCase() === userData.email.toLowerCase()
        );
        
        if (existingUser) {
          return res.status(409).json({ 
            error: 'Email already exists',
            message: 'Este email já está cadastrado no sistema' 
          });
        }

        const cleanUserData: UserData = {
          full_name: userData.full_name.trim(),
          email: userData.email.toLowerCase().trim(),
          phone: userData.phone.replace(/\D/g, ''),
          address: userData.address.trim(),
          number: userData.number.trim(),
          city: userData.city.trim(),
          state: userData.state.trim(),
          zip_code: userData.zip_code.replace(/\D/g, ''), 
          terms_accepted: userData.terms_accepted,
        };

        const newUser = {
          id: nextId++,
          ...cleanUserData,
        };
        
        users.push(newUser);
        
        return res.status(201).json({
          message: 'Usuário criado com sucesso',
          data: cleanUserData
        });

      } catch (error) {
        console.error('Erro no processamento:', error);
        return res.status(500).json({ 
          error: 'Internal Server Error',
          message: 'Erro interno do servidor' 
        });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}