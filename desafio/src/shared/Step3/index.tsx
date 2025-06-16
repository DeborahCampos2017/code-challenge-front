"use client";

import {
  Box, VStack, Text, Divider, Checkbox, FormControl, useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/app/store/useFormStore';
import StepButtons from '../StepButtons';

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

  const handleFinish = async () => {
    try {
      await submitUser();

      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Usuário foi criado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      setTimeout(() => {
        resetForm();
        router.push('/users');
      }, 1500);

    } catch {
      toast({
        title: 'Erro no cadastro',
        description: apiState.errorMessage || 'Ocorreu um erro ao criar o usuário.',
        status: 'error',
        duration: 7000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4} color="#ff4d4d">
          Dados Pessoais
        </Text>
        <VStack align="stretch" spacing={2}>
          <Text><strong style={{ color: '#DD6B20' }}>Nome Completo:</strong> {personalData.full_name}</Text>
          <Text><strong style={{ color: '#DD6B20' }}>Email:</strong> {personalData.email}</Text>
          <Text><strong style={{ color: '#DD6B20' }}>Telefone:</strong> {personalData.phone}</Text>
        </VStack>
      </Box>

      <Divider borderColor="#ff4d4d" />

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4} color="#ff4d4d">
          Endereço
        </Text>
        <VStack align="stretch" spacing={2}>
          <Text><strong style={{ color: '#DD6B20' }}>Endereço:</strong> {addressData.address}</Text>
          <Text><strong style={{ color: '#DD6B20' }}>Número:</strong> {addressData.number}</Text>
          <Text><strong style={{ color: '#DD6B20' }}>Cidade:</strong> {addressData.city}</Text>
          <Text><strong style={{ color: '#DD6B20' }}>Estado:</strong> {addressData.state}</Text>
          <Text><strong style={{ color: '#DD6B20' }}>CEP:</strong> {addressData.zip_code}</Text>
        </VStack>
      </Box>
      <Divider borderColor="#ff4d4d" />
      <FormControl>
        <Checkbox
          isChecked={terms_accepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          sx={{
            '.chakra-checkbox__control': {
              _checked: {
                bg: '#ff4d4d',
                borderColor: '#ff4d4d',
                _hover: {
                  bg: '#ff4d4d',
                  borderColor: '#ff4d4d',
                }
              }
            }
          }}
          isDisabled={apiState.isLoading}
        >
          Aceito os termos e condições
        </Checkbox>
      </FormControl>

      {apiState.isError && (
        <Box
          p={4}
          bg="red.50"
          borderLeft="4px solid"
          borderColor="red.500"
          borderRadius="md"
        >
          <Text color="red.700" fontSize="sm">
            {apiState.errorMessage}
          </Text>
        </Box>
      )}
      <StepButtons
        resetForm={resetForm}
        onBack={handleBack}
        onFinish={handleFinish}
        showBackButton={true}
        isFinishDisabled={!terms_accepted}
        isLoading={apiState.isLoading}
        finishButtonText="Finalizar Cadastro"
      />
    </VStack>
  );
};

export default Step3;
