"use client";

import { useFormStore } from '@/app/store/useFormStore';
import {
  Checkbox,
  Divider,
  FormControl, useToast,
  VStack
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import StepButtons from '../StepButtons';
import { DataField, DataSection, ErrorMessage } from './DataSection';
import { Colors, Toast_Config } from './DataSection/utils';
import { checkboxStyles } from './styles';

const Step3 = () => {
  const router = useRouter();
  const toast = useToast();
  const {
    personalData,
    addressData,
    terms_accepted,
    apiState,
    setTermsAccepted,
    setCurrentStep,
    resetForm,
    submitUser
  } = useFormStore();

  const handleBack = () => {
    setCurrentStep(2);
  };

  const showSuccessToast = () => {
    toast({
      ...Toast_Config.success,
      ...Toast_Config.common,
    });
  };

  const showErrorToast = (errorMessage?: string) => {
    toast({
      ...Toast_Config.error,
      description: errorMessage || 'Ocorreu um erro ao criar o usuário.',
      ...Toast_Config.common,
    });
  };

  const handleFinish = async () => {
    try {
      await submitUser();
      showSuccessToast();
      
      setTimeout(() => {
        resetForm();
        router.push('/users');
      }, 1500);

    } catch {
      showErrorToast(apiState.errorMessage);
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <DataSection title="Dados Pessoais">
        <DataField label="Nome Completo" value={personalData.full_name} />
        <DataField label="Email" value={personalData.email} />
        <DataField label="Telefone" value={personalData.phone} />
      </DataSection>
      <Divider borderColor={Colors.primary} />
      <DataSection title="Endereço">
        <DataField label="Endereço" value={addressData.address} />
        <DataField label="Número" value={addressData.number} />
        <DataField label="Cidade" value={addressData.city} />
        <DataField label="Estado" value={addressData.state} />
        <DataField label="CEP" value={addressData.zip_code} />
      </DataSection>
      <Divider borderColor={Colors.primary} />
      <FormControl>
        <Checkbox
          isChecked={terms_accepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          sx={checkboxStyles}
          isDisabled={apiState.isLoading}
          color={Colors.black}
        >
          Aceito os termos e condições
        </Checkbox>
      </FormControl>
      <StepButtons
        resetForm={resetForm}
        onBack={handleBack}
        onFinish={handleFinish}
        showBackButton={true}
        isFinishDisabled={!terms_accepted}
        isLoading={apiState.isLoading}
        finishButtonText="Finalizar Cadastro"
      />
      {apiState.isError && (
        <ErrorMessage message={apiState.errorMessage} />
      )}
    </VStack>
  );
};

export default Step3;
