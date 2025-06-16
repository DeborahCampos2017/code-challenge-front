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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | UserData[]>
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return res.status(200).json(users);

    case 'POST':
      const userData: UserData = req.body;
      
      if (!userData.full_name || !userData.email || !userData.phone) {
        return res.status(400).json({ 
          error: 'Validation Error',
          message: 'Campos obrigatórios: full_name, email, phone' 
        });
      }

      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser) {
        return res.status(409).json({ 
          error: 'Email already exists',
          message: 'Este email já está cadastrado no sistema' 
        });
      }

      const newUser = {
        id: nextId++,
        ...userData,
      };
      
      users.push(newUser);
      
      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        data: userData
      });

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}