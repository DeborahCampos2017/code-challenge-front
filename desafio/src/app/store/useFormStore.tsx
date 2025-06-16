import { create } from 'zustand';

export type PersonalData = {
  full_name: string;
  email: string;
  phone: string;
}

export type AddressData = {
  address: string;
  number: string;
  city: string;
  state: string;
  zip_code: string;
}

export type ApiState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

type FormStore = {
  currentStep: number;
  personalData: PersonalData;
  addressData: AddressData;
  terms_accepted: boolean;
  apiState: ApiState;
  setCurrentStep: (step: number) => void;
  setPersonalData: (data: PersonalData) => void;
  setAddressData: (data: AddressData) => void;
  setTermsAccepted: (accept: boolean) => void;
  setApiState: (state: Partial<ApiState>) => void;
  resetForm: () => void;
  submitUser: () => Promise<void>;
}

const initialPersonalData: PersonalData = {
  full_name: '',
  email: '',
  phone: '',
};

const initialAddressData: AddressData = {
  address: '',
  number: '',
  city: '',
  state: '',
  zip_code: '',
};

const initialApiState: ApiState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const useFormStore = create<FormStore>((set, get) => ({
  currentStep: 1,
  personalData: initialPersonalData,
  addressData: initialAddressData,
  terms_accepted: false,
  apiState: initialApiState,
  setCurrentStep: (step) => set({ currentStep: step }),
  setPersonalData: (data) => set({ personalData: data }),
  setAddressData: (data) => set({ addressData: data }),
  setTermsAccepted: (accept) => set({ terms_accepted: accept }),
  setApiState: (state) => set((prev) => ({ 
    apiState: { ...prev.apiState, ...state } 
  })),

  resetForm: () => set({
    currentStep: 1,
    personalData: initialPersonalData,
    addressData: initialAddressData,
    terms_accepted: false,
    apiState: initialApiState,
  }),
  
  submitUser: async () => {
    const { personalData, addressData, terms_accepted, setApiState } = get();
    
    setApiState({ 
      isLoading: true, 
      isSuccess: false, 
      isError: false, 
      errorMessage: '' 
    });

    const userData = {
      full_name: personalData.full_name,
      email: personalData.email,
      phone: personalData.phone.replace(/\D/g, ''),
      address: addressData.address,
      number: addressData.number,
      city: addressData.city,
      state: addressData.state,
      zip_code: addressData.zip_code.replace(/\D/g, ''),
      terms_accepted: terms_accepted,
    };

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Fields': 'mask',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setApiState({ 
          isLoading: false, 
          isSuccess: true, 
          isError: false 
        });
      } else {
        let errorMessage = 'Erro desconhecido';
        
        if (response.status === 409) {
          errorMessage = 'Email já existe no sistema';
        } else if (response.status === 400) {
          errorMessage = 'Dados inválidos. Verifique os campos preenchidos';
        } else if (data?.message) {
          errorMessage = data.message;
        }

        setApiState({ 
          isLoading: false, 
          isSuccess: false, 
          isError: true,
          errorMessage 
        });
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        setApiState({ 
          isLoading: false, 
          isSuccess: false, 
          isError: true,
          errorMessage: error.message 
        });
      } else {
        setApiState({ 
          isLoading: false, 
          isSuccess: false, 
          isError: true,
          errorMessage: 'Erro de conexão. Tente novamente.' 
        });
      }
      throw error;
    }
  },
}));
