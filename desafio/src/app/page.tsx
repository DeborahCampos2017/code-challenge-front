"use client"

import { useEffect } from 'react';

import Step1 from '@/shared/Step1';
import Step2 from '@/shared/Step2';
import Step3 from '@/shared/Step3';
import StepIndicator from '@/shared/StepIndicator';
import { Box, Container, Heading, useToast } from '@chakra-ui/react';
import { useFormStore } from './store/useFormStore';

const RegisterPage = () => {
  const { currentStep, apiState } = useFormStore();
  const toast = useToast();

  useEffect(() => {
    if (apiState.isSuccess) {
      toast({
        title: 'Sucesso!',
        description: 'Operação realizada com sucesso',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [apiState.isSuccess, toast]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <Box bg="#ff4d4d" minH="100vh" py={8}>
      <Container maxW="container.md">
        <Box bg="white" p={8} borderRadius="lg" boxShadow="xl" border="1px" borderColor="#ff4d4d">
          <Heading textAlign="center" mb={8} color="#ff4d4d">
            Cadastro de Usuário
          </Heading>
          <StepIndicator currentStep={currentStep} />
          {renderCurrentStep()}
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
