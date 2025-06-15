import { create } from 'zustand';
import { AddressData, PersonalData } from './types';

interface UserStore {
  currentStep: number;
  personalData: PersonalData;
  addressData: AddressData;
  acceptTerms: boolean;
  setCurrentStep: (step: number) => void;
  setPersonalData: (data: PersonalData) => void;
  setAddressData: (data: AddressData) => void;
  setAcceptTerms: (accept: boolean) => void;
  resetForm: () => void;
}

const initialPersonalData: PersonalData = {
  nome: '',
  email: '',
  telefone: '',
  genero: ''
};

const initialAddressData: AddressData = {
  endereco: '',
  numero: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: ''
};

export const useUserStore = create<UserStore>((set) => ({
  currentStep: 1,
  personalData: initialPersonalData,
  addressData: initialAddressData,
  acceptTerms: false,
  setCurrentStep: (step) => set({ currentStep: step }),
  setPersonalData: (data) => set({ personalData: data }),
  setAddressData: (data) => set({ addressData: data }),
  setAcceptTerms: (accept) => set({ acceptTerms: accept }),
  resetForm: () => set({
    currentStep: 1,
    personalData: initialPersonalData,
    addressData: initialAddressData,
    acceptTerms: false
  })
}));
